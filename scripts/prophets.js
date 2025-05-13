const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cardsContainer = document.getElementById("cards");

const getProphetData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
  console.table(data.prophets);
};

getProphetData();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const portrait = document.createElement("img");
    const dateOfBirth = document.createElement("p");
    const placeOfBirth = document.createElement("p");

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
    placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `Portrait of ${prophet.name} ${prophet.lastname}`
    );
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");
    portrait.setAttribute("loading", "lazy");

    card.appendChild(fullName);
    card.appendChild(dateOfBirth);
    card.appendChild(placeOfBirth);
    card.appendChild(portrait);

    cardsContainer.appendChild(card);
  });
};
