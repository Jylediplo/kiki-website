const fetch = require("cross-fetch")

async function run()
{
    const rawResponse = await fetch("https://eu1-search.doofinder.com/5/search?hashid=5293899ac2254f028ecd59ca769cb8bc&transformer=basic&rpp=20&query=01.202711&query_counter=2&page=1", {
        method: 'GET',
        headers: {
            'accept': '*/*',
            'priority': 'u=1, i'
        }
    })
    const response = await rawResponse.json()
    console.log(response);
}

run();