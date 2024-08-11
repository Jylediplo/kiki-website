const fetch = require('cross-fetch')

async function run()
{
    const rawResponse = await fetch('https://www.gilbert-production.fr/recherche', {
        method: 'POST',
        headers: {
            'accept': 'application/json, text/javascript, */*;',
            'content-type': 'application/x-www-form-urlencoded;'
        },
        body: `s=CL182&resultsPerPage=10`
    })
    const response = await rawResponse.json()
    console.log(response);
}
run();