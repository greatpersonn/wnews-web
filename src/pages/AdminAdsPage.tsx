import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { deleteAd, getAdsList } from '@/entities/ad/api/ads.service';
import type { AdItem } from '@/entities/ad/model/types';
import { useToast } from '@/shared/hooks/useToast';

export function AdminAdsPage() {
  const [items, setItems] = useState<AdItem[]>([]);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

  const loadItems = useCallback(async () => {
    const data = await getAdsList();
    setItems(data);
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      showToast('Видаляємо оголошення...', 'info');
      await deleteAd(pendingDeleteId);
      await loadItems();
      setPendingDeleteId(null);
      showToast('Оголошення видалено', 'success');
    } catch (error) {
      console.error(error);
      showToast('Не вдалося видалити оголошення', 'error');
    }
  };

  return (
    <Container>
      <div className="admin-page">
        <div className="admin-shell">
          <div className="admin-topbar">
            <h1 className="admin-title">Керування оголошеннями</h1>
            <Button to="/admin/create-ad">Створити оголошення</Button>
          </div>

          <p className="admin-status">{status}</p>

          <div className="admin-list">
            {items.map((item) => (
              <div key={item.id} className="admin-list-item">
                <strong>{item.title}</strong>
                <span className="admin-meta">
                  {item.category} · {item.contact} · Пріоритет: {item.priority} ·{' '}
                  {item.isActive ? 'Активне' : 'Неактивне'}
                </span>

                <div className="admin-actions">
                  <Button to={`/admin/edit-ad/${item.slug}`} variant="secondary">
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
        title="Видалити оголошення?"
        text="Цю дію неможливо скасувати."
        confirmLabel="Видалити"
        cancelLabel="Скасувати"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </Container>
  );
}