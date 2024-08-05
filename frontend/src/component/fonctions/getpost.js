const BASE_URL = 'http://913sq8.myd.infomaniak.com:8082';

/* Méthode POST */
const post = async (endpoint, data) => {
  console.log("ligne5");
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    // Essayez de lire le corps de la réponse pour obtenir plus de détails sur l'erreur
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  const json = await response.json();
  return json;
};

/* Méthode GET */
const get = async (endpoint, token, method = 'GET') => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  // Essayez d'extraire le JSON seulement si la réponse est au format JSON
  const contentType = response.headers.get('content-type');
  let json = {};
  if (contentType && contentType.includes('application/json')) {
    json = await response.json();
  } else {
    // Gérer les réponses non JSON (peut-être pour des messages d'erreur ou autres)
    json = await response.text();
  }

  if (!response.ok) {
    throw new Error(json.message || json);
  }

  return json;
};

/* Méthode DELETE */
const remove = async (endpoint, token) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // Essayez d'extraire le JSON seulement si la réponse est au format JSON
  const contentType = response.headers.get('content-type');
  let json = {};
  if (contentType && contentType.includes('application/json')) {
    json = await response.json();
  } else {
    // Gérer les réponses non JSON (peut-être pour des messages d'erreur ou autres)
    json = await response.text();
  }

  if (!response.ok) {
    throw new Error(json.message || json);
  }

  return json;
};

export const getApiUrl = (endpoint) => {
  const apiUrl = process.env.REACT_APP_API_URL || BASE_URL;
  return `${apiUrl}/${endpoint}`;
};

export { post, get, remove };
