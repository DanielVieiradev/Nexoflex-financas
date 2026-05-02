import React from "react";
import styles from "./PlanCard.module.css";
import { FaCheck, FaTimes } from "react-icons/fa";

const PlanCard = ({ name, price, popular, features, buttonText, onSelect, isEssential, description }) => {
  return (
    <div className={`${styles.card} ${isEssential ? styles.essential : ""}`}>
      {popular && <div className={styles.badge}>Mais escolhido</div>}
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.priceContainer}>
        <span className={styles.currency}>R$</span>
        <span className={styles.price}>{price}</span>
        {price !== "0" && <span className={styles.period}>/mês</span>}
      </div>

      <ul className={styles.features}>
        {features.map((feat, index) => {
          const isString = typeof feat === 'string';
          const text = isString ? feat : feat.text;
          const included = isString ? true : feat.included;

          return (
            <li key={index} className={`${styles.featureItem} ${!included ? styles.featureDisabled : ''}`}>
              {included ? (
                <FaCheck className={styles.checkIcon} />
              ) : (
                <FaTimes className={styles.timesIcon} />
              )}
              {text}
            </li>
          );
        })}
      </ul>
      <button
        className={`${styles.btn} ${isEssential ? styles.btnPrimary : styles.btnNeutral}`}
        onClick={() => onSelect(name)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PlanCard;
