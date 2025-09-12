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
  return { name, picture, getUserCardDOM };
}
