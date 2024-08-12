const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function run() {
  const rawResponse = await fetch(
    'https://www.equipements-militaire.com/jolisearch?s=8424&ajax=true&id_lang=2&maxRows=10',
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
  const image = item.img;
  const link = item.link;

  console.log('Title:', title);
  console.log('Image URL:', image);
  console.log('Product Link:', link);

  await fetchProductDetails(link);
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

    // Extraire la description à partir de la balise meta
    const description = $('meta[property="og:description"]').attr('content');
    console.log('Description:', description);
  } catch (error) {
    console.error('Failed to fetch product details:', error);
  }
}

run();
