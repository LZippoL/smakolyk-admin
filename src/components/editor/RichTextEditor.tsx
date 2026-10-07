import React, { useState, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Table, 
  Minus, 
  Info,
  Eye, 
  Code
} from 'lucide-react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Input } from '../Input';
import { cn } from '../../utils/cn';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label = 'Вміст статті / тексту',
  minHeight = '320px'
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Modals for link and image
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');

  // Helper to wrap or insert text at current cursor position
  const insertText = (before: string, after: string = '', defaultContent: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end) || defaultContent;

    const replacement = `${before}${selected}${after}`;
    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 50);
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    const formatted = `<a href="${linkUrl.trim()}" class="text-brand-600 dark:text-brand-400 underline font-medium hover:text-brand-700" target="${linkUrl.startsWith('http') ? '_blank' : '_self'}" rel="noopener noreferrer">${linkText.trim() || linkUrl.trim()}</a>`;
    insertText(formatted);
    setLinkUrl('');
    setLinkText('');
    setIsLinkModalOpen(false);
  };

  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;
    const captionHtml = imageCaption.trim()
      ? `<figcaption class="text-xs text-stone-500 text-center mt-2">${imageCaption.trim()}</figcaption>`
      : '';
    const formatted = `\n<figure class="my-6">\n  <img src="${imageUrl.trim()}" alt="${imageCaption || 'Зображення'}" class="w-full rounded-2xl shadow-md object-cover max-h-96" />\n  ${captionHtml}\n</figure>\n`;
    insertText(formatted);
    setImageUrl('');
    setImageCaption('');
    setIsImageModalOpen(false);
  };

  const insertTable = () => {
    const tableHtml = `\n<table class="w-full my-6 text-sm border-collapse border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden">\n  <thead>\n    <tr class="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100">\n      <th class="border border-stone-300 dark:border-stone-700 p-2.5 text-left font-bold">Параметр</th>\n      <th class="border border-stone-300 dark:border-stone-700 p-2.5 text-left font-bold">Значення</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class="border border-stone-300 dark:border-stone-700 p-2.5">Приклад 1</td>\n      <td class="border border-stone-300 dark:border-stone-700 p-2.5">Деталі 1</td>\n    </tr>\n    <tr>\n      <td class="border border-stone-300 dark:border-stone-700 p-2.5">Приклад 2</td>\n      <td class="border border-stone-300 dark:border-stone-700 p-2.5">Деталі 2</td>\n    </tr>\n  </tbody>\n</table>\n`;
    insertText(tableHtml);
  };

  const insertCallout = () => {
    const calloutHtml = `\n<div class="callout-box bg-brand-50 dark:bg-brand-950/40 border-l-4 border-brand-500 p-4 rounded-r-2xl my-6">\n  <p class="font-bold text-brand-900 dark:text-brand-300 m-0">Порада від шефа:</p>\n  <p class="text-stone-700 dark:text-stone-300 text-sm m-0 mt-1">Текст корисної кулінарної поради...</p>\n</div>\n`;
    insertText(calloutHtml);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            {label}
          </label>
        )}
        <div className="flex rounded-xl bg-stone-100 dark:bg-stone-800 p-0.5 border border-stone-200 dark:border-stone-700 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={cn(
              'px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1',
              activeTab === 'edit'
                ? 'bg-white dark:bg-stone-900 text-brand-600 shadow-sm'
                : 'text-stone-600 dark:text-stone-400'
            )}
          >
            <Code className="w-3.5 h-3.5" />
            Редактор
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={cn(
              'px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1',
              activeTab === 'preview'
                ? 'bg-white dark:bg-stone-900 text-brand-600 shadow-sm'
                : 'text-stone-600 dark:text-stone-400'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            Попередній перегляд
          </button>
        </div>
      </div>

      <div className="border border-stone-300 dark:border-stone-700 rounded-2xl overflow-hidden bg-white dark:bg-stone-900 shadow-sm">
        {/* Formatting Toolbar */}
        {activeTab === 'edit' && (
          <div className="flex flex-wrap items-center gap-1 p-2 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 select-none">
            {/* Headers */}
            <button
              type="button"
              onClick={() => insertText('\n<h2>', '</h2>\n', 'Заголовок H2')}
              title="Заголовок H2"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText('\n<h3>', '</h3>\n', 'Заголовок H3')}
              title="Заголовок H3"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <Heading3 className="w-4 h-4" />
            </button>

            <span className="w-px h-5 bg-stone-300 dark:bg-stone-700 mx-1" />

            {/* Bold / Italic */}
            <button
              type="button"
              onClick={() => insertText('<strong>', '</strong>', 'жирний текст')}
              title="Жирний"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors font-bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText('<em>', '</em>', 'курсивний текст')}
              title="Курсив"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors italic"
            >
              <Italic className="w-4 h-4" />
            </button>

            <span className="w-px h-5 bg-stone-300 dark:bg-stone-700 mx-1" />

            {/* Lists */}
            <button
              type="button"
              onClick={() => insertText('\n<ul>\n  <li>Пункт 1</li>\n  <li>Пункт 2</li>\n</ul>\n')}
              title="Маркований список"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText('\n<ol>\n  <li>Крок 1</li>\n  <li>Крок 2</li>\n</ol>\n')}
              title="Нумерований список"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            <span className="w-px h-5 bg-stone-300 dark:bg-stone-700 mx-1" />

            {/* Quote & Callout */}
            <button
              type="button"
              onClick={() => insertText('\n<blockquote>\n  ', '\n</blockquote>\n', 'Текст цитати або мудрого вислову шефа')}
              title="Цитата"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={insertCallout}
              title="Callout блок (порада)"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors text-brand-600"
            >
              <Info className="w-4 h-4" />
            </button>

            <span className="w-px h-5 bg-stone-300 dark:bg-stone-700 mx-1" />

            {/* Link & Image */}
            <button
              type="button"
              onClick={() => {
                const textarea = textareaRef.current;
                if (textarea) {
                  const sel = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
                  if (sel) setLinkText(sel);
                }
                setIsLinkModalOpen(true);
              }}
              title="Вставити посилання"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              title="Вставити фотографію з підписом"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            <span className="w-px h-5 bg-stone-300 dark:bg-stone-700 mx-1" />

            {/* Table & Divider */}
            <button
              type="button"
              onClick={insertTable}
              title="Вставити таблицю"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertText('\n<hr class="my-6 border-stone-200 dark:border-stone-800" />\n')}
              title="Роздільник (лінія)"
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Editor Body */}
        {activeTab === 'edit' ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ minHeight }}
            placeholder="Пишіть текст тут... Використовуйте кнопки панелі для форматування заголовків, списків, посилань, фотографій та таблиць."
            className="w-full p-4 font-mono text-sm bg-transparent text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none resize-y"
          />
        ) : (
          <div
            style={{ minHeight }}
            className="p-6 prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 leading-relaxed overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: value || '<p class="text-stone-400 italic">Попередній перегляд пустий. Напишіть щось у редакторі!</p>' }}
          />
        )}
      </div>

      {/* Link Modal */}
      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        title="Вставити посилання"
        description="Введіть URL адресу та текст посилання"
      >
        <div className="space-y-4 pt-2">
          <Input
            label="Текст посилання"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            placeholder="Натисніть тут"
          />
          <Input
            label="URL адреса (зовнішня або внутрішня)"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com або /recipes/borscht"
            required
          />
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsLinkModalOpen(false)}
              className="flex-1"
            >
              Скасувати
            </Button>
            <Button
              type="button"
              onClick={handleInsertLink}
              disabled={!linkUrl.trim()}
              className="flex-1"
            >
              Вставити посилання
            </Button>
          </div>
        </div>
      </Modal>

      {/* Image Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Вставити фотографію"
        description="Введіть URL адресу фотографії та підпис під нею"
      >
        <div className="space-y-4 pt-2">
          <Input
            label="URL зображення"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            required
          />
          <Input
            label="Підпис фотографії (figcaption)"
            value={imageCaption}
            onChange={(e) => setImageCaption(e.target.value)}
            placeholder="Свіжі овочі для засмажки"
          />
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsImageModalOpen(false)}
              className="flex-1"
            >
              Скасувати
            </Button>
            <Button
              type="button"
              onClick={handleInsertImage}
              disabled={!imageUrl.trim()}
              className="flex-1"
            >
              Вставити фото
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
