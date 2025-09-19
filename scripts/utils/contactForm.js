function displayModal() {
  const overlay = document.querySelector(".overlay");
  const modal = document.getElementById("contact_modal");

  overlay.classList.add("active");
  modal.style.display = "block";
}

function closeModal() {
  const overlay = document.querySelector(".overlay");
  const modal = document.getElementById("contact_modal");

  overlay.classList.remove("active");
  modal.style.display = "none";
}
