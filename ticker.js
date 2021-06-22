// Array witch coins based on the "id" from the coingecko API
let symbols = ["ethereum", "bitcoin", "ripple", "binancecoin", "cardano", "kusama", "solana", "cartesi",
"litentry", "polkadot", "litecoin", "monero", "decentraland", "chiliz", "matic-network", "the-graph"];

async function getData(coin) {
  // Three spans per coin to fill with data
  const logo = document.querySelector(`#${coin}`);
  const data = document.querySelector(`#${coin}Marquee`);
  const change = document.querySelector(`#${coin}Change`);

  // get the Data
  let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=USD&include_24hr_change=true`)
  let coins = await response.json();

  // Work with Data
  let dataString = parseFloat(coins[coin].usd).toFixed(2) + " $";
  let changeString = parseFloat(coins[coin].usd_24h_change.toFixed(1)) + " %";
  let changeValue = coins[coin].usd_24h_change;

  // Edit
  logo.style.backgroundImage = `url(coins/${coin}.svg`;
  data.innerHTML = dataString;
  change.innerHTML = changeString;

  // determine whether the change is positive and painting it red or green
  if(changeValue < 0){
    change.style.color = "rgba(255, 34, 34, 1)";
  }
  if(changeValue == 0){
    change.style.color = "rgba(0, 0, 0, 1)";
  }
  if(changeValue > 0){
    change.style.color = "rgba(38, 174, 11, 1)";
  }
}

// one function too rule them all - just the Symbols loop
function marquee(){
  for (a = 0; a < symbols.length; a++){
    getData(symbols[a]);
    console.log(symbols[a]);
  }
}

marquee();
setInterval(marquee, 30000);
