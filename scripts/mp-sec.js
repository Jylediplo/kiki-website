const fetch = require('cross-fetch')

async function run()
{
    const rawRespnse = await fetch('https://www.catalogue.mp-sec.fr/autocomplete.php?store=mpsec_fr&fallback_url=https://www.catalogue.mp-sec.fr/catalogsearch/ajax/suggest/&q=74465', {
        method: 'GET',
        headers: {
            'accept': 'text/javascript, text/html, application/xml, text/xml, */*'
        }
    })
    const response = await rawRespnse.text()
    console.log(response);
}
run()