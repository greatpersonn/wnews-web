import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { CheckboxField } from '@/components/atoms/CheckboxField';
import { FormField } from '@/components/atoms/FormField';
import { TextArea } from '@/components/atoms/TextArea';
import { TextInput } from '@/components/atoms/TextInput';
import { Container } from '@/components/atoms/Container';
import {
  getAdBySlug,
  getAllAdSlugs,
  updateAd,
} from '@/entities/ad/api/ads.service';
import { useToast } from '@/shared/hooks/useToast';
import { createUniqueSlug } from '@/shared/lib/slugifyUnique';

export function EditAdPage() {
  const { slug = '' } = useParams();

  const [documentId, setDocumentId] = useState('');
  const [originalSlug, setOriginalSlug] = useState('');
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [isSlugEditedManually, setIsSlugEditedManually] = useState(false);
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
    category: '',
    contact: '',
    link: '',
    publishedAt: '',
    isActive: true,
    priority: '1',
  });

  useEffect(() => {
    const load = async () => {
      const [item, slugs] = await Promise.all([
        getAdBySlug(slug),
        getAllAdSlugs(),
      ]);

      if (!item) {
        showToast('Оголошення не знайдено', 'error');
        return;
      }

      setDocumentId(item.id);
      setOriginalSlug(item.slug);
      setExistingSlugs(slugs);

      setForm({
        title: item.title,
        slug: item.slug,
        description: item.description,
        image: item.image,
        category: item.category,
        contact: item.contact,
        link: item.link ?? '',
        publishedAt: item.publishedAt,
        isActive: item.isActive,
        priority: String(item.priority),
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

  const handleChange = (
    key: keyof typeof form,
    value: string | boolean,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      showToast('Редагуємо оголошення...', 'info');

      const finalSlug = createUniqueSlug(
        form.slug.trim() || form.title,
        existingSlugs.filter((item) => item !== originalSlug),
      );

      await updateAd(documentId, {
        title: form.title,
        slug: finalSlug,
        description: form.description,
        image: form.image,
        category: form.category,
        contact: form.contact,
        link: form.link,
        publishedAt: form.publishedAt,
        isActive: form.isActive,
        priority: Number(form.priority),
      });

      setOriginalSlug(finalSlug);
      showToast('Оголошення оновлено', 'success');

      const refreshedSlugs = await getAllAdSlugs();
      setExistingSlugs(refreshedSlugs);
    } catch (error) {
      console.error(error);
      showToast('Не вдалося оновити оголошення', 'error');
    }
  };

  return (
    <Container>
      <div className="admin-page">
        <div className="admin-shell">
          <div className="admin-topbar">
            <h1 className="admin-title">Редагувати оголошення</h1>
            <Button to="/admin/ads" variant="ghost">
              Назад
            </Button>
          </div>

          <div className="admin-card">
            <div className="admin-grid">
              <FormField label="Заголовок">
                <TextInput
                  placeholder="Назва оголошення"
                  value={form.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('title', e.target.value)
                  }
                />
              </FormField>

              <FormField
                label="Slug"
                hint="Генерується автоматично, але можна змінити вручну."
              >
                <TextInput
                  placeholder="slug-ogoloshennya"
                  value={form.slug}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setIsSlugEditedManually(true);
                    handleChange('slug', e.target.value);
                  }}
                />
              </FormField>

              <FormField label="Опис">
                <TextArea
                  rows={5}
                  value={form.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleChange('description', e.target.value)
                  }
                />
              </FormField>

              <FormField label="Посилання на зображення">
                <TextInput
                  placeholder="https://..."
                  value={form.image}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('image', e.target.value)
                  }
                />
              </FormField>

              {form.image && (
                <img
                  src={form.image}
                  alt="Попередній перегляд"
                  className="admin-preview"
                />
              )}

              <div className="admin-grid-2">
                <FormField label="Категорія">
                  <TextInput
                    value={form.category}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange('category', e.target.value)
                    }
                  />
                </FormField>

                <FormField label="Контакт">
                  <TextInput
                    value={form.contact}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange('contact', e.target.value)
                    }
                  />
                </FormField>
              </div>

              <div className="admin-grid-2">
                <FormField label="Зовнішнє посилання">
                  <TextInput
                    value={form.link}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange('link', e.target.value)
                    }
                  />
                </FormField>

                <FormField label="Пріоритет">
                  <TextInput
                    value={form.priority}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange('priority', e.target.value)
                    }
                  />
                </FormField>
              </div>

              <FormField label="Дата публікації">
                <TextInput
                  type="date"
                  value={form.publishedAt}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('publishedAt', e.target.value)
                  }
                />
              </FormField>

              <CheckboxField
                checked={form.isActive}
                label="Активне оголошення"
                onChange={(checked: boolean) =>
                  handleChange('isActive', checked)
                }
              />
            </div>

            <div className="admin-actions">
              <Button onClick={handleSubmit}>Оновити</Button>
            </div>

            <p className="admin-status">{status}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}