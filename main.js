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

//target template section thatt holds pet cards
const cardTemplate = document.querySelector("#pet-card-list");
// create an empty document fragement that can store all of the html generated
// with pet call for loop so that entire block can be pushed out at once
// ** Nets faster execution of HTML **
const wrapper = document.createDocumentFragment();

async function petCall() {
  const petPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
  const petData = await petPromise.json();
  petData.forEach(pet => {
    // each for loop clone the html template of a pet card
    const templateClone = cardTemplate.content.cloneNode(true);

    // insert dynamic data
    templateClone.querySelector("h3").textContent = pet.name;
    templateClone.querySelector("p.pet-descrip").textContent = pet.description;
    templateClone.querySelector("p.pet-age").textContent = petAge(pet.birthYear);
    templateClone.querySelector("div.pet-card-photo img").src = pet.photo;
    templateClone.querySelector("div.pet-card-photo img").alt =
      "An image of a " + pet.species;

    // if no pet photo insert a fallback image
    if (!pet.photo) {
      templateClone.querySelector("div.pet-card-photo img").src = "images/fallback.jpg";
    }
    // Add new card to the document fragment for storage until loop is complete
    // then push to html will all the generated cards (faster then 1 by 1) 
    wrapper.appendChild(templateClone);

  });
  // add full set of pet cards held in wrapp document fragment to the pet list container
  document.querySelector(".pet-list").appendChild(wrapper);

}
petCall();

//Calculate pet years 
function petAge(birthYear) {
  let currentYear = new Date().getFullYear();
  let age = currentYear - birthYear;

  if (age == 1) {
    return "1 Year Old.";
  }
  else if (age < 1) {
    return "Less Than A Year Old.";

  }
  else {
    return age + " Years Old."
  }


}

// Pet filter button code

const allButtons = document.querySelectorAll(".pet-filter button");

allButtons.forEach(button => {
  button.addEventListener("click", handleButtonCLick);
});

function handleButtonCLick(clickEvent) {
  // remove active class from all buttons
  allButtons.forEach(button => {
    button.classList.remove("active")
  });

  // add active class to clicked button
  clickEvent.target.classList.add("active");

  // fiilter pets
}