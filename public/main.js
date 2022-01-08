const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

// Fetch weather data from API
const fetchWeather = async city => {
  const url = `/api?q=${city}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === 401) {
    alert('Invalid API Key')
    return
  }

  const displayData = {
    city: data.name,
    temp: `${data.main.temp} &deg;K | ${kelvinToFahrenheit(
      data.main.temp
    )} &deg;F | ${kelvinToCelsius(data.main.temp)} &deg;C`
  }

  addWeatherToDOM(displayData)
}

// Add display data to DOM
const addWeatherToDOM = data => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp}</h2>
  `
  cityInput.value = ''
}

// Convert Kelvin to Fahrenheit
const kelvinToFahrenheit = temp => Math.ceil((temp - 273.15) * 1.8 + 32)

// Convert Kelvin to Celsius
const kelvinToCelsius = temp => Math.ceil(temp - 273.15)

// Event listener for form submission
weatherForm.addEventListener('submit', e => {
  e.preventDefault()

  if (cityInput.value === '') {
    alert('Please enter a city')
  } else {
    fetchWeather(cityInput.value)
  }
})

// Initial fetch
fetchWeather('Miami')
