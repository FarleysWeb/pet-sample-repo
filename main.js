/* forecast url 
* "https://api.weather.gov/gridpoints/MFL/110,50/forecast
*/

// Grab temperature data for miami florida
// Set text on feature card with weather data
async function weatherCall() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
  const weatherData = await weatherPromise.json();
  const temperature = weatherData.properties.periods[0].temperature;
  document.querySelector("#card-temp").textContent = temperature;
}

weatherCall();

// Grab Pet data for pet cards

async function petCall() {
  const petPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
  const petData = await petPromise.json();
  petData.forEach(pet => {
    console.log(pet.name);
  });

}

petCall();