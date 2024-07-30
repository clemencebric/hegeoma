const BASE_URL = 'http://localhost:8081';

/* Méthode POST */
const post = async (endpoint, data) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

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
