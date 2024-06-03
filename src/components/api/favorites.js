import axios from 'axios';

async function getFavorites(jwt) {
  const url = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:1337/api/favorites';
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  const jsondata = result.data.data.attributes.data ? result.data.data.attributes.data : {};
  return jsondata;
}

async function postFavorites(jwt, favorites) {
  // const token = localStorage.getItem('id_token');
  const url = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:1337/api/favorites';
  const result = await axios.post(url, favorites, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  return result;
}

export { getFavorites, postFavorites };
