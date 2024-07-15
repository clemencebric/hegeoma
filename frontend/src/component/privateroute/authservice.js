export const isAuthenticated = () => {
    return !!localStorage.getItem('authenticationToken');
  };
  
  export const setAuthenticationToken = (token) => {
    localStorage.setItem('authenticationToken', token);
  };
  
  export const removeAuthenticationToken = () => {
    localStorage.removeItem('authenticationToken');
  };
  
  export const getAuthenticationToken = () => {
    return localStorage.getItem('authenticationToken');
  };
  