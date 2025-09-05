function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("aria-label", `Profil du photographe ${name}`);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait du photographe ${name}`);

    const h2 = document.createElement("h2");
    h2.textContent = name;

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

    article.appendChild(img);
    article.appendChild(h2);
    infoBlock.appendChild(spanCity);
    infoBlock.appendChild(spanTagline);
    infoBlock.appendChild(smallPrice);
    article.appendChild(infoBlock);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
