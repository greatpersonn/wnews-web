import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = crypto.randomUUID();

    setItems((prev) => [...prev, { id, message, type }]);

    window.setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          display: 'grid',
          gap: 10,
          width: 320,
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '14px 16px',
              borderRadius: 14,
              border: '1px solid #2b313c',
              background:
                item.type === 'success'
                  ? 'rgba(25, 135, 84, 0.14)'
                  : item.type === 'error'
                    ? 'rgba(217, 35, 45, 0.14)'
                    : 'rgba(34, 107, 255, 0.14)',
              color: '#f5f7fa',
              boxShadow: '0 10px 30px rgba(0,0,0,0.22)',
            }}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}