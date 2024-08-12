const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function run() {
  const rawResponse = await fetch(
    'https://www.promodis.net/search/ajax/suggest/?q=9515'
  );
  const response = await rawResponse.json();

  const product = response.find((item) => item.type === 'product');
  if (!product) {
    console.log('No product found');
    return;
  }

  const { title, image, url } = product;

  console.log('Title:', title);
  console.log('Image URL:', image);
  console.log('Product URL:', url);

  // Fetch product details from the link
  await fetchProductDetails(url);
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

    // Extract the description from the specified class
    const description = $('.product.attribute.description .value')
      .text()
      .trim();
    console.log('Description:', description);
  } catch (error) {
    console.error('Failed to fetch product details:', error);
  }
}

run();
