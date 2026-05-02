import { useEffect, useState } from "react";
import styles from "./ProjectList.module.css";
import { fetchProjects } from "../../modules/projects/infrastructure/projectSupabaseApi";
import ProjectCard from "../Project/ProjectCard";
import { useAuth } from "../../modules/auth/application/AuthContext";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const { user, session } = useAuth();

  useEffect(() => {
    const loadProjects = async () => {
      if (!user || !session) return;
      try {
        const data = await fetchProjects(user.id, session.access_token);
        setProjects(data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    loadProjects();
  }, [user, session]);

  function removeProject(id) {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Projetos cadastrados</h2>

      {projects.length === 0 && (
        <p className={styles.empty}>Nenhum projeto cadastrado ainda.</p>
      )}
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            budget={project.budget}
            category={project.category}
            onRemove={removeProject}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsList;
