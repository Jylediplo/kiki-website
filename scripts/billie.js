const fetch = require('cross-fetch')

async function run()
{
    const rawRespnse = await fetch('https://billyeight.com/wp-admin/admin-ajax.php?action=goya_search_products_ajax&category_slug=0&query=BLACK%20BARON', {
        method: 'GET',
        headers: {
            'accept': 'text/plain, */*; q=0.01',
            'content-type': 'text/html; charset=UTF-8'
        }
    })
    const response = await rawRespnse.json()
    console.log(response);
}
run()