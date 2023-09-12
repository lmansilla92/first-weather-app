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

function getApi() {
    cityNameValue = cityNameInput.value;
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityNameValue + "&appid=" + APIKey;
    // fetch request to open weather map
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)


          // Grabs elements to display info from API
          debugger;
          var cityName = document.querySelector(".city-h2");
          cityName.textContent = data.name;

          var tempEl = document.querySelector(".temp-today");
          tempEl.textContent = "Temp: " + data.main.temp;

          var windEl = document.querySelector(".wind-today");
          windEl.textContent = "Wind: " + data.wind.speed;

          var humidityEl = document.querySelector(".humidity-today");
          humidityEl.textContent = "Humidity: " + data.main.humidity;
        }
      );
  };

//   var cardBody = document.createElement('div');
//   cardBody.classList.add("border p-2");
//   var cityName = document.createElement('h2');
//   cityName.classList.add("cityName");
//   var tempEl = document.createElement('p');
//   var windEl = document.createElement('p');
//   var humidityEl = document.createElement('p');

  
          // Appending the link to the tabledata and then appending the tabledata to the tablerow
          // The tablerow then gets appended to the tablebody
        //   weatherToday.appendChild(cardBody);
        //   cardBody.appendChild(cityName);
        //   cityName.appendChild(tempEl);
        //   tempEl.appendChild(windEl);
        //   windEl.appendChild(humdityEl);

                //Loop over the data to generate a table, each table row will have a link to the repo url
        // for (var i = 0; i < data.length; i++) {
          // Creating elements, tablerow, tabledata, and anchor