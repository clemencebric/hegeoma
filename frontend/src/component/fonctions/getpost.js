const BASE_URL = 'http://localhost:8081';

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

const get = async (endpoint, token) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
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

export { post, get };
