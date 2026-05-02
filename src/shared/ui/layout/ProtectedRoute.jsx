import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../modules/auth/application/AuthContext';
import styles from './ProtectedRoute.module.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <span className={styles.spinner}></span>
        <p className={styles.text}>Acessando área segura...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
