const nav = document.querySelector("nav ul");
const menuBtn = document.getElementById("menu");

const openMenu =
  '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>';
const closeMenu =
  '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';

menuBtn.innerHTML = openMenu;
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.innerHTML = nav.classList.contains("open") ? closeMenu : openMenu;
});

const courses = [
  {
    name: "CSE 110: Introduction to Programming",
    completed: true,
    credits: 2,
  },
  {
    name: "CSE 111: Programming with Functions",
    completed: true,
    credits: 2,
  },
  {
    name: "CSE 210: Programming with Classes",
    completed: false,
    credits: 2,
  },
  {
    name: "WDD 130: Web Fundamentals",
    completed: true,
    credits: 2,
  },
  {
    name: "WDD 131: Dynamic Web Fundamentals",
    completed: true,
    credits: 2,
  },
  {
    name: "WDD 231: Web Frontend Development",
    completed: false,
    credits: 2,
  },
];
const coursesContainer = document.getElementById("courses");
const creditsText = document.getElementById("credits");

let totalCredits = courses.reduce((total, course) => {
  return total + course.credits;
}, 0);

creditsText.textContent = totalCredits + " credit(s)";
const displayCourses = (course) => {
  const div = document.createElement("div");
  const name = document.createElement("p");
  const credits = document.createElement("p");

  name.textContent = course.name;
  credits.textContent = course.credits + " credit(s) course";

  div.appendChild(name);
  div.appendChild(credits);

  course.completed ? div.classList.add("completed") : null;

  coursesContainer.appendChild(div);
};

courses.forEach(displayCourses);

const allBtn = document.getElementById("all");
allBtn.addEventListener("click", () => {
  allBtn.classList.add("selected");
  wddBtn.classList.remove("selected");
  cseBtn.classList.remove("selected");

  coursesContainer.innerHTML = "";
  courses.forEach(displayCourses);

  totalCredits = courses.reduce((total, course) => {
    return total + course.credits;
  }, 0);

  creditsText.textContent = totalCredits + " credit(s)";
});

const wddBtn = document.getElementById("wdd");
wddBtn.addEventListener("click", () => {
  allBtn.classList.remove("selected");
  wddBtn.classList.add("selected");
  cseBtn.classList.remove("selected");

  coursesContainer.innerHTML = "";

  const filtered = courses.filter((course) => course.name.startsWith("WDD"));
  filtered.forEach(displayCourses);

  totalCredits = filtered.reduce((total, course) => {
    return total + course.credits;
  }, 0);

  creditsText.textContent = totalCredits + " credit(s)";
});

const cseBtn = document.getElementById("cse");
cseBtn.addEventListener("click", () => {
  allBtn.classList.remove("selected");
  wddBtn.classList.remove("selected");
  cseBtn.classList.add("selected");

  coursesContainer.innerHTML = "";
  const filtered = courses.filter((course) => course.name.startsWith("CSE"));
  filtered.forEach(displayCourses);

  totalCredits = filtered.reduce((total, course) => {
    return total + course.credits;
  }, 0);

  creditsText.textContent = totalCredits + " credit(s)";
});
