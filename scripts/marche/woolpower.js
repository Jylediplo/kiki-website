const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function fetchProductWoolPower(reference) {
  try {
    const rawResponse = await fetch(
      `https://www.equipements-militaire.com/jolisearch?s=${reference}&ajax=true&id_lang=2&maxRows=10`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
        },
      }
    );
    const response = await rawResponse.json();
    const item = response.products[0];
    const title = item.pname;
    const link = item.link;

    const productDetails = await fetchProductDetails(link);
    return { title, ...productDetails };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null; // Return null if there is an error
  }
}

async function fetchProductDetails(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'text/html',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const description = $('meta[property="og:description"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content');

    return { image, description };
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    return null; // Return null if there is an error
  }
}

module.exports = fetchProductWoolPower;
