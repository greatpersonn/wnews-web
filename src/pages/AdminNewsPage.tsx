import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { deleteNews, getNewsList } from '@/entities/news/api/news.service';
import type { NewsArticle } from '@/entities/news/model/types';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { useToast } from '@/shared/hooks/useToast';

export function AdminNewsPage() {
  const [items, setItems] = useState<NewsArticle[]>([]);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

  const loadItems = useCallback(async () => {
    const data = await getNewsList();
    setItems(data);
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      showToast('Видалення новини...', 'info');
      await deleteNews(pendingDeleteId);
      await loadItems();
      setPendingDeleteId(null);
      showToast('Новина була успішно видалена', 'success');
    } catch (error) {
      console.error(error);
      showToast('Помилка при видаленні новини', 'error');
    }
  };

  return (
    <Container>
      <div className="admin-page">
        <div className="admin-shell">
          <div className="admin-topbar">
            <h1 className="admin-title">Керування новинами</h1>
            <Button to="/admin/create-news">Додати нову новину</Button>
          </div>

          <div className="admin-list">
            {items.map((item) => (
              <div key={item.id} className="admin-list-item">
                <strong>{item.title}</strong>
                <span className="admin-meta">
                  {item.category} · {item.author} · {item.publishedAt}
                </span>

                <div className="admin-actions">
                  <Button to={`/admin/edit-news/${item.slug}`} variant="secondary">
                    Редагувати
                  </Button>
                  <Button variant="ghost" onClick={() => setPendingDeleteId(item.id)}>
                    Видалити
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={!!pendingDeleteId}
        title="Видалити статтю?"
        text="Після підтвердження статтю неможливо буде повернути!"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </Container>
  );
}