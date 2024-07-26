export const isAuthenticated = () => {
    return !!localStorage.getItem('authenticationToken');
  };
  
  export const setAuthenticationToken = (token) => {
    localStorage.setItem('authenticationToken', token);
  };
  
  export const removeAuthenticationToken = () => {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('token');
    localStorage.removeItem('idecole');
  
  };
  
  export const getAuthenticationToken = () => {
    return localStorage.getItem('authenticationToken');
  };