import { jwtDecode } from 'jwt-decode';

function getUserEmailAndStatus() {
    const token = localStorage.getItem('token'); // Remplacez 'token' par la clé que vous avez utilisée pour stocker le token dans le stockage local
    if (!token) return { email: null, statut: null, actif : null };
  
    const decodedToken = jwtDecode(token);
    /*console.log(decodedToken);*/
    return { email: decodedToken.email, statut: decodedToken.statut, actif: decodedToken.actif };
  }
  export { getUserEmailAndStatus };
