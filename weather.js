 const apiKey = "ad90167062d24a68ab8184931250207";

    function fetchWeather(city = "Cairo") {
      const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
      const weatherContainer = document.querySelector('.weather-container');

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          if (!data.forecast || !data.forecast.forecastday) {
            weatherContainer.innerHTML = '<div class="error">Weather data unavailable.</div>';
            return;
          }

          for (let i = 0; i < 3; i++) {
            const forecast = data.forecast.forecastday[i];
            const container = document.getElementById(`day${i}`);
            if (!container) continue;

            const dateObj = new Date(forecast.date);
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' });
            const icon = forecast.day.condition.icon;
            const temp = forecast.day.avgtemp_c;
            const condition = forecast.day.condition.text;
            const humidity = forecast.day.avghumidity;
            const windSpeed = forecast.day.maxwind_kph;
            const windDir = forecast.day.maxwind_dir;

            container.innerHTML = `
              <p class="date">${dayName}<br>${dateObj.getDate()} ${monthName}</p>
              <h2>${city}</h2>
              <div class="temp">${temp.toFixed(1)}°C</div>
              <img class="icon" src="https:${icon}" alt="icon">
              <div class="condition">${condition}</div>
              <div class="info">
                <p>Humidity: ${humidity}%</p>
                <p>Wind: ${windSpeed} km/h</p>
                <p>Direction: ${windDir}</p>
              </div>
            `;
          }
        })
        .catch(err => {
          weatherContainer.innerHTML = '<div class="error">Error fetching weather data.</div>';
          console.error(err);
        });
    }

    fetchWeather();

    document.getElementById("findBtn").addEventListener("click", () => {
      const city = document.getElementById("cityInput").value.trim();
      if (city) fetchWeather(city);
    });