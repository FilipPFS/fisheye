async function getPhotographerById() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const response = await fetch("data/photographers.json");
  const data = await response.json();

  const photographer = data.photographers.find((p) => p.id === id);
  const medias = data.media.filter((media) => media.photographerId === id);

  console.log(photographer, medias);

  return { photographer, medias };
}

let currentIndex = 0;
let mediasList = [];

async function displayData() {
  const { photographer, medias } = await getPhotographerById();
  const photographerModel = photographerTemplate(photographer);
  photographerModel.displayProfilePage(photographer, medias);
}

document.addEventListener("DOMContentLoaded", () => {
  displayData();

  const btnClose = document.getElementById("lightbox-close");
  const btnNext = document.getElementById("lightbox-next");
  const btnPrev = document.getElementById("lightbox-prev");
  const lightbox = document.getElementById("lightbox");

  if (btnClose) btnClose.addEventListener("click", closeLightbox);
  if (btnNext) btnNext.addEventListener("click", nextMedia);
  if (btnPrev) btnPrev.addEventListener("click", prevMedia);

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
});
