const BASE_URL = 'http://localhost:8081';
/*methode post*/
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

/*methode get*/
const get = async (endpoint, token, method = 'GET') => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
 
  
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

const remove = async (endpoint, token) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

export const getApiUrl = (endpoint) => {
  const apiUrl = process.env.REACT_APP_API_URL || BASE_URL;
  return `${apiUrl}/${endpoint}`;
};


export { post, get, remove };
