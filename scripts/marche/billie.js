const fetch = require('cross-fetch');
const cheerio = require('cheerio');

async function run() {
  const rawResponse = await fetch(
    'https://billyeight.com/wp-admin/admin-ajax.php?action=goya_search_products_ajax&category_slug=0&query=BLACK%20BARON',
    {
      method: 'GET',
      headers: {
        accept: 'text/plain, */*; q=0.01',
        'content-type': 'text/html; charset=UTF-8',
      },
    }
  );
  const response = await rawResponse.json();
  const title = response.suggestions[0].value;
  const url = response.suggestions[0].url;
  const thumbnailHtml = response.suggestions[0].thumbnail;

  const $ = cheerio.load(thumbnailHtml);
  const thumbnailUrl = $('img').attr('src');

  console.log('Title:', title);
  console.log('Product URL:', url);
  console.log('Image URL:', thumbnailUrl);

  await getDescription(url);
}

async function getDescription(url) {
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

    let description = $('.description-inner').text().trim();
    description = description.replace(/\n/g, ' '); // Remove newlines

    // Exclude the unwanted part
    const unwantedText = 'Licence officielle Europe Billy Eight';
    const cutoffIndex = description.indexOf(unwantedText);
    if (cutoffIndex !== -1) {
      description = description.substring(0, cutoffIndex).trim(); // Cut off before the unwanted text
    }

    console.log('Description:', description);
  } catch (error) {
    console.error('Failed to fetch item description:', error);
  }
}

run();
