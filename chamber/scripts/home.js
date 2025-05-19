const apiKey = "36dbed819a5626effe4a517ffe948ec8";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=7.39&lon=3.89&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=7.39&lon=3.89&exclude=hourly,minutely,alerts&units=metric&appid=${apiKey}`;

const apiFetch = async () => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

const forecastFetch = async () => {
  try {
    const response = await fetch(forecastUrl);

    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

const getMembers = async () => {
  try {
    const response = await fetch("data/members.json");

    if (response.ok) {
      const data = await response.json();
      displayMembers(data);
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

apiFetch();
forecastFetch();
getMembers();

const weatherList = document.getElementById("weatherList");
const weatherIcon = document.getElementById("weatherIcon");
const displayResults = (data) => {
  document.getElementById("temp").textContent = data.main.temp;
  document.getElementById("today").textContent = data.main.temp;

  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const desc = data.weather[0].description;

  const description = document.createElement("li");
  const high = document.createElement("li");
  const low = document.createElement("li");
  const humidity = document.createElement("li");

  low.innerHTML = `Low: ${data.main.temp_min}&deg;`;
  high.innerHTML = `High: ${data.main.temp_max}&deg;`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  description.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
  weatherIcon.setAttribute("src", iconSrc);
  weatherIcon.setAttribute("alt", desc);

  weatherList.appendChild(description);
  weatherList.appendChild(high);
  weatherList.appendChild(low);
  weatherList.appendChild(humidity);
};

const forecastList = document.getElementById("forecastList");
const displayForecast = (data) => {
  const forecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const forecastDays = [];

  for (let forecast of forecasts) {
    const forecastDate = new Date(forecast.dt_txt);
    const forecastDayStr = forecastDate.toDateString();

    if (!forecastDays.find((entry) => entry.date === forecastDayStr)) {
      forecastDays.push({
        date: forecastDayStr,
        temp: forecast.main.temp,
      });
    }

    if (forecastDays.length === 3) break;
  }

  // Display the 3-day forecast (today + 2 days)
  forecastDays.forEach((day) => {
    const li = document.createElement("li");
    li.innerHTML = `${day.date}: <strong>${day.temp}&deg;C</strong>`;

    forecastList.appendChild(li);
  });
};

const cardContainer = document.getElementById("cardContainer");
const displayMembers = (members) => {
  const spotlightArray = [];

  for (let index = 0; index < 3; index++) {
    const randomIndex = Math.floor(Math.random() * members.length);

    if (spotlightArray.includes(members[randomIndex])) {
      index--;
    } else if (members[randomIndex].membershipLevel > 1) {
      spotlightArray.push(members[randomIndex]);
    } else {
      index--;
    }
  }

  spotlightArray.map((member) => {
    const container = document.createElement("section");
    const name = document.createElement("h2");
    const logo = document.createElement("img");
    const founded = document.createElement("p");
    const location = document.createElement("p");
    const description = document.createElement("p");
    const website = document.createElement("span");
    const call = document.createElement("span");
    const membershipLevel = document.createElement("span");

    name.textContent = member.name;
    logo.setAttribute("src", member.imageUrl);
    logo.setAttribute("alt", member.name);
    logo.setAttribute("loading", "lazy");
    logo.setAttribute("width", "200");
    logo.setAttribute("height", "100");
    founded.textContent = `Founded: ${member.founded}`;
    location.textContent = member.address;
    description.textContent = member.description;
    website.innerHTML = `Visit us at <a target="_blank" href="${member.website}">${member.website}</a>`;
    call.innerHTML = `Or call us at <a target="_blank" href="tel:${member.phone}">${member.phone}</a>`;
    if (member.membershipLevel === 3) {
      membershipLevel.textContent = "Membership Level: Gold";
    } else if (member.membershipLevel === 2) {
      membershipLevel.textContent = "Membership Level: Silver";
    }

    container.appendChild(name);
    container.appendChild(logo);
    container.appendChild(description);
    container.appendChild(location);
    container.appendChild(founded);
    container.appendChild(website);
    container.appendChild(call);
    container.appendChild(membershipLevel);

    cardContainer.appendChild(container);
  });
};
