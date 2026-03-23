import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import {
  getAllNewsSlugs,
  getNewsBySlug,
  updateNews,
} from '@/entities/news/api/news.service';
import { createUniqueSlug } from '@/shared/lib/slugifyUnique';
import { CheckboxField } from '@/components/atoms/CheckboxField';
import { FormField } from '@/components/atoms/FormField';
import { TextInput } from '@/components/atoms/TextInput';
import { RichTextEditor } from '@/components/organisms/RichTextEditor';
import { useToast } from '@/shared/hooks/useToast';

export function EditNewsPage() {
  const { slug = '' } = useParams();

  const [documentId, setDocumentId] = useState('');
  const [originalSlug, setOriginalSlug] = useState('');
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [isSlugEditedManually, setIsSlugEditedManually] = useState(false);

  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    author: '',
    publishedAt: '',
    featured: false,
  });

  useEffect(() => {
    const load = async () => {
      const [article, slugs] = await Promise.all([
        getNewsBySlug(slug),
        getAllNewsSlugs(),
      ]);

      if (!article) {
        showToast('Новина не знайдена або видалена', 'error');
        return;
      }

      setDocumentId(article.id);
      setOriginalSlug(article.slug);
      setExistingSlugs(slugs);

      setForm({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        category: article.category,
        author: article.author,
        publishedAt: article.publishedAt,
        featured: !!article.featured,
      });
    };

    void load();
  }, [slug]);

  useEffect(() => {
    if (!isSlugEditedManually) {
      setForm((prev) => ({
        ...prev,
        slug: createUniqueSlug(
          prev.title,
          existingSlugs.filter((item) => item !== originalSlug),
        ),
      }));
    }
  }, [form.title, existingSlugs, originalSlug, isSlugEditedManually]);

  const handleChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      showToast('Оновлюємо новину...', 'info');

      const finalSlug = createUniqueSlug(
        form.slug.trim() || form.title,
        existingSlugs.filter((item) => item !== originalSlug),
      );

      await updateNews(documentId, {
        ...form,
        slug: finalSlug,
      });

      showToast('Новина успішно оновлена', 'success');
      setOriginalSlug(finalSlug);

      const refreshedSlugs = await getAllNewsSlugs();
      setExistingSlugs(refreshedSlugs);
    } catch (error) {
      console.error(error);
      showToast('Помилка оновлення даних новини', 'error');
    }
  };

  return (
    <Container>
      <div className="admin-page">
        <div className="admin-shell">
          <div className="admin-topbar">
            <h1 className="admin-title">Редагувати новину</h1>
            <Button to="/admin/news" variant="ghost">
              Повернутись
            </Button>
          </div>

          <div className="admin-card">
            <div className="admin-grid">
              <FormField label="Заголовок">
                <TextInput
                  placeholder="Заголовок новини"
                  value={form.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('title', e.target.value)}
                />
              </FormField>

              <FormField label="Коротка назва" hint="Генерується автоматично, але можна підправити вручну.">
                <TextInput
                  placeholder="news-slug"
                  value={form.slug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setIsSlugEditedManually(true);
                    handleChange('slug', e.target.value);
                  }}
                />
              </FormField>

              <FormField label="Анотація">
                <TextInput
                  placeholder="Короткий опис статті"
                  value={form.excerpt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('excerpt', e.target.value)}
                />
              </FormField>

              <FormField label="Зміст новини">
                <RichTextEditor
                  value={form.content}
                  onChange={(value) => handleChange('content', value)}
                />
              </FormField>

              <FormField label="URL зображення">
                <TextInput
                  placeholder="Пряма URL-адреса зображення"
                  value={form.image}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('image', e.target.value)}
                />
              </FormField>

              {form.image && (
                <img src={form.image} alt="Preview" className="admin-preview" />
              )}

              <div className="admin-grid-2">
                <FormField label="Категорія">
                  <TextInput
                    placeholder="Медіа / Терміново / Випуск"
                    value={form.category}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('category', e.target.value)}
                  />
                </FormField>

                <FormField label="Автор">
                  <TextInput
                    placeholder="Автор статті"
                    value={form.author}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('author', e.target.value)}
                  />
                </FormField>

                <FormField label="Дата публікації">
                  <TextInput
                    type="date"
                    value={form.publishedAt}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('publishedAt', e.target.value)}
                  />
                </FormField>

                <CheckboxField
                  checked={form.featured}
                  label="Рекомендувати для користувачів"
                  onChange={(checked: boolean) => handleChange('featured', checked)}
                />
              </div>
            </div>

            <div className="admin-actions">
              <Button onClick={handleSubmit}>Внести зміни до статті</Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}