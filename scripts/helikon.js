const fetch = require('cross-fetch')

async function run()
{
    const rawRespnse = await fetch('https://labrigadedelequipement.fr/search?q=ceinture*%20cobra*&type=article%2Cpage%2Cproduct&view=header', {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    })
    const response = await rawRespnse.json()
    console.log(response);
}
run()