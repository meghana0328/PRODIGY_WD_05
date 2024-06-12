const apiKey = '522f164dc6610037dfb398b9b7487c96'; 

function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching the weather data:', error));
    } else {
        alert('Please enter a location');
    }
}

function getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => console.error('Error fetching the weather data:', error));
        }, error => {
            console.error('Error getting the current location:', error);
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    if (data.cod === 200) {
        const iconClass = getWeatherIcon(data.weather[0].icon);
        weatherResult.innerHTML = `
            <div class="weather-icon"><i class="${iconClass}"></i></div>
            <h2>${data.name}</h2>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherResult.innerHTML = `<p>Error: ${data.message}</p>`;
    }
}

function getWeatherIcon(iconCode) {
    const iconMapping = {
        "01d": "wi wi-day-sunny",
        "01n": "wi wi-night-clear",
        "02d": "wi wi-day-cloudy",
        "02n": "wi wi-night-alt-cloudy",
        "03d": "wi wi-cloud",
        "03n": "wi wi-cloud",
        "04d": "wi wi-cloudy",
        "04n": "wi wi-cloudy",
        "09d": "wi wi-day-showers",
        "09n": "wi wi-night-alt-showers",
        "10d": "wi wi-day-rain",
        "10n": "wi wi-night-alt-rain",
        "11d": "wi wi-day-thunderstorm",
        "11n": "wi wi-night-alt-thunderstorm",
        "13d": "wi wi-day-snow",
        "13n": "wi wi-night-alt-snow",
        "50d": "wi wi-day-fog",
        "50n": "wi wi-night-fog"
    };
    return iconMapping[iconCode] || "wi wi-na";
}
