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

//fetchweather is async so returns a promise

document.querySelector("#search").addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = document.querySelector("#searchBar").value;
    const weatherPromise = fetchWeather(searchTerm);
    weatherPromise.then(response => {
        render(response);
    });
})

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
   tempSpan.textContent = `${object.temp}\u00B0c`;
   temp.append(tempSpan);

   const locationSpan = document.createElement("span");
   locationSpan.textContent = object.location;
   location.append(locationSpan);

   document.querySelector("#humidityData").textContent = `${object.humidity}%`;

   document.querySelector("#windData").textContent = `${object.windspeed}km/h`;
}