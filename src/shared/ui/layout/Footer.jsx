import styles from "./Footer.module.css";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2025 NexoFlex. Todos os direitos reservados.</p>
<p>Desenvolvido por Daniel Vieira com as Linguagens, React + NextJs + Typescript.</p>
      <div className={styles.socialArea}>
        <a
          href="https://www.linkedin.com/in/danielvieirasl"
          target="_blank"
          rel="noreferrer"
          className={`${styles.btn} ${styles.linkedin}`}
        >
          <FaLinkedin className={styles.icon} />
          <span>LinkedIn</span>
        </a>

        <a
          href="https://github.com/DanielVieiradev"
          target="_blank"
          rel="noreferrer"
          className={`${styles.btn} ${styles.github}`}
        >
          <FaGithub className={styles.icon} />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
