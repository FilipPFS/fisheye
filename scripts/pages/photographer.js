async function getPhotographer() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const response = await fetch("data/photographers.json");
  const data = await response.json();

  const photographer = data.photographers.find((p) => p.id === id);

  console.log("Photographe sélectionné :", photographer);
}

getPhotographer();
