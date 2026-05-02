import { useState } from "react";
import Input from "../Form/Input";
import styles from "./ProjectForm.module.css";
import { createProject } from "../../modules/projects/infrastructure/projectSupabaseApi";

function ProjectForm() {
  const [project, setProject] = useState({
    name: "",
    budget: "",
    category: "",
  });

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const projectToInsert = {
      name: project.name,
      budget: Number(project.budget),
      category: project.category,
    };

    try {
      await createProject(projectToInsert);
      alert("✅ Projeto criado com sucesso!");
      setProject({ name: "", budget: "", category: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Ocorreu um erro ao salvar o projeto.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form_container}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name}
      />

      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget}
      />

      <div className={styles.form_control}>
        <label htmlFor="category"></label>
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={project.category}
        >
          <option value="">Selecione a categoria</option>
          <option value="Planejamento">Planejamento</option>
          <option value="Desenvolvimento">Desenvolvimento</option>
          <option value="Design">Design</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Marketing">Marketing</option>
          <option value="Infraestrutura">Infraestrutura</option>
          <option value="Operacional">Operacional</option>
        </select>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Criar projeto
      </button>
    </form>
  );
}

export default ProjectForm;
