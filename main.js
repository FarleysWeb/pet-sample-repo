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
  const petPromise = await fetch("https://whimsical-jalebi-c103a9.netlify.app/.netlify/functions/pets");
  const petData = await petPromise.json();
  petData.forEach(pet => {
    // each for loop clone the html template of a pet card
    const templateClone = cardTemplate.content.cloneNode(true);

    // insert dynamic data

    // add a dataset vriable to each pet cat
    templateClone.querySelector(".pet-card").dataset.species = pet.species;
    // add pet name to card
    templateClone.querySelector("h3").textContent = pet.name;
    // add pet descriptiion to card
    templateClone.querySelector("p.pet-descrip").textContent = pet.description;
    //add pet age to card
    templateClone.querySelector("p.pet-age").textContent = petAge(pet.birthYear);
    //add pet image to card
    templateClone.querySelector("div.pet-card-photo img").src = pet.photo;
    // add pet alt image description to card
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

  const currentFilter = clickEvent.target.dataset.filter;
  document.querySelectorAll(".pet-card").forEach(card => {
    if (currentFilter == card.dataset.species || currentFilter == "all") {
      card.style.display = "grid";
    }
    else {
      card.style.display = "none";
    }
  });
}