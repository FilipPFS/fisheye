function openLightbox(index) {
  if (!mediasList || mediasList.length === 0) return;

  if (index < 0) index = 0;
  if (index >= mediasList.length) index = mediasList.length - 1;

  currentIndex = index;

  const lightbox = document.getElementById("lightbox");
  const content = document.getElementById("lightbox-content");
  const titleEl = document.getElementById("lightbox-title");

  content.innerHTML = "";
  titleEl.textContent = "";

  const media = mediasList[currentIndex];
  const mediaModel = MediaFactory(media, media.photographerName);
  const mediaDOM = mediaModel.getMediaDOM({ mode: "lightbox" });

  content.appendChild(mediaDOM);
  titleEl.textContent = media.title ?? "";

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const firstFocusable = document.getElementById("lightbox-close");
  if (firstFocusable) firstFocusable.focus();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function nextMedia() {
  if (!mediasList || mediasList.length === 0) return;

  currentIndex++;
  if (currentIndex >= mediasList.length) currentIndex = 0;

  openLightbox(currentIndex);
}

function prevMedia() {
  if (!mediasList || mediasList.length === 0) return;

  currentIndex--;
  if (currentIndex < 0) currentIndex = mediasList.length - 1;

  openLightbox(currentIndex);
}

document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") nextMedia();
  if (e.key === "ArrowLeft") prevMedia();
  if (e.key === "Escape") closeLightbox();
});
