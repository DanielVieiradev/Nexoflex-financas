import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { FiTrendingUp, FiTarget, FiShield, FiArrowRight } from "react-icons/fi";

function Home() {
  return (
    <div className={styles.landingContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Subtle decorative elements */}
        <div className={styles.glowOrb1}></div>
        <div className={styles.glowOrb2}></div>

        <div className={styles.heroWrapper}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>✨</span> Inteligência Financeira
            </span>
            <h1>Assuma o controle do seu dinheiro.</h1>
            <p>
              Simples, elegante e focado no seu crescimento. O Nexoflex acompanha suas despesas e identifica como você pode construir seu patrimônio com facilidade.
            </p>

            <div className={styles.heroButtons}>
              <Link to="/pricing" className={styles.primaryButton}>
                Começar agora <FiArrowRight />
              </Link>
              <Link to="/empresa" className={styles.secondaryButton}>
                Conhecer a plataforma
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Stats / Features */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Por que guardar com o Nexoflex?</h2>
          <p>Organizar para sobrar. Veja como nosso sistema ajuda você a prosperar todos os meses.</p>
        </div>

        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FiTrendingUp />
            </div>
            <h3>Visualize seu crescimento</h3>
            <p>Acompanhe gráficos e extratos que mostram exatamente para onde seu dinheiro vai. Descubra onde cortar gastos inúteis.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FiTarget />
            </div>
            <h3>Acelere seus sonhos</h3>
            <p>Crie objetivos financeiros e acompanhe cada centavo poupado até a linha de chegada. Ver as barras subirem é viciante.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FiShield />
            </div>
            <h3>Liberdade e Segurança</h3>
            <p>Ter uma reserva de emergência cria paz mental. Comece hoje a construir seu escudo financeiro contra imprevistos.</p>
          </div>
        </div>
      </section>

      {/* CTA final mobile amigável */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2>A melhor hora para começar foi ontem. A segunda melhor é agora.</h2>
          <p>Pare de adiar sua saúde financeira. Escolha seu plano:</p>
          <div className={styles.pricingButtons}>
            <Link to="/pricing" className={styles.planButton}>
              <span className={styles.planName}>Plano Básico</span>
              <span className={styles.planPrice}>Gratuito</span>
            </Link>
            <Link to="/pricing" className={`${styles.planButton} ${styles.planEssential}`}>
              <div className={styles.popularBadge}>Mais Escolhido</div>
              <span className={styles.planName}>Plano Essencial</span>
              <span className={styles.planPrice}>R$ 14,99</span>
            </Link>
            <Link to="/pricing" className={styles.planButton}>
              <span className={styles.planName}>Plano Premium</span>
              <span className={styles.planPrice}>R$ 44,99</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
