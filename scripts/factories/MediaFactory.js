export function MediaFactory(media, photographerName) {
  const { title, image, video, likes } = media;

  const assetName = photographerName.split(" ")[0];
  const mediaPath = `assets/medias/${assetName}/`;

  console.log("ASSETS", mediaPath);

  function getMediaDOM() {
    const article = document.createElement("article");
    const mediaThumb = document.createElement("div");
    article.className = "media-element";
    mediaThumb.className = "media-thumb";

    // Création du média : image OU vidéo
    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", `${mediaPath}${image}`);
      mediaElement.setAttribute("alt", title);
    } else if (video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", `${mediaPath}${video}`);
      mediaElement.setAttribute("controls", true);
    }

    // Titre
    // const h2 = document.createElement("h2");
    // h2.textContent = title;

    // const likesContainer = document.createElement("div");
    // likesContainer.classList.add("likes");
    // likesContainer.innerHTML = `
    //   <span>${likes}</span>
    // `;

    mediaThumb.appendChild(mediaElement);
    article.appendChild(mediaThumb);
    // article.appendChild(h2);
    // article.appendChild(likesContainer);

    return article;
  }

  return { getMediaDOM };
}
