const cardContainer = document.getElementById("cardContainer");
const listBtn = document.getElementById("list");
const cardBtn = document.getElementById("card");

cardBtn.addEventListener("click", () => {
  cardContainer.classList.remove("list");
  cardContainer.classList.add("card");
});

listBtn.addEventListener("click", () => {
  cardContainer.classList.remove("card");
  cardContainer.classList.add("list");
});

const getMembers = async () => {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error(error);
  }
};

getMembers();

const displayMembers = (members) => {
  members.map((member) => {
    const container = document.createElement("section");
    const name = document.createElement("h2");
    const logo = document.createElement("img");
    const founded = document.createElement("p");
    const location = document.createElement("p");
    const description = document.createElement("p");
    const website = document.createElement("span");
    const call = document.createElement("span");

    name.textContent = member.name;
    logo.setAttribute("src", member.imageUrl);
    logo.setAttribute("alt", member.name);
    logo.setAttribute("loading", "lazy");
    logo.setAttribute("width", "200");
    logo.setAttribute("height", "100");
    founded.textContent = `Founded: ${member.founded}`;
    location.textContent = member.address;
    description.textContent = member.description;
    website.innerHTML = `Visit us at <a href="${member.website}">${member.website}</a>`;
    call.innerHTML = `Or call us at <a href="tel:${member.phone}">${member.phone}</a>`;

    container.appendChild(name);
    container.appendChild(logo);
    container.appendChild(description);
    container.appendChild(location);
    container.appendChild(founded);
    container.appendChild(website);
    container.appendChild(call);

    cardContainer.appendChild(container);
  });
};
