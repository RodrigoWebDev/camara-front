import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogoutHook = () => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');

    navigate('/login', { replace: true });
  }, [navigate]);

  return { logout };
};

export default useLogoutHook;
