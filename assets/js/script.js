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
    cityNameInput.click();
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
    cityNameValue = cityNameInput.value.trim();
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityNameValue + "&units=imperial&appid=" + APIKey;
    // fetch request to open weather map
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            // Gets current date
            var date = new Date().toLocaleDateString(); // TODO: need to find date 
            // Grabs elements to display info from API
            var cityName = document.querySelector(".city-h2");
            // Sets city name and concatinates with the current date
            cityName.textContent = data.name + ' (' + date + ')';

            var todayImgEl = document.querySelector(".today-img")
            var imgCode = data.weather[0].icon;
            console.log(imgCode);
            imgUrl = 'https://openweathermap.org/img/wn/' + imgCode + '@2x.png';
            todayImgEl.src = imgUrl;
            // var date = document.querySelector(".date-today");
    

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
                        console.log(data.list[0].dt_txt)

                        for (var i = 0; i < 40; i = i + 8) {
                            debugger;
                            console.log("index is: " + i);
                            let date = data.list[i].dt_txt;
                            console.log(date);
                            
                            let imgCode = data.list[i].weather[0].icon;
                            // variables for data from api
                            var iconUrl = 'https://openweathermap.org/img/w/' + imgCode + '.png';
                            console.log(iconUrl);
                            var tempF = data.list[i].main.temp;
                            console.log(tempF);
                            var humidity = data.list[i].main.humidity;
                            console.log(humidity);
                            var windMph = data.list[i].wind.speed;
                            console.log(windMph);

                            // let dateEl = document.querySelector(".card-title");
                            // dateEl.textContent = data.list[i].dt_txt;

                            let card = document.createElement("div").classList.add("card", "col", "px-0", "mx-1");
                            let cardBody = document.createElement("div").classList.add("card-body");
                            let cardDate = document.createElement("h5").classList.add("card-title");
                            cardDate.textContent = `Date: ${date}`;
                            let cardImg = document.createElement("img").src = "";
                            let cardTemp = document.createElement("p").classList.add("card-text");
                            let cardWind = document.createElement("p").classList.add("card-text");
                            let cardHumidity = document.createElement("p").classList.add("card-text");

                            if (weekContainer.style.display === "none") {
                                weekContainer.style.display = "block";
                            } else {
                                null;
                            }

                        }


                    });
            };
        });
};

// How to get icon URL
// For code 500 - light rain icon = "10d". See below a full list of codes
// URL is https://openweathermap.org/img/wn/10d@2x.png



            // renderForecastCard();

            // function renderForecastCard(forecast) {
            //     // variables for data from api
            //     var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
            //     var iconDescription = forecast.weather[0].description;
            //     var tempF = forecast.main.temp;
            //     var humidity = forecast.main.humidity;
            //     var windMph = forecast.wind.speed;
               
            //     // Create elements for a card
            //     var col = document.createElement('div');
               
            //    // Append the data to the card
            //     col.append(card);
            //     card.append(cardBody);
            //     cardBody.append(cardTitle, weatherrIcon, tempEl, windEl, humidityEl);
               
            //    // Set the attributes
            //     col.setAttribute('class', 'col-md');
               
            //     // Add content to elements

               
            //     forecastContainer.append(col);