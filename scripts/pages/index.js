import { photographerTemplate } from "../templates/photographer.js";

// Fetch pour obtenir les photographeurs
async function getPhotographers() {
  const response = await fetch("../../data/photographers.json", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch photographers data");
  }

  const data = await response.json();
  console.log(data);

  return data;
}

// Fonction d'affiachage de données
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
