import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Dashboard.module.css";
import Container from "../../shared/ui/layout/Container";
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPlus, FiEdit2, FiTrash2, FiStar, FiX } from "react-icons/fi";
import { supabase } from "../../core/infrastructure/supabaseClient";
import { useAuth } from "../../modules/auth/application/AuthContext";

function Projetos() {
  const { user, loading: authLoading, session } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [debugInfo, setDebugInfo] = useState('Inicializando...');

  // Helper para agrupar meses
  const getUniqueMonths = (txs) => {
    const months = txs.map(t => t.date.substring(0, 7)); // get YYYY-MM
    const currentMonth = new Date().toISOString().substring(0, 7);
    if (!months.includes(currentMonth)) {
      months.push(currentMonth);
    }
    return [...new Set(months)].sort((a, b) => b.localeCompare(a)); // desc
  };

  const [availableMonths, setAvailableMonths] = useState([new Date().toISOString().substring(0, 7)]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().substring(0, 7));

  const fetchTransactions = useCallback(async () => {
    if (!user) {
      setDebugInfo(prev => prev + ' | fetchTransactions: user é NULL, abortando.');
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'NÃO DEFINIDA';
    setDebugInfo(`URL: ${supabaseUrl} | User: ${user.id} | Buscando...`);

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error("Erro ao buscar transações:", error);
        setDebugInfo(`ERRO DB: ${error.message} | Code: ${error.code} | Hint: ${error.hint}`);
      } else {
        setTransactions(data || []);
        const months = getUniqueMonths(data || []);
        setAvailableMonths(months);
        setDebugInfo(`OK! ${(data || []).length} transações carregadas | URL: ${supabaseUrl} | User: ${user.id}`);
      }
    } catch (ex) {
      setDebugInfo(`EXCEÇÃO: ${ex.message || ex}`);
      console.error("Exceção ao buscar transações:", ex);
    }
  }, [user]);

  // Busca transações assim que o auth terminar de carregar e o user estiver disponível
  useEffect(() => {
    if (authLoading) {
      setDebugInfo('Auth carregando...');
      return;
    }
    if (!user) {
      setDebugInfo('Auth carregou mas user é NULL. Session: ' + (session ? 'existe' : 'NULL'));
      return;
    }
    setDebugInfo(`Auth OK. User: ${user.id}. Chamando fetch...`);
    fetchTransactions();
  }, [authLoading, user, session, fetchTransactions]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    value: '',
    type: 'expense'
  });
  const filteredTransactions = transactions.filter(t => t.date.substring(0, 7) === selectedMonth);

  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.value, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.value, 0);
  const balance = totalIncome - totalExpense;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);
  };

  const formatMonthLabel = (yearMonth) => {
    const [year, month] = yearMonth.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase());
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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.value || !formData.date || !user) return;

    const newTransaction = {
      date: formData.date,
      description: formData.description,
      category: formData.category,
      value: parseFloat(formData.value),
      type: formData.type,
      user_id: user.id
    };

    if (editingId) {
      const { error } = await supabase
        .from('transactions')
        .update(newTransaction)
        .eq('id', editingId);
      if (error) console.error("Erro ao atualizar:", error);
    } else {
      newTransaction.favorite = false;
      const { error } = await supabase
        .from('transactions')
        .insert([newTransaction]);
      if (error) {
        console.error("Erro ao inserir:", error);
        alert("ERRO AO INSERIR: " + error.message);
      }
    }

    await fetchTransactions();

    const transactionMonth = newTransaction.date.substring(0, 7);
    if (transactionMonth !== selectedMonth) {
      setSelectedMonth(transactionMonth);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      const { error } = await supabase.from('transactions').delete().eq('id', id);
      if (error) {
        console.error("Erro ao deletar:", error);
      } else {
        await fetchTransactions();
      }
    }
  };

  const toggleFavorite = async (transaction) => {
    const { error } = await supabase
      .from('transactions')
      .update({ favorite: !transaction.favorite })
      .eq('id', transaction.id);

    if (error) {
      console.error("Erro ao favoritar:", error);
    } else {
      setTransactions(transactions.map(t => t.id === transaction.id ? { ...t, favorite: !t.favorite } : t));
    }
  };

  // Ordena para que os favoritos apareçam antes
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a.favorite === b.favorite) {
      return new Date(b.date) - new Date(a.date);
    }
    return a.favorite ? -1 : 1;
  });

  return (
    <div className={styles.homeContainer}>
      {/* DEBUG BANNER - REMOVER DEPOIS */}
      <div style={{background:'#fef3c7',color:'#92400e',padding:'12px 20px',fontSize:'13px',fontFamily:'monospace',borderBottom:'2px solid #f59e0b',wordBreak:'break-all'}}>
        <strong>🔍 DEBUG:</strong> {debugInfo}
      </div>

      <div className={styles.headerArea}>
        <h1>Gestão de Fluxo de Caixa</h1>
        <p>Acompanhe todas as suas entradas, saídas e saldo atualizado.</p>

        <div className={styles.monthSelector}>
          {availableMonths.map(month => (
            <button
              key={month}
              className={`${styles.monthTab} ${selectedMonth === month ? styles.activeMonthTab : ''}`}
              onClick={() => setSelectedMonth(month)}
            >
              {formatMonthLabel(month)}
            </button>
          ))}
        </div>
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
                            onClick={() => toggleFavorite(t)}
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
// Force deploy
