import { Container } from '@/components/atoms/Container';
import { Button } from '@/components/atoms/Button';

export function AdminPage() {
  return (
    <Container>
      <div className="admin-page">
        <div className="admin-shell">
          <h1 className="admin-title">Панель керування</h1>

          <div className="admin-card">
            <h3 style={{ margin: 0 }}>Новини</h3>
            <div className="admin-actions">
              <Button to="/admin/create-news">Додати нову новину</Button>
              <Button to="/admin/news" variant="secondary">
                Керуванням новинами
              </Button>
            </div>
          </div>

          <div className="admin-card">
            <h3 style={{ margin: 0 }}>Випуски</h3>
            <div className="admin-actions">
              <Button to="/admin/create-issue">Додати новий випуск</Button>
              <Button to="/admin/issues" variant="secondary">
                Керування випусками
              </Button>
            </div>
          </div>

          <div className="admin-card">
            <h3 style={{ margin: 0 }}>Оголошення</h3>
            <div className="admin-actions">
              <Button to="/admin/create-ad">Створити нове оголошення</Button>
              <Button to="/admin/ads" variant="secondary">
                Керування оголошеннями
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}