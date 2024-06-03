import { faker } from '@faker-js/faker';
import axios from 'axios';

function GetUsers(stocksIn) {
  const users = [];

  Object.keys(stocksIn).forEach((key) => {
    const id = faker.datatype.uuid();
    const name = key;
    const stock = stocksIn[key];
    const {
      ad,
      atr,
      avgatr,
      cik,
      corr,
      cinv,
      relvol,
      volume,
      vpro,
      td,
      engulf,
      keylevel,
      keylevels,
      fibonachi,
      fibs,
      ema20,
      ema50,
      ema200,
      gap,
      gaps,
      dtop,
      ogap,
      oc,
      rsi,
      trend,
      reverse,
      vc,
      wr,
      wh,
      pj,
      vs,
      floats,
      floatp
    } = stock;
    const price = stock.close;
    const row = {
      id,
      ad,
      name,
      atr,
      avgatr,
      cik,
      corr,
      cinv,
      price,
      trend,
      reverse,
      keylevel,
      keylevels,
      fibonachi,
      fibs,
      relvol,
      vpro,
      td,
      engulf,
      volume,
      ema20,
      ema50,
      ema200,
      rsi,
      gap,
      gaps,
      dtop,
      ogap,
      oc,
      vc,
      wr,
      wh,
      pj,
      vs,
      floats,
      floatp
    };
    users.push(row);
  });
  return users;
}

function cleanupSymbols(result) {
  const data = GetUsers(result.data.data.attributes.data);
  return data;
}

async function getSymbols(jwt) {
  const url = process.env.REACT_APP_SYMBOL_SERVICE || 'http://localhost:1337/api/symbols';
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  return cleanupSymbols(result);
}

export { getSymbols };
