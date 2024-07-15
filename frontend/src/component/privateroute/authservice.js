export const isAuthenticated = () => {
    const token = localStorage.getItem('authenticationToken');
    return token !== null;
  };