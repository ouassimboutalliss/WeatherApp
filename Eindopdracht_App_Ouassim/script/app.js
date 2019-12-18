let lat
let long
var city






 
 // verwijder bij classe zelf ook !!!
 function icon_Weather(icon,id) {
    var element = document.getElementById(id);
   if (icon == "Sunny") {
   element.classList.add("wi-day-sunny");
  }
   else if (icon == "Clouds"){
    element.classList.add("wi-cloudy");
   }
   else if (icon == "Few-Clouds"){
    element.classList.add("wi-cloudy");
   }
   else if (icon == "Rain")
   {element.classList.add("wi-rain");}
   else if (icon == "Snow")
   {element.classList.add("wi-snow");}
   else if (icon == "Thunder")
   {element.classList.add("wi-thunderstorm");}
   else if (icon == "Clear")
   {element.classList.add("wi-forecast-io-clear-day");}
   else if (icon == "Mist")
   {element.classList.add("wi-fog");}
 
  
   
   
 };



function dag() {
    var d = new Date();
    console.log(d);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
  
    var n = weekday[d.getDay()];
    document.getElementById("day").innerHTML = n;
}



function description(des){
  console.log(des);
  document.getElementById("description").innerHTML = des;

}


const verwerkData = data => {
  //Loactie weergeven
  let locatie = "";
  console.log(data.name);
  city = data.name;
  country = data.sys.country;
  locatie += `
  ${city}, ${country}
          <i class="fa fa-map-marker"></i>
          <span class="today">Today</span>`;
 
  document.getElementById("location").innerHTML = locatie;
 

  // temperatuur nu
  let temperatuur = "";
  var temperatuurNu = Math.round(data.main.temp);
  temperatuur += `
  ${temperatuurNu}<sup>&deg;</sup>
  <span class="unit">c</span>
  `;

  document.getElementById("tempNu").innerHTML = temperatuur;

  //wind richting
    var wind_deg = data.wind.deg;
    var element = document.getElementById("wind_deg");
    element.classList.add(`towards-${wind_deg}-deg`);

  //wind speed
  var wind_speed = Math.round(data.wind.speed);
  var element = document.getElementById("wind_speed");
  element.classList.add(`wi-wind-beaufort-${wind_speed}`);

  //day
 // dag();

  //icon
  var id ="icon_weather";
  icon_Weather(data.weather[0].main,id);
  
  
  
  //description
  description(data.weather[0].description);

};


const verwerkDataForecast = data => {
    let converted_data = [];
    let converted_labels = [];
  for (var i = 0; i < 7; i++)
  {  
    var datumTijd = data.list[i].dt;
     var dt = new Date(datumTijd * 1000).getDay();
     
      if (dt == "1"){
        dt = "Mon.";
      }
      else if (dt == "2"){
        dt = "Tue.";
      }
      else if (dt == "3"){
        dt = "Wed.";
      }
      else if (dt == "4"){
        dt = "Thu.";
      }
      else if (dt == "5"){
        dt = "Fri.";
      }
      else if (dt == "6"){
        dt = "Sat.";
      }
      else if (dt == "0"){
        dt = "Sun.";
      }
    //  var tijd = dt.slice(8,9);
   
    converted_labels.push(dt);
    converted_data.push(Math.round(data.list[i].temp.day));  
    
     
  }
  console.log(converted_data);
  const myChart = document.querySelector("#myChart");

  var myLineChart = new Chart(myChart, {
    type: "line",
    data: {
      labels: converted_labels,
      datasets: [
        {
          
         
          data: converted_data,
          borderColor: "rgb(255,0,0)",
          fill: false,
          pointBackgroundColor: 'white'
        
       
        
        }
      ]
    },

    options: {
      legend: { display: false,
      }
     
   

    }
  });
 
  
  };
 

  




// vandaag
const LaadWeatherInfoVandaag = function() {
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    long = position.coords.longitude;
    
   console.log(lat);
   console.log(long);
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + "metric" +  "&APPID=1a5a1ec681e8fc70d6d9c21da587aa15"
  )
    .then(r => r.json())
    .then(data => verwerkData(data));
  });
};

//forcast
const LaadWeatherInfoForecast = function() {
  navigator.geolocation.getCurrentPosition(function(position){
    lat = position.coords.latitude;
    long = position.coords.longitude;
    
   
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + long + "&units=" + "metric" +  "&APPID=1a5a1ec681e8fc70d6d9c21da587aa15&cnt=8"
  )
    .then(r => r.json())
    .then(data => verwerkDataForecast(data));
  });
};


document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
   
   dag();

  LaadWeatherInfoVandaag();
  LaadWeatherInfoForecast();
    

});