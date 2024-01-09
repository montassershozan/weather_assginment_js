const carDs = document.querySelector('.card-group');
const searchInp = document.querySelector('#weatherCites');
const subBtn = document.querySelector('.subBtn');
let dataarrY = [];
let dataarrY1 = [];
let dAtaobj = {};

async function LocationUser() {
    let response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=0da3e71d3dd8477fb7d65436ebee59de&ip_address=154.178.251.72`);

    let LocationUserData = await response.json();

    dAtaobj =LocationUserData.city;

    weatherN(dAtaobj);

}

 
window.addEventListener('load' ,LocationUser);

    async function weatherN(dAtaobj) {
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0c70cfc238234001a7290408240901&q=${dAtaobj}&days=3`);
    
        let weatherData = await response.json();
        console.log(weatherData);
        dataarrY1 = weatherData;
    
        let weatherForecast = weatherData.forecast.forecastday;
        dataarrY = weatherForecast;
    
        displayWeather();
        displayWeather1()
    
    }



    searchInp.addEventListener('keyup' , function(){
        let searchEval = searchInp.value;
        weatherN(searchEval);
    })


function displayWeather() {

    let DatEe = new Date(`${dataarrY[0].date}`);
    let dateee = DatEe.toLocaleDateString("en-Us",{weekday:"long"});

    let divs = "";

    divs = `
<div class = "col-md-5">
<div class="card bg-dark text-light shadow">
                <div class="d-flex justify-content-between">
                <small class ="ps-3 mt-3">${dateee}</small>
                    <small class ="pe-3 mt-3">${dataarrY[0].date}</small>
                    </div>
                        <h5 class="card-title ps-2 mt-5">${dataarrY1.location.region}</h5>
                        <p class="card-text fs-1 text-center">${dataarrY1.current.temp_c} ° C</p>
                        <div class="d-flex justify-content-center">
                         <img src="https:${dataarrY[0].day.condition.icon}" alt="sun" class="w-0" >
                        </div>
                        <p><small class ="ms-5">${dataarrY[0].day.condition.text}</small></p>
                    <div class="wind-dv d-flex justify-content-evenly"> 
                    <small class ="fs-5 mt-5"><i class="fa-solid fa-umbrella fa-lg"></i>  ${dataarrY[0].day.daily_chance_of_rain} %</small>
                    <small class ="fs-5 mt-5"><i class="fa-solid fa-wind fa-lg"></i>  ${dataarrY1.current.wind_kph} km/h</small>
                    <small class ="fs-5 mt-5"><i class="fa-regular fa-compass fa-lg"></i>  ${dataarrY1.current.wind_dir}</small>
                    </div>
                    
`

carDs.innerHTML = divs;

}

function displayWeather1() {

    let divs = "";
    
    let remfInd = dataarrY.splice(0, 1);

    for (let i = 0; i < dataarrY.length; i++) {

    let DatE = new Date(`${dataarrY[i].date}`);
    let dateee = DatE.toLocaleDateString("en-Us",{weekday:"long"});
    divs += `
<div class="card bg-dark text-light shadow text-center">
<div class="head-da">
<p><small class =" mt-5">${dateee}</small></p>
<img src="https:${dataarrY[i].day.condition.icon}" alt="sun"class="mt-5" >
    <p class="card-text fs-4 mt-5">${dataarrY[i].day.avgtemp_c}° C
    </p>
    <small class="mt-5">${dataarrY[i].day.daily_chance_of_rain} %</small>
    <p><small class="mt-5">${dataarrY[i].day.condition.text}</small></p>
</div>
</div>
`
    }

    carDs.innerHTML += divs;

}


subBtn.addEventListener('click' , function(e){
    e.preventDefault();
    let searchEval = searchInp.value;
    weatherN(searchEval);
})