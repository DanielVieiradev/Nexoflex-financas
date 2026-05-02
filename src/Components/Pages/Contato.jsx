import styles from "./Contato.module.css";
import ContatoBg from "../../img/Contato.png";


function Contato() {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${ContatoBg})` }}
    >
      <div className={styles.overlay}></div>

      <div className={styles.rightContent}>
        <h1 className={styles.fadeIn}>Entre em Contato</h1>

        <p className={`${styles.subtitle} ${styles.fadeInDelay1}`}>
          Vamos conversar sobre seu próximo projeto. Transparência, clareza e
          estratégia guiada por dados.
        </p>

        <div className={`${styles.infoRow} ${styles.fadeInDelay2}`}>
          <span className={styles.infoTag}>
            daniel.viieira.dasilva0@gmail.com
          </span>
        </div>

        <div className={`${styles.divider} ${styles.fadeInDelay3}`}></div>

        <div className={`${styles.socialRow} ${styles.fadeInDelay4}`}>

          <a
            href="https://www.instagram.com/danielvieirasl/"
            target="_blank"
            rel="noreferrer"
            className={`${styles.socialButton} ${styles.instagramBtn}`}

          >
            <svg
              viewBox="0 0 24 24"
              className={styles.svgIcon}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
            </svg>
            <span className={styles.text}>Meu Instagram</span>
          </a>

          <a
            href="https://www.linkedin.com/in/danielvieirasl"
            target="_blank"
            rel="noreferrer"
            className={`${styles.socialButton} ${styles.linkedinBtn}`}

          >
            <svg
              viewBox="0 0 16 16"
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.svgIcon}
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193V6.169h-2.4v7.225z" />
            </svg>
            <span className={styles.text}>Meu LinkedIn</span>
          </a>

        </div>

        {/* Cards */}
        <div className={`${styles.cardContainer} ${styles.fadeInDelay5}`}>
          <div className={styles.contactCard}>
            <h4>Precisa de um Projeto?</h4>
            <p>
              Desenvolvimento profissional, eficiente e alinhado ao seu negócio.
            </p>
          </div>

          <div className={styles.contactCard}>
            <h4>Consultoria Personalizada</h4>
            <p>Vamos analisar seu cenário e traçar a melhor solução digital.</p>
          </div>
        </div>

        {/* CTA Final */}
        <div className={`${styles.ctaBox} ${styles.fadeInDelay6}`}>
          <h2>Pronto para começar?</h2>
          <p>
            Transforme sua ideia em realidade com um projeto pensado para
            escalar.
          </p>
          <a href="https://www.instagram.com/danielvieirasl/" className={styles.ctaButton}>
            Mande uma mensagem para solicitar seu orçamento.
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contato;