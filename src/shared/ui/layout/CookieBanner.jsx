import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('nexoflex_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('nexoflex_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p>
          <strong>Nós valorizamos sua privacidade! 🍪</strong><br/>
          Usamos cookies para garantir que você tenha a melhor experiência na nossa plataforma (como manter você logado), em conformidade com a <strong>LGPD</strong>.
        </p>
        <div className={styles.buttons}>
          <button onClick={acceptCookies} className={styles.acceptBtn}>Entendi e Aceito</button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
