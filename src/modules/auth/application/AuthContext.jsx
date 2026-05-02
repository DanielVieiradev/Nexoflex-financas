import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../../core/infrastructure/supabaseClient';
import { login as authLogin, logout as authLogout, register as authRegister, loginWithGoogle as authGoogle } from '../infrastructure/authSupabaseApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (!error && data) {
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error("Erro ao buscar perfil:", err);
    }
  };

  useEffect(() => {
    // Fallback de segurança: se o Supabase demorar muito, liberamos a tela após 3 segundos
    const fallbackTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Obter sessão inicial
    supabase.auth.getSession().then(({ data, error }) => {
      if (error || !data) {
        setLoading(false);
        return;
      }
      
      const { session } = data;
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }).catch((err) => {
      console.error("Erro no getSession:", err);
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          setSession(session);
          setUser(session?.user || null);
          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }
        } catch (err) {
          console.error("Erro no onAuthStateChange:", err);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => {
      clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, []);

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
