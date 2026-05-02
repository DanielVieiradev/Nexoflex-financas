import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../../core/infrastructure/supabaseClient';
import { login as authLogin, logout as authLogout, register as authRegister, loginWithGoogle as authGoogle } from '../infrastructure/authSupabaseApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // ─── Inicialização da sessão ─────────────────────────────────────────
  // onAuthStateChange é a fonte ÚNICA de verdade para o estado de auth.
  // REGRA CRÍTICA: NÃO chamar supabase.from() dentro do callback
  // do onAuthStateChange — isso causa deadlock no Supabase JS v2.
  useEffect(() => {
    let isMounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (!isMounted) return;

        // Apenas atualizar estado React — sem chamadas ao banco aqui
        setSession(currentSession);
        setUser(currentSession?.user || null);

        if (!currentSession?.user) {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    // Fallback: se o onAuthStateChange não disparar em 3s, libera a tela
    const fallbackTimer = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, []);

  // ─── Buscar perfil FORA do callback de auth ──────────────────────────
  // Isso evita o deadlock do Supabase JS v2. Roda em useEffect separado
  // sempre que o user mudar.
  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    const accessToken = session?.access_token;

    // Busca via REST direto para evitar possível deadlock no client
    fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${user.id}&select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${accessToken || supabaseKey}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        if (data && data.length > 0) {
          setProfile(data[0]);
        } else {
          setProfile(null);
        }
      })
      .catch(err => {
        console.error("Erro ao buscar perfil:", err);
        setProfile(null);
      });
  }, [user, session]);

  // ─── Ações de autenticação ───────────────────────────────────────────
  const login = async (email, password) => {
    return await authLogin(email, password);
  };

  const register = async (email, password) => {
    return await authRegister(email, password);
  };

  const loginWithGoogle = async () => {
    return await authGoogle();
  };

  const logout = async () => {
    setSession(null);
    setUser(null);
    setProfile(null);
    try {
      await authLogout();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, session, login, register, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
