import { Button } from '@/components/atoms/Button';
import { Container } from '@/components/atoms/Container';
import { ROUTES } from '@/shared/constants/routes';

export function AccessDeniedPage() {
  return (
    <Container>
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: '12px',
        }}
      >
        <h1 style={{ margin: 0 }}>Доступ заборонено</h1>
        <p style={{ margin: 0, maxWidth: 560, color: '#aab3c2' }}>
          Ваш обліковий запис не має дозволу на доступ до панелі керування.
        </p>
        <Button to={ROUTES.home}>Повернутися на головну</Button>
      </div>
    </Container>
  );
}