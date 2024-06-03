import axios from 'axios';

async function getTemplate(code) {
  const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
  const url = `${baseUrl}/api/template/${code}`;
  const result = await axios.get(url);
  return result.data.data.attributes;
}

export default getTemplate;
