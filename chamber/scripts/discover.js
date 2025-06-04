const lastVisitContainer = document.querySelector(".lastVisit");
const now = new Date();
const lastVisit = Date.parse(localStorage.getItem("lastVisit"));

if (!lastVisit) {
  lastVisitContainer.textContent =
    "Welcome! Let us know if you have any questions.";
} else if (now - lastVisit < 1000 * 60 * 60 * 24) {
  lastVisitContainer.textContent = "Back so soon! Awesome!";
} else {
  const numOfDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  lastVisitContainer.textContent = `You last visited ${numOfDays} ${
    numOfDays === 1 ? "day" : "days"
  } ago.`;
}

localStorage.setItem("lastVisit", now);

const getLocations = async () => {
  try {
    const response = await fetch("data/discover.json");
    const data = await response.json();

    displayLocations(data);
  } catch (error) {
    console.error(error);
  }
};

const discoverContainer = document.getElementById("discover");
const displayLocations = (data) => {
  data.forEach((location) => {
    const cardContainer = document.createElement("section");
    const title = document.createElement("h2");
    const image = document.createElement("img");
    const figure = document.createElement("figure");
    const address = document.createElement("address");
    const description = document.createElement("p");
    const button = document.createElement("button");

    title.textContent = location.name;
    image.setAttribute("src", `images/${location.image}`);
    image.setAttribute("alt", location.name);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "300");
    image.setAttribute("height", "200");
    address.textContent = location.address;
    description.textContent = location.description;
    button.textContent = "Learn More";

    figure.appendChild(image);

    cardContainer.appendChild(figure);
    cardContainer.appendChild(title);
    cardContainer.appendChild(address);
    cardContainer.appendChild(description);
    cardContainer.appendChild(button);

    discoverContainer.appendChild(cardContainer);
  });
};

getLocations();
