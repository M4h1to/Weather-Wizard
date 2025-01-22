const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API Key

document.getElementById('searchBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            document.querySelector('.weather-result').style.display = 'block';
            document.getElementById('cityName').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('condition').innerText = `Condition: ${data.weather[0].description}`;
            document.getElementById('weatherIcon').src = `assets/${getWeatherIcon(data.weather[0].main)}.png`;
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        alert("Failed to fetch weather data. Please check your connection.");
    }
}

function getWeatherIcon(condition) {
    switch (condition.toLowerCase()) {
        case 'clear': return 'clear';
        case 'clouds': return 'cloudy';
        case 'rain': return 'rainy';
        case 'snow': return 'snowy';
        default: return 'sunny';
    }
}
