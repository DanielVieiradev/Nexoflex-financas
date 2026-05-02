import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProject, updateProject } from "../../modules/projects/infrastructure/projectSupabaseApi";
import { useAuth } from "../../modules/auth/application/AuthContext";
import styles from "./EditarProjeto.module.css";

function EditarProjeto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, session } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !session) return;
    getProject(id, user.id, session.access_token)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar projeto:", err);
        setLoading(false);
      });
  }, [id, user, session]);

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user || !session) return;

    const projectToUpdate = {
      name: project.name,
      budget: Number(project.budget),
      category_id: project.category_id,
    };

    updateProject(id, user.id, projectToUpdate, session.access_token)
      .then(() => {
        alert("Projeto atualizado com sucesso!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Erro ao atualizar projeto:", err);
        alert("Erro ao atualizar, tente novamente.");
      });
  }

  if (loading) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  if (!project) {
    return <p className={styles.error}>Projeto não encontrado.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Projeto</h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        <label>Nome do projeto</label>
        <input
          type="text"
          name="name"
          value={project.name || ""}
          onChange={handleChange}
        />

        <label>Orçamento</label>
        <input
          type="number"
          name="budget"
          value={project.budget || ""}
          onChange={handleChange}
        />

        <label>Categoria</label>
        <select
          name="category_id"
          value={project.category_id || ""}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="Planejamento">Planejamento</option>
          <option value="Desenvolvimento">Desenvolvimento</option>
          <option value="Design">Design</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Marketing">Marketing</option>
          <option value="Infraestrutura">Infraestrutura</option>
          <option value="Operacional">Operacional</option>
        </select>

        <button type="submit" className={styles.btn}>Salvar alterações</button>
      </form>
    </div>
  );
}

export default EditarProjeto;
