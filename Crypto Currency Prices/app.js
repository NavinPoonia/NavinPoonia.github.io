var baseUrl = "https://api.coinranking.com/v2/coins"
var proxyUrl = "https://cors-anywhere.herokuapp.com/"
var apiKey = "coinrankingfb2afc92486088b3c047605da2b8bcbb23c27ad53cdea0f6"

fetch(`${proxyUrl}${baseUrl}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${apiKey}`,
        'Access-Control-Allow-Origin': '*',
    }
}).then((response) => {
    // console.log(response)
    if (response.ok) {
        response.json().then((json) => {
            console.log(json.data.coins)

            let coinsData = json.data.coins

            if (coinsData.length > 0) {
                var cryptoCoins = ""
            }
            // for loop for each element of coins 
            coinsData.forEach((coins) => {
                cryptoCoins += "<tr>"
                cryptoCoins += `<td> ${coins.tier}</td>`
                cryptoCoins += `<td> <img src="${coins.iconUrl}" style="width:25px; height:25px"></td>`; "<tr>";
                cryptoCoins += `<td> ${coins.name}</td>`
                cryptoCoins += `<td> ${coins.rank}</td>`
                cryptoCoins += `<td> $${Math.round(coins.price)} Billion</td>`
                cryptoCoins += `<td> ${(coins.btcPrice)}</td>`
                cryptoCoins += `<td> ${coins.symbol}</td>`
                cryptoCoins += `<td> ${coins.uuid}</td>`
            })

            document.getElementById("data").innerHTML = cryptoCoins
        })
    }
}).catch((error) => {
    console.log(error);
})
