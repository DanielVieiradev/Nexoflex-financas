import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";
import { deleteProject } from "../../modules/projects/infrastructure/projectSupabaseApi";

function ProjectCard({ id, name, budget, category, onRemove }) {

  const handleRemove = async () => {
    try {
      await deleteProject(id);
      onRemove(id);
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
    }
  };

  return (
    <div className={styles.card}>
      <h3>{name}</h3>

      <p><strong>Orçamento:</strong> R$ {budget}</p>

      <p>
        <strong>Categoria:</strong>{" "}
        {category || "Categoria desconhecida"}
      </p>

      <div className={styles.actions}>
        <Link to={`/projeto/${id}`} className={styles.detailsBtn}>Detalhes</Link>
        <Link to={`/editar-projeto/${id}`} className={styles.editBtn}>Editar</Link>
        <button onClick={handleRemove} className={styles.deleteBtn}>Excluir</button>
      </div>
    </div>
  );
}

export default ProjectCard;
