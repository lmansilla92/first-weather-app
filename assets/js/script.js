const APIKey = "47918640400e32d5637e553627ff14e4";
var weatherToday = document.querySelector(".today");
var searchBtn = document.querySelector(".search");
const todayContainer = document.querySelector(".today");
let weekContainer = document.querySelector(".week");
let cityNameInput = document.querySelector(".city-name");
let parent = document.querySelector(".parent");
let historyContainer = document.querySelector(".history");
let cities = [];
let emptyHistory = true;
let historyBtn;
let cityNameValue;

// Base URL
// http://api.openweathermap.org/data/2.5/weather

// Hides weather information sections
todayContainer.style.display = "none";
weekContainer.style.display = "none";

renderCities();

function init(){
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null){
        cities = storedCities;
    }
};

function renderCities(){
    let cities = JSON.parse(localStorage.getItem("cities"));
    let historyBtn = document.querySelector(".history-btn");
    console.log(cities);
    if (cities !== null && emptyHistory === true){
        historyContainer.textContent = "";
        emptyHistory = false;
        for (var i = 0; i < cities.length; i++){
            historyBtn = document.createElement("button");
            if (historyBtn.textContent !== `${cityNameValue}` || historyBtn.textContent !== cities[i]){
                historyBtn.classList.add("btn", "btn-secondary", "col-12", "my-2", "history-btn");
                historyBtn.textContent = cities[i];
                historyContainer.appendChild(historyBtn); 
                historyBtn.addEventListener("click", function(event){
                    parent.innerHTML = "";
                    cityNameValue = event.target.textContent;
                    console.log(historyBtn.textContent);
                    console.log(cityNameValue);
                    getApi();
                });
            };
        };
    };
};

function storeCities() {
    for (var i = 0; i < cities.length; i++){
        console.log(cityNameInput.value);
        console.log(cities[i]);
        if(cities.includes(cityNameInput.value)){
            null;
        }else{
            cities.push(cityNameValue);
            localStorage.setItem("cities", JSON.stringify(cities)); //PICK UP HERE
        };
    };
};

searchBtn.addEventListener ("click", function(event) {
    cityNameInput.click();
    // Prevents button from submitting so the code can run and call the getApi function
    event.preventDefault();

    renderCities();

    if (cityNameInput.value !== ""){
        cityNameValue = cityNameInput.value;
        // Calls function that gets API request
        getApi();

        storeCities();

        parent.textContent = "";

        console.log("button clicked");
        // Displays sections with weather information
        if (todayContainer.style.display === "none") {
            todayContainer.style.display = "block";
        };
    };


});

// Current Weather Fetch
function getApi() {
    if (cityNameInput.value !== "" && cityNameValue === ""){
        cityNameValue = cityNameInput.value.trim();
    } 
        if(!cities.includes(cityNameValue)){
            storeCities();
            // cityNameInput.value = "";
    
            console.log(cityNameValue);
    
            console.log(cityNameValue);

        };

        var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityNameValue + "&units=imperial&appid=" + APIKey;
        // fetch request to open weather map
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (todayContainer.style.display === "none") {
                    todayContainer.style.display = "block";
                };
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
                            var iconUrl = 'https://openweathermap.org/img/wn/' + imgCode + '@2x.png';
                            console.log(iconUrl);
                            var tempF = data.list[i].main.temp;
                            console.log(tempF);
                            var humidity = data.list[i].main.humidity;
                            console.log(humidity);
                            var windMph = data.list[i].wind.speed;
                            console.log(windMph);

                            // let dateEl = document.querySelector(".card-title");
                            // dateEl.textContent = data.list[i].dt_txt;



                            if (weekContainer.style.display === "none") {
                                weekContainer.style.display = "block";
                            } else {
                                null;
                            }

                                let card = document.createElement("div");
                                card.classList.add("card", "col", "px-0", "mx-1");
                                parent.appendChild(card);

                                let cardBody = document.createElement("div");
                                cardBody.classList.add("card-body");
                                card.appendChild(cardBody);

                                let cardDate = document.createElement("h5");
                                cardDate.classList.add("card-title");
                                cardDate.textContent = date;
                                cardBody.appendChild(cardDate);

                                let cardImg = document.createElement("img")
                                cardImg.src = iconUrl;
                                cardBody.appendChild(cardImg);

                                let cardTemp = document.createElement("p");
                                cardTemp.classList.add("card-text");
                                cardTemp.textContent = "Temp: " + tempF;
                                cardBody.appendChild(cardTemp);

                                let cardWind = document.createElement("p");
                                cardWind.classList.add("card-text");
                                cardWind.textContent = "Wind: " + windMph;
                                cardBody.appendChild(cardWind);

                                let cardHumidity = document.createElement("p");
                                cardHumidity.classList.add("card-text");
                                cardHumidity.textContent = "Humdity: " + humidity;
                                cardBody.appendChild(cardHumidity);

                        }


                    });
            
            };
        });
};

init();

// How to get icon URL
// For code 500 - light rain icon = "10d". See below a full list of codes
// URL is https://openweathermap.org/img/wn/10d@2x.png