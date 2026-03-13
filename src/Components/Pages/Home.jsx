import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { FiTrendingUp, FiTarget, FiShield, FiArrowRight } from "react-icons/fi";
import heroImg from "../../img/home2.png"; // Usando imagem existente ou uma representação

function Home() {
  return (
    <div className={styles.landingContainer}>
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Seu futuro começa agora</span>
          <h1>Assuma o controle do seu dinheiro.</h1>
          <p>
            O Nexoflex é o seu parceiro digital para não apenas rastrear despesas, mas entender como você pode guardar mais. Motive-se a criar sua reserva e alcançar seus sonhos.
          </p>
          
          <div className={styles.heroButtons}>
            <Link to="/Projetos" className={styles.primaryButton}>
              Ver Meu Fluxo de Caixa <FiArrowRight />
            </Link>
            <Link to="/empresa" className={styles.secondaryButton}>
              Acessar Meus Objetivos
            </Link>
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
          <p>Pare de adiar sua saúde financeira.</p>
          <Link to="/Projetos" className={styles.primaryButtonLarge}>
            Começar Agora, de Graça
          </Link>
        </div>
      </section>
      
    </div>
  );
}

export default Home;
