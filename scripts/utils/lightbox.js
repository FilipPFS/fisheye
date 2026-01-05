import { MediaFactory } from "../factories/MediaFactory.js";
import { mediasList, currentIndex, setCurrentIndex } from "../utils/states.js";

export function openLightbox(index, list = mediasList) {
  if (!list || list.length === 0) return;

  setCurrentIndex(index);

  const lightbox = document.getElementById("lightbox");
  const content = document.getElementById("lightbox-content");
  const titleEl = document.getElementById("lightbox-title");

  content.innerHTML = "";
  titleEl.textContent = "";

  // On affiche le média grâce à son index
  const media = list[index];
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

export function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

export function nextMedia() {
  if (!mediasList || mediasList.length === 0) return;

  let nextIndex = currentIndex + 1;
  if (nextIndex >= mediasList.length) nextIndex = 0;

  setCurrentIndex(nextIndex);
  openLightbox(nextIndex);
}

export function prevMedia() {
  if (!mediasList || mediasList.length === 0) return;

  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) prevIndex = mediasList.length - 1;

  setCurrentIndex(prevIndex);
  openLightbox(prevIndex);
}

// Accessibilité avec le clavier
document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") nextMedia();
  if (e.key === "ArrowLeft") prevMedia();
  if (e.key === "Escape") closeLightbox();
});
