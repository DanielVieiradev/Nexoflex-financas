import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../../shared/ui/layout/Container';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan');

  return (
    <Container customClass="min-height">
      <div style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1>Checkout</h1>
        <p style={{ fontSize: '18px', marginTop: '20px' }}>
          Finalizando assinatura do plano: <strong style={{ color: '#10b981' }}>{plan || 'Nenhum plano selecionado'}</strong>
        </p>
        <p style={{ marginTop: '40px', color: '#64748b' }}>
          <em>Aqui será implementada a integração com o Stripe ou Mercado Pago.</em>
        </p>
      </div>
    </Container>
  );
};

export default Checkout;
