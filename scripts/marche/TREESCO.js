const fetch = require('cross-fetch');

async function fetchProductTreesco(reference) {
  const url = `https://eu1-search.doofinder.com/5/search?hashid=29e3cc7903640f8633c1f2e6a10fb818&query_counter=7&page=1&rpp=30&transformer=basic&query_name=match_and&session_id=f44ce3b5748e3473ba9bd7b77801b974&query=${reference}`;

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br, zstd',
      'accept-language': 'en-US,en;q=0.9',
      origin: 'https://www.madeinchasse.com',
      priority: 'u=1, i',
      referer: 'https://www.madeinchasse.com/',
      'sec-ch-ua':
        '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    },
  });

  const response = await rawResponse.json();
  const item = response.results[0];

  if (!item) {
    console.error(`No product found for reference: ${reference}`);
    return null;
  }

  const title = item.title;
  const description = item.description;
  const image = item.image_link;

  return { title, image, description };
}

module.exports = fetchProductTreesco;
