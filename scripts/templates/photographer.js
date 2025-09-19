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
    button.addEventListener("click", displayModal);

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

  return { name, picture, getUserCardDOM, buildPhotographerHeader };
}
