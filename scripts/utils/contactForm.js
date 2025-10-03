function displayModal(name) {
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
}

function closeModal() {
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
