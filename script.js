const API_KEY = "242c2d80bb4c5b016e11fc8e4bacfade";


/* 🔎 Buscar cidade */
async function buscarClima() {
  const cidade = document.getElementById("cityInput").value;
  if (!cidade) return;
  carregarClima(cidade);
}

/* 📍 Geolocalização */
function climaAtual() {
  navigator.geolocation.getCurrentPosition((pos) => {

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    carregarClimaCoords(lat, lon);
  });
}

/* 🌦️ Clima por cidade */
async function carregarClima(cidade) {

  const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const res = await fetch(url);
  const data = await res.json();

  mostrarClima(data);
  carregarForecast(cidade);
}

/* 🌦️ Clima por coordenadas */
async function carregarClimaCoords(lat, lon) {

  const url =
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const res = await fetch(url);
  const data = await res.json();

  mostrarClima(data);
  carregarForecastCoords(lat, lon);
}

/* 🖥️ Mostrar clima */
function mostrarClima(data) {

  document.getElementById("cityName").textContent =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("temperature").textContent =
    `${Math.round(data.main.temp)}°C`;

  document.getElementById("description").textContent =
    data.weather[0].description;

  document.getElementById("humidity").textContent =
    `${data.main.humidity}%`;

  document.getElementById("wind").textContent =
    `${Math.round(data.wind.speed * 3.6)} km/h`;

  document.getElementById("tempMin").textContent =
    `${Math.round(data.main.temp_min)}°C`;

  document.getElementById("tempMax").textContent =
    `${Math.round(data.main.temp_max)}°C`;

  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  mudarBackground(data.weather[0].main);
}

/* 🎨 Background dinâmico */
function mudarBackground(clima) {

  document.body.className = "";

  if (clima.includes("Clear")) document.body.classList.add("clear");
  else if (clima.includes("Clouds")) document.body.classList.add("clouds");
  else if (clima.includes("Rain")) document.body.classList.add("rain");
  else if (clima.includes("Snow")) document.body.classList.add("snow");
}

/* 📅 Forecast cidade */
async function carregarForecast(cidade) {

  const url =
  `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const res = await fetch(url);
  const data = await res.json();

  mostrarForecast(data);
}

/* 📅 Forecast coords */
async function carregarForecastCoords(lat, lon) {

  const url =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const res = await fetch(url);
  const data = await res.json();

  mostrarForecast(data);
}

/* 🖥️ Mostrar previsão */
function mostrarForecast(data) {

  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  const dias = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  dias.slice(0,5).forEach(dia => {

    const card = document.createElement("div");
    card.className = "forecast-card";

    const dataFormatada =
      new Date(dia.dt_txt).toLocaleDateString("pt-BR");

    card.innerHTML = `
      <p>${dataFormatada}</p>
      <img src="https://openweathermap.org/img/wn/${dia.weather[0].icon}.png">
      <p>${Math.round(dia.main.temp)}°C</p>
    `;

    forecastDiv.appendChild(card);
  });
}

function mudarBackground(clima) {
  const body = document.body;

  if (clima.includes("Clouds")) {
    body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31')";
  }

  else if (clima.includes("Rain")) {
    body.style.backgroundImage =
      "url('https://media.istockphoto.com/id/1257951336/pt/foto/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=J-an6RNfKUh3hwTXFxVUJ3RQFCeEeKa24_PLwWrnaGY=')";
  }

  else if (clima.includes("Clear")) {
    body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')";
  }

  else if (clima.includes("Snow")) {
    body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1608889175123-8ee362201f81')";
  }

  else {
    body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1499346030926-9a72daac6c63')";
  }
}

function mostrarPrevisao(dados) {

  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  const dias = {};

  // Agrupa por dia
  dados.list.forEach(item => {
    const data = item.dt_txt.split(" ")[0];

    if (!dias[data]) {
      dias[data] = item;
    }
  });

  // Pega só 5 dias
  const previsoes = Object.values(dias).slice(0, 5);

  previsoes.forEach(dia => {

    const data = new Date(dia.dt_txt);
    const nomeDia = data.toLocaleDateString("pt-BR", {
      weekday: "short"
    });

    const icone =
      `https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`;

    forecastDiv.innerHTML += `
      <div class="forecast-card">

        <div class="forecast-day">
          ${nomeDia}
        </div>

        <img src="${icone}">

        <div class="forecast-temp">
          ${Math.round(dia.main.temp_max)}°C
        </div>

        <div class="forecast-min">
          Min ${Math.round(dia.main.temp_min)}°C
        </div>

      </div>
    `;
  });
}