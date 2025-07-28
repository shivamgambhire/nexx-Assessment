
import {test, expect } from '@playwright/test';

test('Validate Bitcoin API Data', async ({request}) => {
  const res = await request.get('https://api.coingecko.com/api/v3/coins/bitcoin');
  const data = await res.json();

  // Validate response has 'market_data' object
  const bpis = data.market_data.current_price;
  expect(bpis).toHaveProperty('usd');
  expect(bpis).toHaveProperty('eur');
  expect(bpis).toHaveProperty('gbp');

  // Validate each has market_cap and volume
  expect(data.market_data.market_cap).toHaveProperty('usd');
  expect(data.market_data.total_volume).toHaveProperty('usd');

  // Validate 24h price change
  expect(data.market_data).toHaveProperty('price_change_percentage_24h');

  // Homepage URL should not be empty
  expect(data.links.homepage[0]).not.toBe('');
});
