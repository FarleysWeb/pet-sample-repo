/* forecast url 
* "https://api.weather.gov/gridpoints/MFL/110,50/forecast
*/


async function weatherCall() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
  const weatherData = await weatherPromise.json();
  const temperature = weatherData.properties.periods[0].temperature;
  document.querySelector("#card-temp").textContent = temperature;
}

weatherCall();