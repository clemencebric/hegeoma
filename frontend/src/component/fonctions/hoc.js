import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from './jwtDecode';

const withAuthentication = (WrappedComponent) => {
  return (props) => {
    const [isTokenValid, setIsTokenValid] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const userData = getUserEmailAndStatus();
      console.log(userData);
      if (!userData.isConnected) {
        setIsTokenValid(false);
      }
    }, []);

    useEffect(() => {
      if (!isTokenValid) {
        navigate('/login', { state: { message: 'Votre connexion a expiré, merci de vous reconnecter.' } });
      }
    }, [isTokenValid, navigate]);

    if (!isTokenValid) {
      return null; // or a loading spinner, etc.
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;
