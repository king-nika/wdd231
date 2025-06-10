const id = parseInt(localStorage.getItem("recipeId"));
const apiKey = "68fc3ef0f7244918b2bb399686eef414";
const main = document.getElementById("main");
const loader = document.getElementById("loader");

if (!id) {
  window.location.href = "index.html";
}

const getRecipeDetails = async () => {
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`;
  loader.style.display = "block";
  main.style.display = "none";

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    displayRecipe(data);
  } catch (error) {
    console.error(error);
    main.style.color = "red";
    main.textContent = error.message;
  } finally {
    loader.style.display = "none";
    main.style.display = "block";
  }
};

const displayRecipe = (recipe) => {
  main.innerHTML = "";
  main.innerHTML = `
  <h1>${recipe.title}</h1>
  <image src="${recipe.image}" alt="${
    recipe.title
  }" width="312" height="213" loading="lazy">
  <p fetchPriority="high>${recipe.summary}</p>

  <span>Prep Time: <strong>${recipe.readyInMinutes} minutes</strong></span>
  <span>Number of Servings: <strong>${recipe.servings}</strong></span>
  <span>Price per Serving: <strong>$${recipe.pricePerServing}</strong></span>

  <span>Diets:</span>
  <ul class="tags">
    ${recipe.diets.map((diet) => `<li>${diet}</li>`).join("")}
  </ul>

  <span>Dish Types:</span>
  <ul class="tags">
    ${recipe.dishTypes.map((diet) => `<li>${diet}</li>`).join("")}
  </ul>
  <span>Ingredients:</span>
  <ul>
      ${recipe.extendedIngredients
        .map((ingredient) => `<li>${ingredient.original}</li>`)
        .join("")}
  </ul>

  <span>Preparation:</span>
  <ol>
      ${
        recipe.instructions.startsWith("<ol>")
          ? recipe.instructions
          : recipe.instructions
              .split(". ")
              .map((step) => `<li>${step}</li>`)
              .join("")
      }
  </ol>
  `;
};

getRecipeDetails();
