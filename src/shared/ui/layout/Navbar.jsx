import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../../modules/auth/application/AuthContext";
import logo from "../../../img/site.png";

function Navbar() {
  const { user, logout } = useAuth() || {};
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles["navbar-content"]}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Nexoflex" />
          </Link>
          <span className={styles.brandname}>Nexoflex™</span>
        </div>

        <div className={styles.rightSection}>
          <ul className={`${styles.list} ${isOpen ? styles.open : ""}`}>
            <li className={styles.item}>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            {user ? (
              <>
                <li className={styles.item}>
                  <Link to="/dashboard" onClick={closeMenu}>Painel</Link>
                </li>
                <li className={styles.item}>
                  <a href="#" onClick={(e) => { e.preventDefault(); closeMenu(); logout(); window.location.href = '/login'; }}>Sair</a>
                </li>
              </>
            ) : (
              <li className={styles.item}>
                <Link to="/login" onClick={closeMenu}>Login</Link>
              </li>
            )}
            <li className={styles.item}>
              <Link to="/contato" onClick={closeMenu}>Contato</Link>
            </li>
          </ul>

          <div
            className={`${styles["menu-toggle"]} ${isOpen ? styles.active : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
