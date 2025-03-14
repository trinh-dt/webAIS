import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';
import Spinners from '../components/Spinner';

const GuestGuard = ({ children }) => {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation(); 

  if (!isInitialized) return <Spinners/>;
  let from = '/';
  console.log(location.state)
  if (location.state?.from?.pathname){
    if (location.state.from.pathname.indexOf("auth") >=0){
      from = "/"
    } else {
      from = location.state.from
    }
  } 
  if (isAuthenticated) return <Navigate to={from}/>;
  return <>{children}</>;
};

export default GuestGuard;
