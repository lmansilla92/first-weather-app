const APIKey = "47918640400e32d5637e553627ff14e4";
var weatherToday = document.querySelector(".today");
var searchBtn = document.querySelector(".search");
const todayContainer = document.querySelector(".today");
const weekContainer = document.querySelector(".week");
let cityNameInput = document.querySelector(".city-name");


// Base URL
// http://api.openweathermap.org/data/2.5/weather

// Hides weather information sections
todayContainer.style.display = "none";
weekContainer.style.display = "none";


searchBtn.addEventListener ("click", function(event) {
    // Prevents button from submitting so the code can run and call the getApi function
    event.preventDefault();
    // Calls function that gets API request
    getApi();
    console.log("button clicked");
    // Displays sections with weather information
    if (todayContainer.style.display === "none") {
        todayContainer.style.display = "block";
    } else {
        return;
    }
});

// Current Weather Fetch
function getApi() {
    cityNameValue = cityNameInput.value;
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityNameValue + "&units=imperial&appid=" + APIKey;
    // fetch request to open weather map
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            // Grabs elements to display info from API
            var cityName = document.querySelector(".city-h2");
            cityName.textContent = data.name;

            var date = document.querySelector(".date-today");
            date.textContent = data.name;

            var tempEl = document.querySelector(".temp-today");
            tempEl.textContent = "Temp: " + data.main.temp;

            var windEl = document.querySelector(".wind-today");
            windEl.textContent = "Wind: " + data.wind.speed;

            var humidityEl = document.querySelector(".humidity-today");
            humidityEl.textContent = "Humidity: " + data.main.humidity;

            fetchWeather();

            // 5 Day Forecast Fetch
            function fetchWeather() {
                let lat = data.coord.lat
                let lon = data.coord.lon
                var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey;

                fetch(requestUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data)
                    });
            };
        });
};