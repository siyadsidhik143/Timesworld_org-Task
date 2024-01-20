import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRouting = () => {
  const navigate = useNavigate();
  const auth = sessionStorage.getItem('auth');

  if (auth && auth === 'authenticated') {
    return <Outlet />;
  } else {
    navigate('/login');
    return null;
  }
};

export default PrivateRouting;
