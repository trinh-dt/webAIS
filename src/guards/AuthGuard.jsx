import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinners from '../components/Spinner';

const AuthGuard = ({ children }) => {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation(); 
  if (!isInitialized) return <Spinners/>;

  if (!isAuthenticated) return <Navigate to="/auth/login" state={{ from: location }} replace/>;

  return <>{children}</>;
};

export default AuthGuard;
