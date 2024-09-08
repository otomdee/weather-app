async function fetchWeather(place) {
    try {
        const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/2024-09-08T01:00:00?unitGroup=us&key=ED6AJWCEPSXB49HY494NGEYMQ&contentType=json&include=current`, {
        mode: 'cors'});
        const weatherJson = await weatherData.json();
        
        const icon = weatherJson.currentConditions.icon;
        const temp = weatherJson.days[0].temp;
        const location = weatherJson.resolvedAddress;

        return {
            icon: icon,
            temp: temp,
            location: location
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
   tempSpan.textContent = object.temp;
   temp.append(tempSpan);

   const locationSpan = document.createElement("span");
   locationSpan.textContent = object.location;
   location.append(locationSpan);
}