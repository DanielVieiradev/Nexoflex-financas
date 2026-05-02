import React, { useState } from 'react';

const AdminPanel = () => {
  // Mock users mapping the SaaS base model
  const [users] = useState([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
      role: 'admin',
      plan: 'premium',
      created_at: '2023-01-10T10:00:00Z'
    },
    {
      id: '2',
      name: 'Maria Souza',
      email: 'maria@example.com',
      role: 'user',
      plan: 'pro',
      created_at: '2023-02-15T14:30:00Z'
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos@example.com',
      role: 'user',
      plan: 'free',
      created_at: '2023-03-20T09:15:00Z'
    }
  ]);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
        Painel Administrativo
      </h1>
      
      <div style={{ backgroundColor: 'var(--bg-card, #fff)', border: '1px solid var(--border-color, #eaeaea)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--bg-muted, #f9fafb)', borderBottom: '1px solid var(--border-color, #eaeaea)' }}>
            <tr>
              <th style={{ padding: '1rem' }}>Nome</th>
              <th style={{ padding: '1rem' }}>E-mail</th>
              <th style={{ padding: '1rem' }}>Role</th>
              <th style={{ padding: '1rem' }}>Plano</th>
              <th style={{ padding: '1rem' }}>Data de Registro</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color, #eaeaea)' }}>
                <td style={{ padding: '1rem' }}>{user.name}</td>
                <td style={{ padding: '1rem' }}>{user.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    backgroundColor: user.role === 'admin' ? '#fee2e2' : '#e0e7ff',
                    color: user.role === 'admin' ? '#991b1b' : '#3730a3'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    backgroundColor: user.plan === 'premium' ? '#fef3c7' : user.plan === 'pro' ? '#dcfce7' : '#f3f4f6',
                    color: user.plan === 'premium' ? '#92400e' : user.plan === 'pro' ? '#166534' : '#374151'
                  }}>
                    {user.plan}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: '#6b7280' }}>
                  {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
