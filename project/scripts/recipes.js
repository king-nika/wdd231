const apiKey = "68fc3ef0f7244918b2bb399686eef414";
const recipesContainer = document.getElementById("recipes");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");
const dialogBox = document.querySelector("dialog");

const loadRecipes = async (query = "") => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=15&addRecipeInformation=true&query=${encodeURIComponent(
    query
  )}`;

  loader.style.display = "block";
  recipesContainer.style.display = "none";

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    displayRecipe(data.results);
  } catch (error) {
    recipesContainer.textContent =
      error.message + " Please reload page to try again.";
    recipesContainer.style.color = "red";
    console.error(error);
  } finally {
    loader.style.display = "none";
    recipesContainer.style.display = "grid";
  }
};

const displayRecipe = (recipes) => {
  recipesContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const container = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h2");
    const cookingTime = document.createElement("p");
    const servings = document.createElement("p");
    const price = document.createElement("p");
    const likes = document.createElement("p");
    const button = document.createElement("button");

    image.setAttribute("src", recipe.image);
    image.setAttribute("alt", recipe.title);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "312");
    image.setAttribute("height", "213");
    title.textContent = recipe.title;
    cookingTime.textContent = `Cooking Time: ${recipe.readyInMinutes} minutes`;
    servings.textContent = `Servings: ${recipe.servings}`;
    price.textContent = `Price per Serving $${recipe.pricePerServing}`;
    likes.textContent = `Total Likes: ${recipe.aggregateLikes}`;
    button.textContent = "Learn More";

    button.addEventListener("click", () => displayModal(recipe));

    container.appendChild(image);
    container.appendChild(title);
    container.appendChild(cookingTime);
    container.appendChild(servings);
    container.appendChild(price);
    container.appendChild(likes);
    container.appendChild(button);

    recipesContainer.appendChild(container);
  });
};

const displayModal = (recipe) => {
  dialogBox.showModal();
  dialogBox.innerHTML = "";

  dialogBox.innerHTML = `
    <button id="closeModal">&times;</button>
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}">
    <p>${recipe.summary}</p>
    <p>Ready in <strong>${recipe.readyInMinutes} minutes</strong></p>
    <p>No. of servings: <strong>${recipe.servings} servings</strong></p>
    <p>Price per serving: <strong>$${recipe.pricePerServing}</strong></p>

    <span>Diets:</span>
    <ul>
        ${recipe.diets.map((diet) => `<li>${diet}</li>`).join("")}
    </ul>

    <span>Dish Types:</span>
    <ul>
        ${recipe.dishTypes.map((diet) => `<li>${diet}</li>`).join("")}
    </ul>
    <button id="details">See Details</button>
  `;

  document
    .getElementById("closeModal")
    .addEventListener("click", () => dialogBox.close());

  document.getElementById("details").addEventListener("click", () => {
    localStorage.setItem("recipe", JSON.stringify(recipe.id));
    window.location.href = "recipe.html";
  });
};

loadRecipes();

let debounceTimer;
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    loadRecipes(query);
  }, 500);
});
