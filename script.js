//unit tracker
let currentUnit = "celsius";

//fetch data async function
async function fetchWeather(place) {
    try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/${formattedDate}T01:00:00?unitGroup=metric&key=ED6AJWCEPSXB49HY494NGEYMQ&contentType=json&include=current`, {
        mode: 'cors'});
        const weatherJson = await weatherData.json();

        const icon = weatherJson.currentConditions.icon;
        const temp = weatherJson.days[0].temp;
        const location = weatherJson.resolvedAddress;
        const humidity = weatherJson.currentConditions.humidity;
        const windspeed = weatherJson.currentConditions.windspeed;

        return {
            icon: icon,
            temp: temp,
            location: location,
            humidity: humidity,
            windspeed: windspeed
        }
    }
    catch(error) {
        console.log(error);
    }
}

//search and toggle unit listeners
document.querySelector("#search").addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = document.querySelector("#searchBar").value;
    const weatherPromise = fetchWeather(searchTerm);
    weatherPromise.then(response => {
        render(response);
    });

    //toggle unit function
    document.querySelector("#celsius").addEventListener("click", () => {
        currentUnit = "celsius";
        weatherPromise.then(response => {
            render(response);
        });
        document.querySelector("#celsius").classList.add("active");
        document.querySelector("#fahren").classList.remove("active");
        
    });

    document.querySelector("#fahren").addEventListener("click", () => {
        currentUnit = "fahren";
        weatherPromise.then(response => {
            render(response);
        });
        document.querySelector("#fahren").classList.add("active");
        document.querySelector("#celsius").classList.remove("active");
    });
})

//render function
function render(object) {

   const weatherIcon = document.querySelector("#weather-icon");
   const temp = document.querySelector("#temperature");
   const location = document.querySelector("#location");

    //clear old
    weatherIcon.innerHTML = "";
    temp.innerHTML = "";
    location.innerHTML = "";

   const icon = document.createElement("img");
   icon.src = `./icons/${object.icon}.svg`;
   icon.classList.add("icon");
   weatherIcon.append(icon);

   const tempSpan = document.createElement("span");
   if (currentUnit === "celsius") {
    tempSpan.textContent = `${object.temp}\u00B0c`;
   }
   else {
    const fahrenData = celsiusToFahrenheit(object.temp);
    tempSpan.textContent = `${fahrenData}\u00B0F`;
   }
   
   temp.append(tempSpan);

   const locationSpan = document.createElement("span");
   locationSpan.textContent = object.location;
   location.append(locationSpan);

   document.querySelector("#humidityData").textContent = `${object.humidity}%`;

   document.querySelector("#windData").textContent = `${object.windspeed}km/h`;

   changeBackground(object.icon);
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function changeBackground(icon) {
    const colors = {
        "snow": "#E0F7FA",
        "snow-showers-day": "#B3E5FC",
        "snow-showers-night": "#283593",
        "thunder-rain": "#424242",
        "thunder-showers-day": "#607D8B",
        "thunder-showers-night": "#1A237E",	
        "rain": "#64B5F6",
        "showers-day": "#90CAF9",
        "showers-night": "#303F9F",
        "fog": "#CFD8DC",
        "wind": "#ECEFF1",
        "cloudy": "#B0BEC5",	
        "partly-cloudy-day": "#81D4FA",
        "partly-cloudy-night": "#455A64",
        "clear-day": "#29B6F6",
        "clear-night": "#1C2833"
    }

    document.querySelector("body").style.backgroundColor = colors[`${icon}`];
}