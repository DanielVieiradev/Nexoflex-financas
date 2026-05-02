import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../modules/auth/application/AuthContext';
import PlanCard from '../ui/PlanCard';
import styles from './Pricing.module.css';
import { FaShieldAlt, FaMobileAlt, FaCalendarTimes } from 'react-icons/fa';

const Pricing = () => {
  const navigate = useNavigate();
  // We handle potential cases where AuthContext might be missing or still loading
  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectPlan = (planName) => {
    // TODO: Prepare integration with Stripe or Mercado Pago here
    // Example: 
    // const stripeSessionUrl = await createStripeSession(planName);
    // window.location.href = stripeSessionUrl;

    if (!user) {
      // If user is not logged in, redirect to login
      navigate('/login');
    } else {
      // If user is logged in, redirect to Dashboard for free plan, or checkout for paid plans
      if (planName === 'Básico') {
        navigate('/dashboard');
      } else {
        navigate(`/checkout?plan=${encodeURIComponent(planName)}`);
      }
    }
  };

  const plans = [
    {
      name: 'Básico',
      description: 'Comece a organizar suas finanças de forma simples',
      price: '0',
      popular: false,
      isEssential: false,
      features: [
        { text: 'Registro de receitas e despesas', included: true },
        { text: 'Categorias básicas', included: true },
        { text: 'Dashboard simples', included: true },
        { text: 'Dados limitados (últimos 30 dias)', included: true },
        { text: 'Sem histórico completo', included: false },
        { text: 'Sem gráficos avançados', included: false },
        { text: 'Sem backup em nuvem', included: false },
        { text: 'Sem multi-dispositivo', included: false }
      ],
      buttonText: 'Começar grátis'
    },
    {
      name: 'Essencial',
      description: 'Tenha controle total do seu dinheiro, em qualquer lugar',
      price: '14,99',
      popular: true,
      isEssential: true,
      features: [
        { text: 'Tudo do plano gratuito', included: true },
        { text: 'Histórico completo', included: true },
        { text: 'Acesso em múltiplos dispositivos', included: true },
        { text: 'Dados salvos na nuvem', included: true },
        { text: 'Gráficos básicos de gastos', included: true },
        { text: 'Controle mensal inteligente', included: true }
      ],
      buttonText: 'Assinar Essencial'
    },
    {
      name: 'Premium',
      description: 'Evolua financeiramente com análises avançadas e relatórios',
      price: '44,99',
      popular: false,
      isEssential: false,
      features: [
        { text: 'Tudo do Essencial', included: true },
        { text: 'Análise avançada de gastos', included: true },
        { text: 'Relatórios detalhados (mensal/anual)', included: true },
        { text: 'Alertas inteligentes (ex: gasto alto)', included: true },
        { text: 'Exportação (PDF / Excel)', included: true },
        { text: 'Insights automáticos (ex: "gastou X% a mais")', included: true }
      ],
      buttonText: 'Assinar Premium'
    }
  ];

  return (
    <div className={styles.pricingPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Planos transparentes para o seu sucesso</h1>
        <p className={styles.subtitle}>Escolha o plano ideal para suas necessidades financeiras. Cancele ou mude quando quiser.</p>
      </div>

      <div className={styles.plansContainer}>
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            name={plan.name}
            description={plan.description}
            price={plan.price}
            popular={plan.popular}
            isEssential={plan.isEssential}
            features={plan.features}
            buttonText={plan.buttonText}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>

      <div className={styles.extrasContainer}>
        <div className={styles.extraItem}>
          <FaCalendarTimes className={styles.extraIcon} />
          <span>Cancele quando quiser</span>
        </div>
        <div className={styles.extraItem}>
          <FaShieldAlt className={styles.extraIcon} />
          <span>Seus dados totalmente seguros</span>
        </div>
        <div className={styles.extraItem}>
          <FaMobileAlt className={styles.extraIcon} />
          <span>Acesse de qualquer dispositivo</span>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
