import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import {
  getAllIssueSlugs,
  getIssueBySlug,
  updateIssue,
} from '@/entities/issue/api/issues.service';
import { createUniqueSlug } from '@/shared/lib/slugifyUnique';
import { FormField } from '@/components/atoms/FormField';
import { TextInput } from '@/components/atoms/TextInput';
import { useToast } from '@/shared/hooks/useToast';
import { TextArea } from '@/components/atoms/TextArea';

export function EditIssuePage() {
  const { slug = '' } = useParams();

  const [documentId, setDocumentId] = useState('');
  const [originalSlug, setOriginalSlug] = useState('');
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [pageImage, setPageImage] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [isSlugEditedManually, setIsSlugEditedManually] = useState(false);

  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    cover: '',
    category: '',
    issueNumber: '',
    publishedAt: '',
    pages: [] as { id: string; image: string; title: string }[],
  });

  useEffect(() => {
    const load = async () => {
      const [issue, slugs] = await Promise.all([
        getIssueBySlug(slug),
        getAllIssueSlugs(),
      ]);

      if (!issue) {
        showToast('Випуск не знайдений або видалений', 'error');
        return;
      }

      setDocumentId(issue.id);
      setOriginalSlug(issue.slug);
      setExistingSlugs(slugs);

      setForm({
        title: issue.title,
        slug: issue.slug,
        description: issue.description,
        cover: issue.cover,
        category: issue.category,
        issueNumber: String(issue.issueNumber),
        publishedAt: issue.publishedAt,
        pages: issue.pages.map((page) => ({
          id: page.id,
          image: page.image,
          title: page.title ?? '',
        })),
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

  const addPage = () => {
    if (!pageImage.trim()) return;

    setForm((prev) => ({
      ...prev,
      pages: [
        ...prev.pages,
        {
          id: crypto.randomUUID(),
          image: pageImage,
          title: pageTitle,
        },
      ],
    }));

    setPageImage('');
    setPageTitle('');
  };

  const removePage = (id: string) => {
    setForm((prev) => ({
      ...prev,
      pages: prev.pages.filter((page) => page.id !== id),
    }));
  };

  const handleSubmit = async () => {
    try {
      showToast('Оновлюємо дані випуску...', 'info');

      const finalSlug = createUniqueSlug(
        form.slug.trim() || form.title,
        existingSlugs.filter((item) => item !== originalSlug),
      );

      await updateIssue(documentId, {
        title: form.title,
        slug: finalSlug,
        description: form.description,
        cover: form.cover,
        category: form.category,
        issueNumber: Number(form.issueNumber),
        publishedAt: form.publishedAt,
        pages: form.pages,
      });

      showToast('Випуск успішно оновлений', 'success');
      setOriginalSlug(finalSlug);

      const refreshedSlugs = await getAllIssueSlugs();
      setExistingSlugs(refreshedSlugs);
    } catch (error) {
      console.error(error);
      showToast('Помилка оновлення випуску', 'error');
    }
  };

  return (
    <Container>
      <div className="admin-page">
        <div className="admin-shell">
          <div className="admin-topbar">
            <h1 className="admin-title">Редагувати випуск</h1>
            <Button to="/admin/issues" variant="ghost">
              Повернутись
            </Button>
          </div>

          <div className="admin-card">
            <div className="admin-grid">
              <FormField label="Заголовок">
                <TextInput
                  placeholder="Заголовок випуску"
                  value={form.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />
              </FormField>

              <FormField
                label="Коротка назва"
                hint="Генерується автоматично, але можна підправити вручну."
              >
                <TextInput
                  placeholder="Коротка назва для випуску"
                  value={form.slug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setIsSlugEditedManually(true);
                    setForm({ ...form, slug: e.target.value });
                  }}
                />
              </FormField>

              <FormField label="Опис випуску">
                <TextArea
                  rows={5}
                  placeholder="Короткий опис випуску"
                  value={form.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </FormField>

              <FormField
                label="URL обкладинки"
                hint="Вставте пряму URL-адресу зображення для обкладинки випуску."
              >
                <TextInput
                  placeholder="https://..."
                  value={form.cover}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, cover: e.target.value })
                  }
                />
              </FormField>

              {form.cover && (
                <img src={form.cover} alt="Cover preview" className="admin-preview" />
              )}

              <div className="admin-grid-2">
                <FormField label="Категорія">
                  <TextInput
                    placeholder="Місто / Терміново / Випуск"
                    value={form.category}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </FormField>

                <FormField label="Номер випуску">
                  <TextInput
                    placeholder="1"
                    value={form.issueNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm({ ...form, issueNumber: e.target.value })
                    }
                  />
                </FormField>
              </div>

              <FormField label="Дата публікації">
                <TextInput
                  type="date"
                  value={form.publishedAt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, publishedAt: e.target.value })
                  }
                />
              </FormField>
            </div>

            <div className="admin-card">
              <h3 style={{ margin: 0 }}>Pages</h3>

              <div className="admin-grid-2">
                <FormField label="URL зображення сторінки">
                  <TextInput
                    placeholder="https://..."
                    value={pageImage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPageImage(e.target.value)
                    }
                  />
                </FormField>

                <FormField label="Назва сторінки">
                  <TextInput
                    placeholder="Необов'язковий заголовок для сторінки"
                    value={pageTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPageTitle(e.target.value)
                    }
                  />
                </FormField>
              </div>

              <div className="admin-actions">
                <Button onClick={addPage} variant="secondary">
                  Додати сторінку
                </Button>
              </div>

              <div className="admin-list">
                {form.pages.map((page, index) => (
                  <div key={page.id} className="admin-list-item">
                    <strong>Сторінка {index + 1}</strong>
                    {page.title && <span>{page.title}</span>}
                    <img
                      src={page.image}
                      alt={page.title || `Page ${index + 1}`}
                      className="admin-preview"
                      style={{ maxWidth: 180 }}
                    />
                    <div className="admin-actions">
                      <Button variant="ghost" onClick={() => removePage(page.id)}>
                        Видалити сторінку
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-actions">
              <Button onClick={handleSubmit}>Внести зміни до випуску</Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}