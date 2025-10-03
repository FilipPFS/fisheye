function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Voir le profil de ${name}`);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait du photographe ${name}`);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    link.appendChild(img);
    link.appendChild(h2);

    const infoBlock = document.createElement("div");
    infoBlock.className = "info_block";

    const spanCity = document.createElement("span");
    spanCity.textContent = `${city}, ${country}`;
    spanCity.setAttribute("aria-label", `Localisation : ${city}, ${country}`);

    const spanTagline = document.createElement("span");
    spanTagline.textContent = tagline;
    spanTagline.setAttribute("aria-label", `Slogan : ${tagline}`);

    const smallPrice = document.createElement("small");
    smallPrice.textContent = `${price}€/jour`;
    smallPrice.setAttribute("aria-label", `Tarif journalier : ${price} euros`);

    article.appendChild(link);
    infoBlock.appendChild(spanCity);
    infoBlock.appendChild(spanTagline);
    infoBlock.appendChild(smallPrice);
    article.appendChild(infoBlock);

    return article;
  }

  function buildPhotographerHeader() {
    const photographersHeader = document.querySelector(".photograph-header");
    photographersHeader.textContent = "";

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("photographer-info");

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const location = document.createElement("h4");
    location.textContent = `${city}, ${country}`;

    const pTagline = document.createElement("p");
    pTagline.textContent = tagline;

    infoDiv.appendChild(h1);
    infoDiv.appendChild(location);
    infoDiv.appendChild(pTagline);

    const contactDiv = document.createElement("div");
    contactDiv.classList.add("photographer-contact");

    const button = document.createElement("button");
    button.classList.add("contact_button");
    button.textContent = "Contactez-moi";
    button.addEventListener("click", () => displayModal(name));

    contactDiv.appendChild(button);

    const portraitDiv = document.createElement("div");
    portraitDiv.classList.add("photographer-portrait");

    const img = document.createElement("img");
    img.src = picture;
    img.alt = name;

    portraitDiv.appendChild(img);

    photographersHeader.appendChild(infoDiv);
    photographersHeader.appendChild(contactDiv);
    photographersHeader.appendChild(portraitDiv);
  }

  function displayProfilePage(photographer, medias) {
    let totalLikes = medias.reduce((sum, media) => sum + media.likes, 0);

    const infoDisplayer = document.querySelector(".info-displayer");
    infoDisplayer.innerHTML = "";
    const likesEl = document.createElement("div");
    likesEl.className = "profile-likes";
    likesEl.innerHTML = `${totalLikes} <img src="/assets/icons/heart.webp" alt="likes" class="like-icon" />`;
    const priceEl = document.createElement("div");
    priceEl.className = "profile-price";
    priceEl.innerText = `${photographer.price} € / jour`;

    infoDisplayer.appendChild(likesEl);
    infoDisplayer.appendChild(priceEl);

    const photographerModel = photographerTemplate(photographer);
    photographerModel.buildPhotographerHeader();

    const gallery = document.querySelector(".media-gallery");
    const filterSelect = document.querySelector("#media-filter");

    mediasList = medias
      .map((m) => ({
        ...m,
        photographerName: photographer.name,
      }))
      .sort((a, b) => b.likes - a.likes);

    function renderGallery(list) {
      gallery.innerHTML = "";

      list.forEach((media) => {
        const mediaModel = MediaFactory(media, photographer.name);
        const mediaDOM = mediaModel.getMediaDOM({
          mode: "gallery",
          withTitle: true,
          withLikes: true,
        });

        const likeBtn = mediaDOM.querySelector(".like-btn");
        const likesCount = mediaDOM.querySelector(".likes-count");

        let isLiked = false;
        if (likeBtn && likesCount) {
          likeBtn.addEventListener("click", () => {
            if (!isLiked) {
              media.likes++;
              totalLikes++;
              isLiked = true;
            } else {
              media.likes--;
              totalLikes--;
              isLiked = false;
            }
            likesCount.innerText = media.likes;
            document.querySelector(
              ".profile-likes"
            ).innerHTML = `${totalLikes} <img src="/assets/icons/heart.webp" alt="likes" class="like-icon" />`;
          });
        }

        const thumb = mediaDOM.querySelector(".media-thumb");
        if (thumb) {
          thumb.addEventListener("click", () => {
            console.log(media);
            openLightbox(list.indexOf(media));
          });
          thumb.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openLightbox(list.indexOf(media));
            }
          });
        }

        gallery.appendChild(mediaDOM);
      });
    }

    renderGallery(mediasList);

    filterSelect.addEventListener("change", (e) => {
      const value = e.target.value;

      if (value === "likes") {
        mediasList.sort((a, b) => b.likes - a.likes);
      } else if (value === "date") {
        mediasList.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (value === "title") {
        mediasList.sort((a, b) => a.title.localeCompare(b.title));
      }

      renderGallery(mediasList);
    });
  }

  return {
    name,
    picture,
    getUserCardDOM,
    buildPhotographerHeader,
    displayProfilePage,
  };
}
