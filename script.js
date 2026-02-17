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

 // 📍 Dados principais
    document.getElementById("cityName").textContent =
      `${data.name}, ${data.sys.country}`;

    document.getElementById("temperature").textContent =
      `${Math.round(data.main.temp)}°C`;

    document.getElementById("description").textContent =
      data.weather[0].description;

    // 💧 Umidade
    document.getElementById("humidity").textContent =
      `${data.main.humidity}%`;

    // 🌬️ Vento
    document.getElementById("wind").textContent =
      `${Math.round(data.wind.speed * 3.6)} km/h`;

    // 🔻🔺 Min / Max
    document.getElementById("tempMin").textContent =
      `${Math.round(data.main.temp_min)}°C`;

    document.getElementById("tempMax").textContent =
      `${Math.round(data.main.temp_max)}°C`;

    // 🌤️ Ícone
    const icon = data.weather[0].icon;

    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${icon}@2x.png`;

  } catch {
    alert("Erro ao buscar clima");
  }
}