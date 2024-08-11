const fetch = require('cross-fetch')

async function run()
{
    const rawRespnse = await fetch('https://commerce.adobe.io/search/graphql', {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'content-type': 'application/json',
            'magento-store-code': 'store_fr',
            'magento-store-view-code': 'default_fr',
            'magento-website-code': 'base_fr',
            'magento-environment-id':'6b664344-0a34-434a-81be-a5dbe9425dde',
            'x-api-key': 'search_gql',
            'x-request-id': '4979f14c-91ce-4009-84e6-67f0f5c37f3c'
        },
        body : `{"query":"\n    query quickSearch(\n        $phrase: String!\n        $pageSize: Int = 20\n        $currentPage: Int = 1\n        $filter: [SearchClauseInput!]\n        $sort: [ProductSearchSortInput!]\n        $context: QueryContextInput\n    ) {\n        productSearch(\n            phrase: $phrase\n            page_size: $pageSize\n            current_page: $currentPage\n            filter: $filter\n            sort: $sort\n            context: $context\n        ){\n            items {\n                ...Product\n            }\n            page_info {\n                current_page\n                page_size\n                total_pages\n            }\n        }\n    }\n    \n    fragment Product on ProductSearchItem {\n        product {\n            __typename\n            sku\n            name\n            canonical_url\n            small_image {\n                url\n            }\n            image {\n                url\n            }\n            thumbnail {\n                url\n            }\n            price_range {\n                minimum_price {\n                    fixed_product_taxes {\n                        amount {\n                            value\n                            currency\n                        }\n                        label\n                    }\n                    regular_price {\n                        value\n                        currency\n                    }\n                    final_price {\n                        value\n                        currency\n                    }\n                    discount {\n                        percent_off\n                        amount_off\n                    }\n                }\n                maximum_price {\n                    fixed_product_taxes {\n                        amount {\n                            value\n                            currency\n                        }\n                        label\n                    }\n                    regular_price {\n                        value\n                        currency\n                    }\n                    final_price {\n                        value\n                        currency\n                    }\n                    discount {\n                        percent_off\n                        amount_off\n                    }\n                }\n            }\n        }\n    }\n\n","variables":{"phrase":"4002","pageSize":8,"filter":[{"attribute":"visibility","in":["Search","Catalog, Search"]}],"context":{"customerGroup":"b6589fc6ab0dc82cf12099d1c2d40ab994e8410c","userViewHistory":[]}}}`
    })
    const response = await rawRespnse.json()
    console.log(response);
}
run()