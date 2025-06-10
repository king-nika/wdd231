const userInfo = new URLSearchParams(window.location.search);
const main = document.querySelector("main");

main.innerHTML += `
    <span>Title: <strong>${userInfo.get("title")}</strong></span>
    <span>Image: <img src="${userInfo.get("image")}" alt="${userInfo.get(
  "title"
)}" width="312" height="213"></span>
    <span>Preparation Time: <strong>${userInfo.get(
      "time"
    )} minutes</strong></span>
    <span>No. of Servings: <strong>${userInfo.get(
      "servings"
    )} serving(s)</strong></span>
    <span>Ingredients:</span>
    <ul>
        ${userInfo
          .get("ingredients")
          .split(",")
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
    </ul>

    <span>Instructions:</span>
    <ol>
        ${userInfo
          .get("instructions")
          .split(".")
          .map((instruction) => `<li>${instruction}</li>`)
          .join("")}
    </ol>
`;
