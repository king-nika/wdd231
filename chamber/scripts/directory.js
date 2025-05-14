const menuIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333333"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>';
const closeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333333"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
const menuBtn = document.querySelector(".menu");
const nav = document.querySelector("nav ul");

menuBtn.innerHTML = menuIcon;
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.innerHTML = nav.classList.contains("open") ? closeIcon : menuIcon;
});

const cardContainer = document.getElementById("cardContainer");
const listBtn = document.getElementById("list");
const cardBtn = document.getElementById("card");

const getMembers = async () => {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);

    console.log(data);
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
