const API_KEY = "34f4bbf55c9be3781d554d7fc100294";

async function buscarClima() {

  const cidade = document.getElementById("cityInput").value;

  if (!cidade) {
    alert("Digite uma cidade");
    return;
  }

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("Cidade não encontrada");
      return;
    }

    // 📍 Cidade
    document.getElementById("cityName").textContent =
      `${data.name}, ${data.sys.country}`;

    // 🌡️ Temperatura
    document.getElementById("temperature").textContent =
      `${Math.round(data.main.temp)}°C`;

    // 📝 Descrição
    document.getElementById("description").textContent =
      data.weather[0].description;

    // 💧 Umidade
    document.getElementById("humidity").textContent =
      `${data.main.humidity}%`;

    // 🌬️ Vento (m/s → km/h)
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

  } catch (error) {
    alert("Erro ao buscar clima");
    console.error(error);
  }
}