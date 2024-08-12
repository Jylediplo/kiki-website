const fetch = require('cross-fetch');

async function run() {
  const rawRespnse = await fetch(
    'https://highlander-outdoor.com/search/suggest.json?q=ACC027&resources%5Btype%5D=product&resources%5Blimit%5D=8&resources%5Boptions%5D%5Bunavailable_products%5D=last&resources%5Boptions%5D%5Bfields%5D=title%2Cproduct_type%2Cvendor%2Cvariants.title%2Cvariants.sku%2Ctag',
    {
      method: 'GET',
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
      },
    }
  );
  const response = await rawRespnse.json();
  console.log(response.resources.results);
}
run();
