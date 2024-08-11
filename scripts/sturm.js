const fetch = require("cross-fetch")

async function run()
{
    const rawResponse = await fetch("https://www.sturm-miltec.de/cgi-bin/shop/front/eidamo.cgi?func=searchsmart&wkid=6603791972830046&sbeg=12133002", {
        method: 'GET',
        headers:{
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9'
        }
    });
    const response = await rawResponse.text() 
    console.log(response);
}
run()