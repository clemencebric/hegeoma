import { jwtDecode } from 'jwt-decode';

function getUserEmailAndStatus() { //sort les donnees du token
  const token = localStorage.getItem('token');
  if (!token) return { email: null, statut: null };

  const decodedToken = jwtDecode(token);
  return { email: decodedToken.email, statut: decodedToken.statut };
}
function isUserAuthorized(requiredStatus) { //compare le statut actuel au statut requis pour afficher la page
    const { statut } = getUserEmailAndStatus();
    return statut === requiredStatus;
  }
  
export { getUserEmailAndStatus, isUserAuthorized };