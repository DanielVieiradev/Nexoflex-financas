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
    let isMounted = true;
    let initialSessionHandled = false;

    // Fallback de segurança: se o Supabase demorar mais de 5 segundos, liberamos a tela
    const fallbackTimer = setTimeout(() => {
      if (isMounted && !initialSessionHandled) {
        console.warn("AuthContext: fallback timer disparado, liberando tela.");
        initialSessionHandled = true;
        setLoading(false);
      }
    }, 5000);

    // onAuthStateChange é a fonte ÚNICA de verdade.
    // No Supabase v2+, ele dispara automaticamente um evento INITIAL_SESSION
    // quando a sessão é recuperada do localStorage (inclusive após refresh).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

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
          if (isMounted) {
            initialSessionHandled = true;
            setLoading(false);
          }
        }
      }
    );

    // Segurança extra: se o onAuthStateChange não disparar em 2s,
    // tentamos recuperar a sessão manualmente via getSession
    const getSessionFallback = setTimeout(async () => {
      if (isMounted && !initialSessionHandled) {
        try {
          const { data } = await supabase.auth.getSession();
          if (isMounted && !initialSessionHandled) {
            const s = data?.session;
            setSession(s || null);
            setUser(s?.user || null);
            if (s?.user) {
              await fetchProfile(s.user.id);
            }
            initialSessionHandled = true;
            setLoading(false);
          }
        } catch (err) {
          console.error("Erro no getSession fallback:", err);
          if (isMounted) {
            initialSessionHandled = true;
            setLoading(false);
          }
        }
      }
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
      clearTimeout(getSessionFallback);
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
