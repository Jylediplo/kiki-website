const fetch = require('cross-fetch')

async function run()
{
    const rawRespnse = await fetch('https://gkpro.fr/wp-admin/admin-ajax.php?action=woodmart_ajax_search&number=20&post_type=product&query=MAG-18', {
        method: 'GET',
        headers: {
            'accept': 'text/plain, */*; q=0.01'
        }
    })
    const response = await rawRespnse.json()
    console.log(response);
}
run()