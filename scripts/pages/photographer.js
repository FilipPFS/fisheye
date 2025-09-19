import { MediaFactory } from "../factories/MediaFactory.js";

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

async function displayProfilePage() {
  const { photographer, medias } = await getPhotographerById();

  const totalLikes = medias.reduce((sum, media) => sum + media.likes, 0);

  const infoDisplayer = document.querySelector(".info-displayer");
  const price = document.createElement("p");
  const likes = document.createElement("span");
  price.innerText = `${photographer.price} € / jour`;
  likes.innerHTML = `
  ${totalLikes} <img src="/assets/icons/heart.webp" alt="likes" class="like-icon" />
`;

  infoDisplayer.appendChild(likes);

  infoDisplayer.appendChild(price);

  const photographerModel = photographerTemplate(photographer);
  photographerModel.buildPhotographerHeader();

  const gallery = document.querySelector(".media-gallery");
  gallery.innerHTML = "";

  medias.forEach((media) => {
    const mediaModel = MediaFactory(media, photographer.name);
    const mediaDOM = mediaModel.getMediaDOM();
    gallery.appendChild(mediaDOM);
  });
}

displayProfilePage();
