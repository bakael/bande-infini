async function getCryptoInfos(crypto) {
  const url = 'https://api.coincap.io/v2/assets/' + crypto;
  return fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(crypto+' : '+data.data.priceUsd);
          return data.data.priceUsd;
      })
      .catch(error => {console.error('Une erreur s\'est produite:', error);});
}

async function initialize() {
  // Exemple de données de prix des cryptomonnaies
  const cryptoPrices = await Promise.all([
    getCryptoInfos('bitcoin').then(price => ({ name: "Bitcoin", price })),
    getCryptoInfos('ethereum').then(price => ({ name: "Ethereum", price })),
    getCryptoInfos('litecoin').then(price => ({ name: "Litecoin", price })),
    // Ajoutez ici d'autres cryptomonnaies avec leurs prix correspondants
])

const tickerElement = document.getElementById("ticker");
// Construit le contenu de la bande défilante
let tickerContent = "";
cryptoPrices.forEach(crypto => {
    tickerContent += `<span onclick="handleCryptoClick('${crypto.name}')">${crypto.name}: ${parseFloat(crypto.price).toFixed(3)}</span> | `;
});
// Duplique le contenu pour qu'il défile en continu
tickerContent += 'DELTRAX Africa';
// Ajoute le contenu à l'élément HTML
tickerElement.innerHTML = tickerContent;
}


function handleCryptoClick(cryptoName) {
    alert(`Vous avez cliqué sur ${cryptoName}`);
}

// getAllCrypto(cryptoPrices)
// Appelle la fonction pour générer la bande défilante
initialize()
document.addEventListener('DOMContentLoaded', (event) => {initialize();});

// generateTicker();