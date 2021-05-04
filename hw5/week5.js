window.addEventListener('DOMContentLoaded', async function() {
  
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)


  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {

    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location and number of days
    let locationInput = document.querySelector(`#location`)
    let daysInput = document.querySelector(`#days`)

    // - Get the user entered location and days input
    let location = locationInput.value
    let days = daysInput.value

    // - Check to see if the user entered anything for both buttons; if so:
    if (location.length > 0 && days < 4 & days > 0) {
       
      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=53a0155e46494151b76200952212604&q=${location}&days=3`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // - Store the returned location, current weather conditions, the forecast as three separate variables
      let interpretedLocation = `${json.location.name}, ${json.location.region}`
      let currentWeather = json.current.temp_f
      let currentCondition = json.current.condition.text

      // Get a reference to the "current" element
      let locationHeader = document.querySelector(`.current`)

      // Fill the current element with the location and current weather conditions
      locationHeader.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${interpretedLocation}</div>
          <div class="font-bold">
            <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="inline-block">
            <span class="temperature">${currentWeather}</span>° 
            and
            <span class="conditions">${currentCondition}</span>
          </div>
        </div>
        `
      // Get a reference to the element containing the forecast
      let forecastWeather = document.querySelector(`.forecast`)

      // Fill the forecast HTMl element with the # of days
      forecastWeather.innerHTML = `
      <div class="text-center space-y-8">
        <div class="font-bold text-3xl">${days} Day Forecast</div>
        </div>
        `

      // Build loop for the forecast array
      for (i = 0; i < json.forecast.forecastday.length; i++) {

      // Build counter for forecast days
      let day = json.forecast.forecastday[i]

      // Set variables for the forecast (date, high temp, low temp, condition)
      let dateForecast = json.forecast.forecastday[i].date
      let dateCondition = json.forecast.forecastday[i].day.condition.text
      let dateLowTemp = json.forecast.forecastday[i].day.mintemp_f
      let dateHighTemp = json.forecast.forecastday[i].day.maxtemp_f

      // Fill the forecast element with the lforecasted weather conditions
      forecastWeather.insertAdjacentHTML('beforeend', `
      <div>
        <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="mx-auto">
        <h1 class="text-2xl text-bold text-gray-500">${dateForecast}</h1>
        <h2 class="text-xl">${dateHighTemp}° – ${dateLowTemp}°</h2>
        <p class="text-gray-500">${dateCondition}</h1>
    </div>
      `)
      }
    }
  })
}
)