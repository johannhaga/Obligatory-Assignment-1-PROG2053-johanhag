//The list of the locations i am displaying the weather for
const cities = [
    { name: "Tokyo", latitude: 35.71733938838263, longitude: 139.59108715058449 },
    { name: "New York", latitude: 40.677064832308446, longitude: -73.98655898807242 }, 
    { name: "Oslo", latitude: 59.92920893246967, longitude: 10.77824222556848 }, 
    { name: "Reykjavik", latitude: 64.14020653459512, longitude: -21.933811598496508 },
    { name: "Cape Town", latitude: -33.93219188245019, longitude: 18.50769812316435 } 
];

//Function for getting/fetching the data for a location
function fetchWeather(city) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {             //checking if response is OK
                throw new Error(`Error getting weather for ${city.name}`);
            }                               
            return response.json();         //response transformed to json
        })
        .then(data => {                     //function to display the data
            displayWeather(city.name, data.current_weather);
        })
        .catch(error => {
            console.error(error);
        });
}

//function for displaying the weather-data for the HTML
function displayWeather(cityName, weatherData) {
    const weatherContainer = document.getElementById("weather-data");

    //creating a box for the locations
    const weatherBox = document.createElement("div");
    weatherBox.setAttribute("class", "weather-box");    //CSS

    const cityElement = document.createElement("h3");
    cityElement.textContent = `Weather in ${cityName}`;

    const tempElement = document.createElement("p");
    tempElement.textContent = `Temperature: ${weatherData.temperature}°C`;      //temp

    const windElement = document.createElement("p");
    windElement.textContent = `Wind: ${weatherData.windspeed} km/h`;            //wind, can also be tranformed to m/s
    //adding each element to the box
    weatherBox.appendChild(cityElement);
    weatherBox.appendChild(tempElement);
    weatherBox.appendChild(windElement);

    weatherContainer.appendChild(weatherBox);
}

//function for.each loop - every location
function fetchAllWeather() {
    cities.forEach(city => {
        fetchWeather(city);
    });
}


setInterval(fetchAllWeather, 600000); //updating every 10 minutes, 600000ms

//fetch for when it is launched
fetchAllWeather();
