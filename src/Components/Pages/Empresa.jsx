import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Container from "../../shared/ui/layout/Container";
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiX } from "react-icons/fi";

function Empresa() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('nexo_goals');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Viagem para Europa', current: 3000, target: 10000, favorite: true },
      { id: 2, title: 'Reserva de Emergência', current: 5000, target: 15000, favorite: false }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    current: '',
    target: ''
  });

  useEffect(() => {
    localStorage.setItem('nexo_goals', JSON.stringify(goals));
  }, [goals]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);
  };

  // Funções de CRUD
  const handleOpenModal = (goal = null) => {
    if (goal) {
      setEditingId(goal.id);
      setFormData({
        title: goal.title,
        current: goal.current,
        target: goal.target
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        current: 0,
        target: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.target) return;

    const newGoal = {
      id: editingId ? editingId : Date.now(),
      title: formData.title,
      current: parseFloat(formData.current) || 0,
      target: parseFloat(formData.target)
    };

    if (editingId) {
      setGoals(goals.map(g => g.id === editingId ? { ...newGoal, favorite: g.favorite } : g));
    } else {
      setGoals([{ ...newGoal, favorite: false }, ...goals]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Tem certeza que deseja excluir esta meta?')){
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  const toggleFavorite = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, favorite: !g.favorite } : g));
  };

  // Ordena para que os favoritos apareçam antes
  const sortedGoals = [...goals].sort((a, b) => {
    if (a.favorite === b.favorite) return 0;
    return a.favorite ? -1 : 1;
  });

  return (
    <div className={styles.homeContainer}>
      <div className={styles.headerArea}>
        <h1>Objetivos Financeiros</h1>
        <p>Acompanhe e edite suas metas para o futuro.</p>
      </div>
      <Container customClass="column">
        <div className={styles.goalsSectionMobile}>
          <div className={styles.sectionHeader}>
            <h3>Suas Metas</h3>
            <button className={styles.actionButton} onClick={() => handleOpenModal()}>
              <FiPlus /> Nova Meta
            </button>
          </div>
          <div className={styles.goalsList}>
            {sortedGoals.length > 0 ? (
              sortedGoals.map(goal => {
                const percentage = Math.min(Math.round((goal.current / goal.target) * 100), 100);
                return (
                  <div key={goal.id} className={styles.goalCard}>
                    <div className={styles.goalCardHeader}>
                      <div className={styles.goalTitle}>
                        <h4>
                          {goal.favorite && <FiStar fill="#F59E0B" color="#F59E0B" size={16} />}
                          {goal.title}
                        </h4>
                      </div>
                      <div className={styles.rowActions}>
                        <button 
                          className={`${styles.iconButton} ${goal.favorite ? styles.favorite : ''}`} 
                          onClick={() => toggleFavorite(goal.id)}
                          title={goal.favorite ? "Remover dos favoritos" : "Favoritar"}
                        >
                          <FiStar fill={goal.favorite ? "#F59E0B" : "none"} />
                        </button>
                        <button className={`${styles.iconButton} ${styles.edit}`} onClick={() => handleOpenModal(goal)} title="Editar">
                          <FiEdit2 />
                        </button>
                        <button className={`${styles.iconButton} ${styles.delete}`} onClick={() => handleDelete(goal.id)} title="Excluir">
                          <FiTrash2 />
                        </button>
                        <span className={styles.goalPercentage} style={{ marginLeft: '1rem' }}>{percentage}%</span>
                      </div>
                    </div>
                    
                    <div className={styles.progressBarBackground}>
                      <div 
                        className={styles.progressBarFill} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className={styles.goalDetails}>
                      <span>Guardado: {formatCurrency(goal.current)}</span>
                      <span>Meta: {formatCurrency(goal.target)}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={styles.emptyMessage}>Nenhuma meta definida.</p>
            )}
          </div>
        </div>
      </Container>


      {/* Modal de Metas */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Editar Meta' : 'Nova Meta'}</h3>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className={styles.formGroup}>
                <label>Título da Meta</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Ex: Viagem, Casa Própria, Fundo de Emergência" required />
              </div>

              <div className={styles.formGroup}>
                <label>Valor Alvo / Meta (R$)</label>
                <input type="number" step="0.01" name="target" value={formData.target} onChange={handleChange} placeholder="Quanto você precisa?" required />
              </div>

              <div className={styles.formGroup}>
                <label>Valor Já Guardado (R$)</label>
                <input type="number" step="0.01" name="current" value={formData.current} onChange={handleChange} placeholder="Quanto você já possui?" />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button type="submit" className={styles.saveButton}>Salvar Meta</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Empresa;
