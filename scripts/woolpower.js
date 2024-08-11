const fetch = require('cross-fetch')

async function run()
{
    const rawRespnse = await fetch('https://www.equipements-militaire.com/jolisearch?s=8424&ajax=true&id_lang=2&maxRows=10', {
        method: 'GET',
        headers: {
            'accept': 'application/json, text/javascript, */*; q=0.01'
        }
    })
    const response = await rawRespnse.json()
    console.log(response);
}
run()