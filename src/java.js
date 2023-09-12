const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput= document.querySelector('.time');
const conditionOutput= document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');



let cityInput = "Syria";

cities.forEach((city) => {
    city.addEventListener('click',  (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity ="0";

        });
    
})

form.addEventListener('submit', (e) => {
    if(search.value.length == 0) {
        alert('Please type in a city name');
        console.log("Please type in a city name");
    }else{
    cityInput = search.value;
    // console.log(search.value);
    fetchWeatherData();
    // search.value="";
    app.style.opacity = "0";
    
}

    e.preventDefault();
});


// function dayOfTheWeek(day,month,year){
//     const weekday=[
//         "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" , "Saturday"   
//     ];

//     return weekday[new Date( `${day}/${month}/${year}`).getDay() ];
// };



function fetchWeatherData(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=798ed0ccb06de827728c325a3aa475c6&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(cityInput);
        temp.innerHTML = Math.ceil(data.main.temp )+ "&#176;";
        conditionOutput.innerHTML = data.weather[0].main;
        // console.log(data.weather[0].main);


        var timeZoneu= data.timezone;

         var ll = new Date(new Date().toLocaleString('en-US', {timeZoneu}));
         var x =ll.toLocaleString('en-US', {timeZoneu}) ;
        dateOutput.innerHTML = x.substring(0, 9);
        console.log(x.substring(0,9))
        
        
        nameOutput.innerHTML = data.name;
        const iconId = data.weather[0].icon;
            // console.log(iconId)

            icon.src=`http://openweathermap.org/img/w/${iconId}.png`;
            cloudOutput.innerHTML=data.clouds.all+"%";
            humidityOutput.innerHTML= data.main.humidity +"%";
            windOutput.innerHTML= data.wind.deg + "km/h";


            console.log(ll.getHours());
            if(ll.getHours()>=4 && ll.getHours()<=18 ){
                app.style.backgroundImage=`url(./imges/day/${data.weather[0].main}.jpg)`;

                console.log(data.weather[0].main);
            }
            else{
                app.style.backgroundImage=`url(./imges/night/${data.weather[0].main}.jpg)`;
                console.log(data.weather[0].main);
            }


    app.style.opacity="1";






    
})

 .catch(
    //  error => console.log(error) );
    () => {
    alert('city not found, please try again');
   app.style.opacity="1";
}
);
}


fetchWeatherData();
app.style.opacity="1";










