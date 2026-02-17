// 🔑 934f4bbf55c9be3781d554d7fc100294
const apiKey = "934f4bbf55c9be3781d554d7fc100294";

async function searchCity() {
  const city = document.getElementById("cityInput").value;

  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML =
        "<p>Cidade não encontrada ❌</p>";
      return;
    }

    showWeather(data);
  } catch {
    document.getElementById("weatherResult").innerHTML =
      "<p>Erro ao buscar clima ⚠️</p>";
  }
}

function showWeather(data) {
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;
  const cityName = data.name;

  document.getElementById("weatherResult").innerHTML = `
    <h2>${cityName}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
    <p class="temperature">${temp}°C</p>
    <p class="description">${desc}</p>
  `;
}