const fetch = require('cross-fetch')

async function run()
{
    const rawRespnse = await fetch('https://www.rivolier-sd.com/amasty_xsearch/autocomplete/index/?q=TT7783&uenc=aHR0cHM6Ly93d3cucml2b2xpZXItc2QuY29tLw~~&form_key=9XbG7ia275a6BOBX&_=1722788944253', {
        method: 'GET',
        headers: {
            'accept': '*/*'
        }
    })
    const response = await rawRespnse.json()
    console.log(response);
}
run()