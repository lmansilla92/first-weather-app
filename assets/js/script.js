const APIKey = "47918640400e32d5637e553627ff14e4";
const weatherToday = document.querySelector(".today");
const searchBtn = document.querySelector(".search");
const clearBtn = document.querySelector(".clear");
const todayContainer = document.querySelector(".today");
const weekContainer = document.querySelector(".week");
const weatherCardContainer = document.querySelector(".weather-card-container");
let cityNameInput = document.querySelector(".city-name");
let historyContainer = document.querySelector(".history");
let cities = [];
let emptyHistory = true;
let historyBtn;
let cityNameValue;
let storedCities;
let lat;
let lon;
let weeklyDate;
let index = 0;

// Declares a function that hides weather information sections
function hideContainers(){
    todayContainer.style.display = "none";
    weekContainer.style.display = "none";
};

// Declares initial function that hides containers, renders city history, and gets localstorage
function init(){
    hideContainers();
    getLocalStorage();
    renderCities();
};

// Declares a function that gets data from local storage
function getLocalStorage(){
    // Checks to make sure there is data in local storage
    if(localStorage.cities !== undefined){
        // If there is data in local storage, cities is assigned the data retrieved from local storage
        cities = JSON.parse(localStorage.getItem("cities"));
    };
};

// Declares a function that renders city search history
function renderCities(){
    // Assigns historyBtn the value of a querySelector that selects the button with a class of .histrory-btn
    let historyBtn = document.querySelector(".history-btn");
    console.log(cities);
    // Checks to make sure cities contains a value
    if (cities !== null){
        // Clears the history container's text content
        historyContainer.textContent = "";
        // If cities contains a value, then the emptyHistory boolean becomes false since the history is not empty
        emptyHistory = false;
        // Loops through the cities search history array
        for (var i = 0; i < cities.length; i++){
            // Creates a button for every city in the history array
            historyBtn = document.createElement("button");
            // Adds classes from bootstrap to button for styling and correct event listener to be called later
            historyBtn.classList.add("btn", "btn-secondary", "col-12", "my-2", "history-btn");
            // Labels each button according to the current city name
            historyBtn.textContent = cities[i];
            // Appends button to the history container in the DOM
            historyContainer.appendChild(historyBtn); 
            // Adds event listener to each button created within the loop
            historyBtn.addEventListener("click", function(event){
                weatherCardContainer.innerHTML = "";
                // Changes the current city name value to the value of the button that was clicked using event.target
                cityNameValue = event.target.textContent;
                // Logging out city name value to make sure it was changed according to the value of the button that was clicked
                console.log(cityNameValue);
                // Calls function that gets current weather
                getCurrentWeather();
            });
        };
    };
};

// Adds event listener to the button that clears search history
clearBtn.addEventListener ("click", function(event){
    // Clears local storage
    localStorage.clear();
});

// Adds event listener to the search button
searchBtn.addEventListener ("click", function(event) {
    // Prevents button from submitting so the code can run
    event.preventDefault();
    // Makes sure local storage cities is not undefined
    if(localStorage.cities !== undefined){
        // If local storage cities is not  undefined, cities is assigned the value of localStorage.cities
        cities = JSON.parse(localStorage.cities);
    };
    // Checks to make sure the input value isn't empty
    if (cityNameInput.value !== ""){
        // Removes any extra space from user input
        cityNameInput.value = cityNameInput.value.trim();
        // Assigns cityNameValue to the value from the user input
        cityNameValue = cityNameInput.value;
        // Declares variable with a value of a capitalized first letter of the city name search
        let upperCase = cityNameInput.value.charAt(0).toUpperCase();
        // Declares a variable with a value of the remaining characters in the city name ensuring they are lowercase
        let lowerCase = cityNameInput.value.slice(1).toLowerCase();
        // Concatinates both upperCase and lowerCase values
        cityNameValue = upperCase + lowerCase;
        console.log(cityNameValue);
        // Calls function that gets API request
        getCurrentWeather();
        // Clears the text content of the 5 day weather card container so only 5 weather cards are displayed
        weatherCardContainer.textContent = "";
        console.log("button clicked");
        // Displays sections with weather information
        if (todayContainer.style.display === "none") {
            todayContainer.style.display = "block";
        };
    };
});

// Calls a function that gets the current weather
function getCurrentWeather() {
        var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&units=imperial&appid=${APIKey}`;
        // fetch request to open weather map
        fetch(requestUrl)
            .then(function (response) {
                // Checks if fetch was successful
                if(response.ok){
                    // returns the response data as JSON
                    return response.json();
                // Else runs if fetch was unsuccessful
                }else{
                    // Exits function
                    return;
                };
            })
            .then(function(data) {
                // Checks if API returns any data
                if(data !== undefined){
                    // Checks if todayContainer is hidden
                    if (todayContainer.style.display === "none") {
                        // Changes todayContainer display to block
                        todayContainer.style.display = "block";
                    };
                    // Logs data returned by API
                    console.log(data)
                    // Checks if the city has already been searched to prevent it from storing it
                    if(!cities.includes(cityNameValue) && data !== undefined){
                        // Calls function that stores the city searches
                        storeCities();
                        // Calls function that renders city search history
                        renderCities();
                    };
                    // Gets current date
                    var date = new Date().toLocaleDateString();
                    // Grabs elements to display info from API
                    var cityName = document.querySelector(".city-h2");
                    // Sets city name and concatinates with the current date
                    cityName.textContent = `${data.name}(${date})`;
                    // Grabs data from API to display weather icon
                    var todayImgEl = document.querySelector(".today-img");
                    var imgCode = data.weather[0].icon;
                    console.log(imgCode);
                    imgUrl = `https://openweathermap.org/img/wn/${imgCode}@2x.png`;
                    todayImgEl.src = imgUrl;
                    // Grabs data from API to display Temp, Wind, Humidity
                    var tempEl = document.querySelector(".temp-today");
                    tempEl.textContent = "Temp: " + data.main.temp + " \u00B0F";
    
                    var windEl = document.querySelector(".wind-today");
                    windEl.textContent = "Wind: " + data.wind.speed + " MPH";
    
                    var humidityEl = document.querySelector(".humidity-today");
                    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
                    
                    // Gets coordinates longitude and latitude, to be used when fetching 5 day forecase
                    lat = data.coord.lat;
                    lon = data.coord.lon;
                    // Calls function that gets 5 day forecast
                    get5DayWeather();
                }else{
                    // Alerts user if they did not enter a valid city
                    alert("Please Enter A Valid City");
                    // Calls function that hides containers if fetch was unsuccessful
                    hideContainers();
                    // Exits function
                    return;
                };
            });
};
                
// Declares a function that stores cities in local storage
function storeCities() {
    // Adds most recent searched city to the 0 index in the cities array
    cities.unshift(cityNameValue);
    // Checks if localstorage is empty or not
    if(localStorage.cities !== undefined){
        // Checks if cities in localStorage does not include the current cityNameValue
        if (!localStorage.cities.includes(cityNameValue)){
            //Stores cities in local storage
            localStorage.setItem("cities", JSON.stringify(cities));
        };
    } else {
        // Adds city to local storage
        localStorage.setItem("cities", JSON.stringify(cities));
    };
};



// 5 Day Forecast Fetch
function get5DayWeather() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
    fetch(requestUrl)
        .then(function (response) {
            // Checks if fetch was successful
            if(response.ok){
                // returns response in JSON
                return response.json();
            }else{
                return;
            };
        })
        .then(function (data) {
            // Logs data from API to the console
            console.log(data)
            // Loops through the API data to grab 5 days
            for (var i = 0; i < 40; i = i + 8) {
                console.log("index is: " + i);
                // Reformats the date data
                weeklyDate = data.list[i].dt_txt;
                weeklyDate = weeklyDate.split(" ")[0];
                weeklyDate = weeklyDate.split("-");
                weeklyDate = weeklyDate[1] + "/" + weeklyDate[2] + "/" + weeklyDate[0];
            
                console.log(weeklyDate);
                // Grabs the image code for the icon to be displayed
                let imgCode = data.list[i].weather[0].icon;
    
                // variables for data from api
                var iconUrl = 'https://openweathermap.org/img/wn/' + imgCode + '@2x.png';
                console.log(iconUrl);
                var tempF = data.list[i].main.temp + " \u00B0F";
                console.log(tempF);
                var humidity = data.list[i].main.humidity + "%";
                console.log(humidity);
                var windMph = data.list[i].wind.speed + " MPH";
                console.log(windMph);
    
                    if (weekContainer.style.display === "none") {
                        weekContainer.style.display = "block";
                    } else {
                        null;
                    };
                // Displays API information to the DOM by creating elements and appending them to the weatherCardContainer
                // Adds card to the container
                let card = document.createElement("div");
                card.classList.add("card", "col", "px-0", "mx-1");
                weatherCardContainer.appendChild(card);

                let cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                card.appendChild(cardBody);
                
                // Date
                let cardDate = document.createElement("h5");
                cardDate.classList.add("card-title");
                cardDate.textContent = weeklyDate;
                cardBody.appendChild(cardDate);
    
                // Weather Icon
                let cardImg = document.createElement("img")
                cardImg.src = iconUrl;
                cardBody.appendChild(cardImg);
    
                // Temperature
                let cardTemp = document.createElement("p");
                cardTemp.classList.add("card-text");
                cardTemp.textContent = "Temp: " + tempF;
                cardBody.appendChild(cardTemp);
    
                // Wind
                let cardWind = document.createElement("p");
                cardWind.classList.add("card-text");
                cardWind.textContent = "Wind: " + windMph;
                cardBody.appendChild(cardWind);
    
                // Humidity
                let cardHumidity = document.createElement("p");
                cardHumidity.classList.add("card-text");
                cardHumidity.textContent = "Humidity: " + humidity;
                cardBody.appendChild(cardHumidity);

        };
    });
};

// Calls on function that runs initial functions on page load
init();