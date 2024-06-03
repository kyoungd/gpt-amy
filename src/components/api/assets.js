import axios from 'axios';

async function getStockData(jwt, symbol) {
  const url = process.env.REACT_APP_ASSET_DATA_URL || 'http://localhost:1337/api/assets';
  const fullUrl = `${url}?symbol=${symbol}&timeframe=1Day`;
  const result = await axios.get(fullUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  const { data } = result.data.data.attributes;
  const dataArray = [];
  data.forEach((item) => {
    dataArray.push({
      date: new Date(item.Date),
      open: item.Open,
      high: item.High,
      low: item.Low,
      close: item.Close,
      volume: item.Volume
    });
  });
  return dataArray.length > 0 ? dataArray.reverse() : dataArray;
}

export { getStockData };
