const temp = document.querySelector('#temp')
const town = document.querySelector('#city')
const windSpeed = document.querySelector('#windSpeed')
const weatherDescription = document.querySelector('#description')
const loader = document.querySelector('#loader')
const showContent = document.querySelector('#main')

async function loadWeather() {
	loader.style.display = 'block'

	const resGeo = await fetch('https://get.geojs.io/v1/ip/geo.json')
	const dataGeo = await resGeo.json()
	const lat = dataGeo.latitude
	const lon = dataGeo.longitude
	const city = dataGeo.city

	const res = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
	)
	const data = await res.json()


	setTimeout(() => {
		town.innerText = city
		const tempSymbol = data.current_weather_units.temperature
		temp.innerText = Math.round(data.current_weather.temperature) + tempSymbol

		const windSymbol = data.current_weather_units.windspeed
		windSpeed.innerText =
			'Wind speed: ' +
			Math.round(data.current_weather.windspeed) +
			' ' +
			windSymbol

		const weatherCode = data.current_weather.weathercode
		weatherDescription.innerText = getWeatherDescription(weatherCode)
		loader.style.display = 'none'
		showContent.style.display = 'block'
	}, 2000)
}


function getWeatherDescription(code) {
	const weatherDescriptions = {
		0: 'Clear sky',
		1: 'Mainly clear',
		2: 'Partly cloudy',
		3: 'Overcast',
		45: 'Fog',
		48: 'Depositing rime fog',
		51: 'Drizzle: Light',
		53: 'Drizzle: Moderate',
		55: 'Drizzle: Dense intensity',
		56: 'Freezing Drizzle: Light',
		57: 'Freezing Drizzle: Dense intensity',
		61: 'Rain: Slight',
		63: 'Rain: Moderate',
		65: 'Rain: Heavy intensity',
		66: 'Freezing Rain: Light',
		67: 'Freezing Rain: Heavy intensity',
		71: 'Snow fall: Slight',
		73: 'Snow fall: Moderate',
		75: 'Snow fall: Heavy intensity',
		77: 'Snow grains',
		80: 'Rain showers: Slight',
		81: 'Rain showers: Moderate',
		82: 'Rain showers: Violent',
		85: 'Snow showers: Slight',
		86: 'Snow showers: Heavy',
		95: 'Thunderstorm: Slight or moderate',
		96: 'Thunderstorm with slight',
		99: 'Thunderstorm with heavy hail',
	}

	return weatherDescriptions[code]
}

loadWeather()
