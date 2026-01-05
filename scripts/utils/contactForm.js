export function displayModal(name) {
  const overlay = document.querySelector(".overlay");
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  const closeBtn = document.querySelector(".closeBtn");
  const modalTitle = document.getElementById("contact_modal_title");

  modalTitle.innerHTML = `Contactez-moi <br> ${name}`;
  overlay.classList.add("active");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "true");
  document.body.classList.add("modal-open");
  closeBtn.focus();
  closeBtn.addEventListener("click", closeModal);

  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });
}

export function closeModal() {
  const overlay = document.querySelector(".overlay");
  const modal = document.getElementById("contact_modal");
  const openBtn = document.querySelector(".contact_button");
  const main = document.getElementById("main");

  overlay.classList.remove("active");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "false");
  document.body.classList.remove("modal-open");
  openBtn.focus();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

const form = document.getElementById("contact_form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data) {
      alert("Formulaire envoyé avec succès.");
      console.log(data);
      form.reset();
    }
  });
}
