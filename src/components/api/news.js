import axios from 'axios';

async function getCompanyNews(jwt, symbol) {
  const url = process.env.REACT_APP_NEWS_URL || 'http://localhost:1337/api/newsstocks';
  const fullUrl = `${url}?symbol=${symbol}`;
  const result = await axios.get(fullUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  const dataArray = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of result.data.data) {
    dataArray.push(item.attributes);
  }
  return dataArray;
}

async function getTop10News(jwt) {
  const url = process.env.REACT_APP_NEWS_TOP10_URL || 'http://localhost:1337/api/newsitems';
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  return result;
}

export { getCompanyNews, getTop10News };
