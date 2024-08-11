const fetch = require("cross-fetch")

async function run()
{
    const rawResponse = await fetch("https://www.promodis.net/search/ajax/suggest/?q=9515") //{
    //     method: 'GET',
    //     headers:{
    //         'Accept' : '*/*'
    //     }
    // });
    const response = await rawResponse.json() 
    console.log(response);
}
run()