export function MediaFactory(media, photographerName) {
  const { title, image, video } = media || {};
  const assetName = (photographerName || "").split(" ")[0] || "";
  const mediaPath = `assets/medias/${assetName}/`;

  // Détermine si on crée une image ou une vidéo (élèment HTML)
  function createMediaElement(isLightbox = false) {
    if (image) {
      const img = document.createElement("img");
      img.className = "media-content";
      img.src = `${mediaPath}${image}`;
      img.alt = title ?? "media";
      return img;
    } else if (video) {
      const vid = document.createElement("video");
      vid.className = "media-content";
      vid.src = `${mediaPath}${video}`;
      if (isLightbox) {
        vid.controls = true;
        vid.setAttribute("playsinline", "");
      } else {
        vid.preload = "metadata";
        vid.muted = true;
        vid.setAttribute("aria-hidden", "true");
      }
      return vid;
    }
  }

  function getMediaDOM({
    mode = "gallery",
    withTitle = true,
    withLikes = true,
  } = {}) {
    if (mode === "gallery") {
      const article = document.createElement("article");
      article.className = "media-element";

      const mediaThumb = document.createElement("button");
      const mediaInfo = document.createElement("div");
      mediaThumb.className = "media-thumb";
      mediaInfo.className = "media-info";
      mediaThumb.setAttribute("tabindex", "0");
      mediaThumb.setAttribute("aria-label", `Ouvrir ${title}`);

      const mediaElement = createMediaElement(false);
      mediaThumb.appendChild(mediaElement);
      article.appendChild(mediaThumb);

      if (withTitle && title) {
        const h2 = document.createElement("h2");
        h2.className = "media-title";
        h2.textContent = title;
        mediaInfo.appendChild(h2);
      }

      if (withLikes) {
        const likesContainer = document.createElement("div");
        likesContainer.className = "likes-container";

        const likesCount = document.createElement("span");
        likesCount.className = "likes-count";
        likesCount.innerText = media.likes;

        const likeButton = document.createElement("button");
        likeButton.className = "like-btn";
        likeButton.innerHTML = `<img src="/assets/icons/heart.webp" alt="like" class="like-icon" />`;

        // Structure : nombre + bouton
        likesContainer.appendChild(likesCount);
        likesContainer.appendChild(likeButton);
        mediaInfo.appendChild(likesContainer);

        article.appendChild(mediaInfo);
      }

      return article;
    }

    // mode === 'lightbox'
    const container = document.createElement("div");
    container.className = "lightbox-media-container";
    const mediaElement = createMediaElement(true);
    container.appendChild(mediaElement);
    return container;
  }

  return { getMediaDOM };
}
