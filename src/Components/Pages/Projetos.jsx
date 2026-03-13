import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Container from "../layout/Container";
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPlus, FiEdit2, FiTrash2, FiStar, FiX } from "react-icons/fi";

function Projetos() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('nexo_transactions');
    return saved ? JSON.parse(saved) : [
      { id: 1, date: '2023-11-01', description: 'Salário', category: 'Receita', value: 5000, type: 'income', favorite: true },
      { id: 2, date: '2023-11-05', description: 'Aluguel', category: 'Moradia', value: 1500, type: 'expense', favorite: false },
      { id: 3, date: '2023-11-10', description: 'Supermercado', category: 'Alimentação', value: 600, type: 'expense', favorite: false },
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    value: '',
    type: 'expense'
  });

  useEffect(() => {
    localStorage.setItem('nexo_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.value, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.value, 0);
  const balance = totalIncome - totalExpense;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);
  };

  // Funções de CRUD
  const handleOpenModal = (transaction = null) => {
    if (transaction) {
      setEditingId(transaction.id);
      setFormData({
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        value: transaction.value,
        type: transaction.type
      });
    } else {
      setEditingId(null);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        value: '',
        type: 'expense'
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
    if (!formData.description || !formData.value || !formData.date) return;

    const newTransaction = {
      id: editingId ? editingId : Date.now(),
      ...formData,
      value: parseFloat(formData.value)
    };

    if (editingId) {
      setTransactions(transactions.map(t => t.id === editingId ? { ...newTransaction, favorite: t.favorite } : t));
    } else {
      setTransactions([{ ...newTransaction, favorite: false }, ...transactions]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('Tem certeza que deseja excluir esta transação?')){
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const toggleFavorite = (id) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, favorite: !t.favorite } : t));
  };

  // Ordena para que os favoritos apareçam antes
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a.favorite === b.favorite) {
      return new Date(b.date) - new Date(a.date);
    }
    return a.favorite ? -1 : 1;
  });

  return (
    <div className={styles.homeContainer}>
      <div className={styles.headerArea}>
        <h1>Gestão de Fluxo de Caixa</h1>
        <p>Acompanhe todas as suas entradas, saídas e saldo atualizado.</p>
      </div>

      <Container customClass="column">
        {/* Dashboard de Saldo */}
        <div className={styles.dashboardGrid}>
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <span>Total Entradas</span>
              <FiTrendingUp className={`${styles.icon} ${styles.iconIncome}`} />
            </div>
            <h2>{formatCurrency(totalIncome)}</h2>
          </div>
          
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <span>Total Saídas</span>
              <FiTrendingDown className={`${styles.icon} ${styles.iconExpense}`} />
            </div>
            <h2>{formatCurrency(totalExpense)}</h2>
          </div>

          <div className={`${styles.dashboardCard} ${styles.balanceCard}`}>
            <div className={styles.cardHeader}>
              <span>Saldo Atual</span>
              <FiDollarSign className={styles.icon} />
            </div>
            <h2>{formatCurrency(balance)}</h2>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className={styles.transactionsSectionMobile}>
          <div className={styles.sectionHeader}>
            <h3>Histórico de Transações</h3>
            <button className={styles.actionButton} onClick={() => handleOpenModal()}>
              <FiPlus /> Nova Transação
            </button>
          </div>
          
          <div className={styles.tableContainer}>
            <table className={styles.transactionsTable}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.length > 0 ? (
                  sortedTransactions.map(t => (
                    <tr key={t.id}>
                      <td data-label="Data">{new Date(`${t.date}T00:00:00`).toLocaleDateString('pt-BR')}</td>
                      <td data-label="Descrição">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {t.favorite && <FiStar fill="#F59E0B" color="#F59E0B" size={14} />}
                          {t.description}
                        </span>
                      </td>
                      <td data-label="Categoria">
                        <span className={styles.categoryTag}>{t.category}</span>
                      </td>
                      <td data-label="Valor" className={t.type === 'income' ? styles.incomeText : styles.expenseText}>
                        {t.type === 'income' ? '+ ' : '- '}
                        {formatCurrency(t.value)}
                      </td>
                      <td data-label="Ações">
                        <div className={styles.rowActions}>
                          <button 
                            className={`${styles.iconButton} ${t.favorite ? styles.favorite : ''}`} 
                            onClick={() => toggleFavorite(t.id)}
                            title={t.favorite ? "Remover dos favoritos" : "Favoritar"}
                          >
                            <FiStar fill={t.favorite ? "#F59E0B" : "none"} />
                          </button>
                          <button className={`${styles.iconButton} ${styles.edit}`} onClick={() => handleOpenModal(t)} title="Editar">
                            <FiEdit2 />
                          </button>
                          <button className={`${styles.iconButton} ${styles.delete}`} onClick={() => handleDelete(t.id)} title="Excluir">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.emptyMessage}>Nenhuma transação encontrada.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>

      {/* Modal de Transação */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? 'Editar Transação' : 'Nova Transação'}</h3>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className={styles.formGroup}>
                <label>Tipo de Transação</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="expense">Saída (Despesa)</option>
                  <option value="income">Entrada (Receita)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Descrição</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Ex: Conta de Luz" required />
              </div>

              <div className={styles.formGroup}>
                <label>Valor (R$)</label>
                <input type="number" step="0.01" name="value" value={formData.value} onChange={handleChange} placeholder="0.00" required />
              </div>

              <div className={styles.formGroup}>
                <label>Categoria</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Ex: Moradia, Alimentação..." required />
              </div>

              <div className={styles.formGroup}>
                <label>Data</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button type="submit" className={styles.saveButton}>Salvar Transação</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projetos;
