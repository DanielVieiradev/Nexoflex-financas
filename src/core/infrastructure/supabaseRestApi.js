/**
 * Camada de acesso direto à REST API do Supabase.
 * 
 * Contorna o deadlock do Supabase JS v2 que ocorre após page refresh
 * quando chamadas a supabase.from() são feitas antes do client estar pronto.
 * Todas as queries usam o access_token da sessão já autenticada.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const TIMEOUT_MS = 10000;

/**
 * Monta os headers padrão para chamadas REST ao Supabase.
 */
function buildHeaders(accessToken) {
  return {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${accessToken || SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };
}

/**
 * Executa uma requisição HTTP com timeout.
 */
async function request(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Timeout: o Supabase não respondeu em tempo hábil.');
    }
    throw err;
  }
}

// ─── Transactions ──────────────────────────────────────────────────────

export async function fetchTransactionsApi(userId, accessToken) {
  const url = `${SUPABASE_URL}/rest/v1/transactions?select=*&user_id=eq.${userId}&order=date.desc`;
  return await request(url, { headers: buildHeaders(accessToken) });
}

export async function insertTransactionApi(transaction, accessToken) {
  const url = `${SUPABASE_URL}/rest/v1/transactions`;
  return await request(url, {
    method: 'POST',
    headers: buildHeaders(accessToken),
    body: JSON.stringify(transaction),
  });
}

export async function updateTransactionApi(id, updates, accessToken) {
  const url = `${SUPABASE_URL}/rest/v1/transactions?id=eq.${id}`;
  return await request(url, {
    method: 'PATCH',
    headers: buildHeaders(accessToken),
    body: JSON.stringify(updates),
  });
}

export async function deleteTransactionApi(id, accessToken) {
  const url = `${SUPABASE_URL}/rest/v1/transactions?id=eq.${id}`;
  return await request(url, {
    method: 'DELETE',
    headers: buildHeaders(accessToken),
  });
}

// ─── Projects ──────────────────────────────────────────────────────────

export async function fetchProjectsApi(userId, accessToken) {
  const url = `${SUPABASE_URL}/rest/v1/projects?select=*&user_id=eq.${userId}`;
  return await request(url, { headers: buildHeaders(accessToken) });
}

export async function getProjectApi(id, userId, accessToken) {
  const url = `${SUPABASE_URL}/rest/v1/projects?id=eq.${id}&user_id=eq.${userId}&select=*`;
  const data = await request(url, { headers: buildHeaders(accessToken) });
  return data && data.length > 0 ? data[0] : null;
}

export async function createProjectApi(projectData, accessToken) {
  const url = `${SUPABASE_URL}/rest/v1/projects`;
  return await request(url, {
    method: 'POST',
    headers: buildHeaders(accessToken),
    body: JSON.stringify(projectData),
  });
}

export async function updateProjectApi(id, userId, updates, accessToken) {
  const url = `${SUPABASE_URL}/rest/v1/projects?id=eq.${id}&user_id=eq.${userId}`;
  return await request(url, {
    method: 'PATCH',
    headers: buildHeaders(accessToken),
    body: JSON.stringify(updates),
  });
}

export async function deleteProjectApi(id, userId, accessToken) {
  const url = `${SUPABASE_URL}/rest/v1/projects?id=eq.${id}&user_id=eq.${userId}`;
  return await request(url, {
    method: 'DELETE',
    headers: buildHeaders(accessToken),
  });
}
