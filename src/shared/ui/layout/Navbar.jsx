import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Navbar.module.css";
import { useAuth } from "../../../modules/auth/application/AuthContext";
import logo from "../../../img/site.png";

function Navbar() {
  const { user, logout } = useAuth() || {};
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Initial theme check
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else if (!savedTheme && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

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
          {/* MENU */}
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

            {/* Moeda Toggle */}
            <li className={`${styles.item} ${styles.itemToggle}`}>
              <button
                className={`${styles.coinToggle} ${isDarkMode ? styles.coinFlipped : ''}`}
                onClick={toggleTheme}
                aria-label="Alternar tema da moeda"
                title={isDarkMode ? "Modo Real (Dark)" : "Modo Dólar (Light)"}
              >
                <div className={styles.coinInner}>
                  <div className={styles.coinFront}>$</div>
                  <div className={styles.coinBack}><span className={styles.realSymbol}>R</span>$</div>
                </div>
              </button>
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
