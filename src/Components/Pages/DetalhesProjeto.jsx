import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, updateProject } from "../../modules/projects/infrastructure/projectSupabaseApi";
import { useAuth } from "../../modules/auth/application/AuthContext";
import ServiceForm from "../Project/ServiceForm";
import styles from "./DetalhesProjeto.module.css";

function DetalhesProjeto() {
  const { id } = useParams();
  const { user, session } = useAuth();

  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [novoOrcamento, setNovoOrcamento] = useState("");
  const [toast, setToast] = useState(null);

  function showToast(mensagem, tipo = "success") {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    if (!user || !session) return;
    getProject(id, user.id, session.access_token)
      .then((data) => {
        setProjeto({
          ...data,
          services: data.services || []
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, user, session]);

  if (loading) return <p>Carregando...</p>;
  if (!projeto) return <p>Projeto não encontrado.</p>;

  const totalGasto =
    projeto.services?.reduce((acc, s) => acc + Number(s.cost), 0) || 0;

  const orcamentoRestante = Number(projeto.budget) - totalGasto;
  const progresso = Math.min((totalGasto / Number(projeto.budget)) * 100, 100);

  function adicionarVerba(e) {
    e.preventDefault();

    const valor = Number(novoOrcamento);
    if (valor <= 0) {
      showToast("Insira um valor válido.", "error");
      return;
    }

    const novoBudget = Number(projeto.budget) + valor;

    if (!user || !session) return;

    updateProject(id, user.id, { budget: novoBudget }, session.access_token)
      .then(() => {
        setProjeto({ ...projeto, budget: novoBudget });
        setNovoOrcamento("");
        showToast("Verba adicionada com sucesso!");
      })
      .catch(() => showToast("Falha ao atualizar verba.", "error"));
  }

  function adicionarServico(service) {
    const custoServico = Number(service.cost);

    if (custoServico > orcamentoRestante) {
      showToast("Custo maior que o orçamento restante!", "error");
      return;
    }

    const safeId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString() + Math.random().toString(36).substring(2);

    const novoServico = { ...service, id: safeId };
    const novosServicos = [...projeto.services, novoServico];

    if (!user || !session) return;

    updateProject(id, user.id, { services: novosServicos }, session.access_token)
      .then(() => {
        setProjeto({ ...projeto, services: novosServicos });
        showToast("Serviço adicionado!");
      })
      .catch((err) => {
        console.error(err);
        showToast("Falha ao adicionar serviço.", "error")
      });
  }

  function removerServico(serviceId) {
    const servicesAtualizados = projeto.services.filter(
      (s) => s.id !== serviceId
    );

    if (!user || !session) return;

    updateProject(id, user.id, { services: servicesAtualizados }, session.access_token)
      .then(() => {
        setProjeto({ ...projeto, services: servicesAtualizados });
        showToast("Serviço removido!");
      })
      .catch((err) => {
        console.error(err);
        showToast("Falha ao remover serviço.", "error")
      });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projeto: {projeto.name}</h1>

      <div className={styles.layoutGrid}>

        {/* COLUNA ESQUERDA - INFORMAÇÕES */}
        <div className={styles.infoBox}>
          <p><strong>Descrição:</strong> {projeto.description}</p>
          <p><strong>Orçamento Total:</strong> R$ {projeto.budget}</p>
          <p><strong>Total Gasto:</strong> R$ {totalGasto}</p>

          <p className={orcamentoRestante < 0 ? styles.negativo : ""}>
            <strong>Orçamento Restante:</strong> R$ {orcamentoRestante}
          </p>

          <div className={styles.progressWrapper}>
            <div
              className={styles.progressBar}
              style={{ width: `${progresso}%` }}
            ></div>
          </div>

          <form onSubmit={adicionarVerba} className={styles.verbaForm}>
            <input
              type="number"
              placeholder="R$"
              value={novoOrcamento}
              onChange={(e) => setNovoOrcamento(e.target.value)}
            />
            <button type="submit">Adicionar</button>
          </form>
        </div>

        {/* COLUNA CENTRAL - FORMULÁRIO */}
        <div className={styles.formularioBox}>
          <h2 className={styles.sectionTitle}>Adicionar Serviço</h2>

          <ServiceForm
            handleSubmit={adicionarServico}
            btnText="Adicionar Serviço"
          />
        </div>

        {/* COLUNA DIREITA - SERVIÇOS */}
        <div className={styles.servicosContainer}>
          <h2 className={styles.sectionTitle}>Serviços</h2>

          <div className={styles.serviceList}>
            {projeto.services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <h3>{service.name}</h3>
                <p><strong>Custo:</strong> R$ {service.cost}</p>

                <button
                  className={styles.removeBtn}
                  onClick={() => removerServico(service.id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {toast && (
        <div
          className={`${styles.toast} ${toast.tipo === "error" ? styles.toastError : styles.toastSuccess
            }`}
        >
          {toast.mensagem}
        </div>
      )}
    </div>
  );
}
export default DetalhesProjeto;
