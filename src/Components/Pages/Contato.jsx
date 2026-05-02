import styles from "./Contato.module.css";
import { FiArrowRight, FiCode, FiLayout, FiMessageCircle, FiCheckCircle } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import ContatoBg from "../../img/Contato.png";

function Contato() {
  const INSTAGRAM_URL = "https://www.instagram.com/vieiralab.dev/";

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${ContatoBg})` }}
    >
      <div className={styles.overlay}></div>

      {/* Decorative gradient orbs */}
      <div className={styles.orbTop}></div>
      <div className={styles.orbBottom}></div>

      <div className={styles.content}>
        {/* Badge */}
        <span className={`${styles.badge} ${styles.fadeIn}`}>
          <FiMessageCircle size={14} />
          Disponível para novos projetos
        </span>

        <h1 className={styles.fadeInDelay1}>
          Transforme sua ideia<br />
          <span className={styles.highlight}>em realidade digital.</span>
        </h1>

        <p className={`${styles.subtitle} ${styles.fadeInDelay2}`}>
          Desenvolvimento de sites, sistemas e soluções sob medida para o seu negócio.
          Atendimento direto, transparente e focado em resultados.
        </p>

        {/* CTA Principal - Instagram */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className={`${styles.ctaMain} ${styles.fadeInDelay3}`}
        >
          <FaInstagram size={22} />
          <span>Solicitar Orçamento no Instagram</span>
          <FiArrowRight size={18} className={styles.ctaArrow} />
        </a>

        {/* Service Cards */}
        <div className={`${styles.servicesGrid} ${styles.fadeInDelay4}`}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <FiLayout size={24} />
            </div>
            <h3>Sites Personalizados</h3>
            <p>Landing pages, portfólios e sites institucionais com design premium e responsivo.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <FiCode size={24} />
            </div>
            <h3>Sistemas Web</h3>
            <p>Painéis administrativos, dashboards e aplicações completas para sua operação.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <FiMessageCircle size={24} />
            </div>
            <h3>Suporte Contínuo</h3>
            <p>Manutenção, atualizações e consultoria técnica para manter seu projeto evoluindo.</p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className={`${styles.trustBar} ${styles.fadeInDelay5}`}>
          <div className={styles.trustItem}>
            <FiCheckCircle size={16} />
            <span>Entrega rápida</span>
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustItem}>
            <FiCheckCircle size={16} />
            <span>Código limpo</span>
          </div>
          <div className={styles.trustDivider}></div>
          <div className={styles.trustItem}>
            <FiCheckCircle size={16} />
            <span>100% responsivo</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.bottomCta} ${styles.fadeInDelay6}`}>
          <p>Mande uma mensagem no Instagram e receba seu orçamento em até 24h.</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.ctaSecondary}
          >
            <FaInstagram size={18} />
            @vieiralab.dev
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contato;