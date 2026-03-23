import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { deleteIssue, getIssuesList } from '@/entities/issue/api/issues.service';
import type { NewspaperIssue } from '@/entities/issue/model/types';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { useToast } from '@/shared/hooks/useToast';

export function AdminIssuesPage() {
  const [items, setItems] = useState<NewspaperIssue[]>([]);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

  const loadItems = useCallback(async () => {
    const data = await getIssuesList();
    setItems(data);
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      showToast('Видалення випуску...', 'info');
      await deleteIssue(pendingDeleteId);
      await loadItems();
      setPendingDeleteId(null);
      showToast('Випуску успішно видалений', 'success');
    } catch (error) {
      console.error(error);
      showToast('Помилка при видаленні випуску', 'error');
    }
  };

  return (
    <Container>
      <div className="admin-page">
        <div className="admin-shell">
          <div className="admin-topbar">
            <h1 className="admin-title">Керування випусками</h1>
            <Button to="/admin/create-issue">Додати новий випуск</Button>
          </div>

          <p className="admin-status">{status}</p>

          <div className="admin-list">
            {items.map((item) => (
              <div key={item.id} className="admin-list-item">
                <strong>{item.title}</strong>
                <span className="admin-meta">
                  #{item.issueNumber} · {item.category} · {item.publishedAt}
                </span>

                <div className="admin-actions">
                  <Button to={`/admin/edit-issue/${item.slug}`} variant="secondary">
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
        title="Видалити випуск?"
        text="Після підтвердження випуск неможливо буде повернути!"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </Container>
  );
}