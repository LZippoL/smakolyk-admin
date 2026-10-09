import { createRemoteJWKSet, jwtVerify } from 'jose';

// Public identifiers, not credentials. The same audience is configured in Access.
export const ADMIN_HOST = 'admin.culinorium.com';
export const ACCESS_ISSUER = 'https://culinorium.cloudflareaccess.com';
export const ACCESS_AUDIENCE = '728b7c122567ae241553ce5c20b407fa57db3a219c76a5d7046c77b7d7a17248';
const keys = createRemoteJWKSet(new URL(`${ACCESS_ISSUER}/cdn-cgi/access/certs`));

function secure(response) {
  const result = new Response(response.body, response);
  result.headers.set('Cache-Control', 'private, no-store');
  result.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  result.headers.set('X-Content-Type-Options', 'nosniff');
  result.headers.set('Referrer-Policy', 'same-origin');
  result.headers.set('Content-Security-Policy', "frame-ancestors 'none'; object-src 'none'; base-uri 'self'");
  return result;
}

export function createAdminWorker(verificationKeys = keys) {
  return {
    async fetch(request, env) {
      const url = new URL(request.url);
      // Production aliases, preview URLs and individual deployments cannot expose assets.
      if (url.hostname !== ADMIN_HOST) {
        const target = new URL(url.pathname + url.search, `https://${ADMIN_HOST}`);
        return secure(Response.redirect(target.href, 302));
      }
      const token = request.headers.get('Cf-Access-Jwt-Assertion');
      if (!token) return secure(new Response('Authentication required', { status: 403 }));
      try {
        const { payload } = await jwtVerify(token, verificationKeys, {
          issuer: ACCESS_ISSUER,
          audience: ACCESS_AUDIENCE,
          algorithms: ['RS256'],
          requiredClaims: ['exp', 'iat', 'sub'],
        });
        if (payload.type !== 'app') throw new Error('Unexpected token type');
      } catch {
        return secure(new Response('Access denied', { status: 403 }));
      }
      return secure(await env.ASSETS.fetch(request));
    },
  };
}

export default createAdminWorker();
