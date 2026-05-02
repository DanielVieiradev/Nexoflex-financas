import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaBullseye, FaSignOutAlt } from 'react-icons/fa';
import Container from '../../shared/ui/layout/Container';
import styles from './DashboardBasico.module.css';
import { useAuth } from '../../modules/auth/application/AuthContext';

const DashboardBasico = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Navega imediatamente para garantir a melhor UX
      navigate('/login');
      // Desloga no background
      logout().catch(console.error);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const planName = profile?.plan === 'pro' ? 'Pro' : 'Básico';

  return (
    <Container customClass="min-height">
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div className={styles.headerControls}>
            <h1 style={{ margin: 0 }}>Meu Plano: {planName}</h1>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              <FaSignOutAlt /> Sair
            </button>
          </div>
          <p>Bem-vindo ao seu painel principal, <strong>{user?.email}</strong>. Escolha o que deseja acessar hoje.</p>
        </div>

        <div className={styles.cardsContainer}>
          <Link to="/Projetos" className={styles.card}>
            <div className={styles.iconWrapper}>
              <FaMoneyBillWave className={styles.icon} />
            </div>
            <h2>Fluxo de Caixa</h2>
            <p>Gerencie suas receitas, despesas e acompanhe o seu saldo atual.</p>
          </Link>

          <Link to="/empresa" className={styles.card}>
            <div className={styles.iconWrapper}>
              <FaBullseye className={styles.icon} />
            </div>
            <h2>Objetivos</h2>
            <p>Acompanhe e defina suas metas financeiras e objetivos de vida.</p>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default DashboardBasico;
