import _ from 'lodash';
import axios from 'axios';

async function fetchRealtimeData(jwt) {
  const url = process.env.REACT_APP_REALTIME_SERVICE || 'http://localhost:1337/api/realtime';
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  let counter = 0;
  const transformed = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const data of result.data.data) {
    // eslint-disable-next-line no-plusplus
    ++counter;
    const value = JSON.stringify({
      datatype: data.attributes.datatype,
      symbol: data.attributes.symbol,
      timeframe: data.attributes.timeframe,
      price: data.attributes.data.price,
      codes: data.attributes.data.codes,
      pattern: _.join(data.attributes.data.patterns, ',')
    });
    transformed.push({
      id: data.id,
      sortid: counter,
      username: '-',
      value,
      time: new Date(data.attributes.createdAt).toLocaleString()      // toLocaleTimeString()
    });
  }
  // this must load on every refresh as it updates in real-time
  return transformed;
}

export default fetchRealtimeData;
