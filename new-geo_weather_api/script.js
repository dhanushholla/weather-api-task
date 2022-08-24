/*
return object format:
    json
        location --> location.city , region,country,timezone_id etc...
        current_observation-> current_observation.wind.speed,current_observation.atmosphere.humidity,
                              current_observation.condition.temperature
        forecasts[i].date,day,low,high,text
logic:
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '15b9b6512fmsh365ea98e44638c2p169231jsn532f913f8ea3',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};

fetch('https://yahoo-weather5.p.rapidapi.com/weather?location=chennai&format=json&u=c', options)
	.then(response => response.json())
	.then(response => { console.log("location:",response.location.city);console.log("windspeed:",response.current_observation.wind.speed);console.log("humidity:",response.current_observation.atmosphere.humidity);console.log("temperature:",response.current_observation.condition.temperature); console.log("description:",response.current_observation.condition.text);
	    response.forecasts.forEach(res=>{
	        console.log("day:",res.day)
	        console.log("min temp:",res.low)
	        console.log("max temp:",res.high)
	        console.log("description:",res.text)
	    })
	}
	)
	.catch(err => console.error(err));
*/

/* cred for dhanushholla.mdh account
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '15b9b6512fmsh365ea98e44638c2p169231jsn532f913f8ea3',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};
*/

//cred for m.dhanushholla account

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8c7597d4dcmsha7e8b7933474a5dp18084fjsn575a2c6ae84b',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};


var handle=document.getElementById("form")
handle.addEventListener("submit",retrieveData)

function retrieveData(event)
{
   event.preventDefault();
	document.getElementById("slider-wrapper").innerHTML="";
   var city=document.getElementById("city-name").value;
   var url=`https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=c`
   console.log("city-name:",city,"url:",url)
   obtainedData(url,options);
//    var k= document.getElementsByTagName("div")//returns nodeList
//    arr =[...k]//using spread/rest operator ... to make it as array
//    arr.forEach(i=>{
// 	i.style.backgroundColor="black"
//    })
	let k=document.querySelector(".weather-wrapper")
	k.style.backgroundColor="black";
}

var obtainedData= async(url,options)=>{
	var result= await fetch(url,options);
	var response= await result.json();
	if(response)
	{
	console.log("location:",response.location.city);
	console.log("windspeed:",response.current_observation.wind.speed);
	console.log("humidity:",response.current_observation.atmosphere.humidity);
	console.log("temperature:",response.current_observation.condition.temperature); 
	console.log("description:",response.current_observation.condition.text);
	console.log("forecasts-10 days:")
	response.forecasts.forEach(res=>{
		         console.log("day:",res.day)
		         console.log("min temp:",res.low)
		         console.log("max temp:",res.high)
		         console.log("description:",res.text)
	})
	}
	
	let locationcontent=document.getElementById("city-wrapper");
	locationcontent.innerText=response.location.city+","+response.location.region+","+response.location.country;
	let temperaturecontent=document.getElementById("temperature-wrapper");
	temperaturecontent.innerText=response.current_observation.condition.temperature + "°C";
	let humiditycontent=document.getElementById("humidity-wrapper");
	humiditycontent.innerText="humidity:"+response.current_observation.atmosphere.humidity+"%";
	let windspeedcontent=document.getElementById("windspeed-wrapper");
	windspeedcontent.innerText="wind:"+response.current_observation.wind.speed+"km/hr";
	let timedatecontent=document.getElementById("time-date-wrapper");
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = days[d.getDay()];
    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      }
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      let s = addZero(d.getSeconds());
      let time = h + ":" + m + ":" + s;
	timedatecontent.innerText=day+","+time;
	let descriptioncontent=document.getElementById("description-wrapper");
	descriptioncontent.innerText=response.current_observation.condition.text;
	if(response.current_observation.condition.text.includes("Thunderstorms"))
	{
		var image=document.getElementById("icon-wrapper");
		image.src="images/storm.png"
	}
	else if(response.current_observation.condition.text.includes("Rain"))
	{
		var image=document.getElementById("icon-wrapper");
		image.src="images/rain.png"
	}
	else if(response.current_observation.condition.text.includes("Showers"))
	{
		var image=document.getElementById("icon-wrapper");
		image.src="images/rain 2.png"
	}
	else if(response.current_observation.condition.text.includes("Cloud"))
	{
		var image=document.getElementById("icon-wrapper");
		image.src="images/partly_cloudy.png"
	}
	else if(response.current_observation.condition.text.includes("Snow"))
	{
		var image=document.getElementById("icon-wrapper");
		image.src="images/snow.png"
	}
	else if(response.current_observation.condition.text.includes("Fog")||response.current_observation.condition.text.includes("Haze"))
	{
		var image=document.getElementById("icon-wrapper");
		image.src="images/fog.png"
	}
	else if(response.current_observation.condition.text.includes("Clear"))
	{
		var image=document.getElementById("icon-wrapper");
		image.src="images/sunny.png"
	}
	else if(response.current_observation.condition.text.includes("Sun"))
	{
		var image=document.getElementById("icon-wrapper");
		image.src="images/sun.png"
	}
	else{
		alert('NA weather!!');
	}

	for(let i=0;i<7;i++){
				
		document.getElementById("slider-wrapper").innerHTML+=`
		<div class="forecast-days" id="forecast-days">
			<div class="forecast-day-wrapper">${response.forecasts[i].day}</div>
			<img class="forecast-icon-wrapper" id="forecast-icon-wrapper" alt="icon">
			<div class="min-max-wrapper" id="min-max-wrapper">
				<div class="mintemp-wrapper" id="mintemp-wrapper">${" "+response.forecasts[i].low+"°C"}</div>
				<div class="maxtemp-wrapper" id="maxtemp-wrapper">${response.forecasts[i].high+"°C" + " | "}</div>
			</div>
		</div>`
	}
	var image=document.querySelectorAll(".forecast-icon-wrapper");
	for (let i= 0; i<7; i++) {
			console.log(response.forecasts[i].text);
			if(response.forecasts[i].text.includes("Thunderstorms"))
			{
				image[i].src="images/storm.png"
			}
			else if(response.forecasts[i].text.includes("Rain"))
			{
				
				image[i].src="images/rain.png"
			}
			else if(response.forecasts[i].text.includes("Showers"))
			{
				
				image[i].src="images/rain 2.png"
			}
			else if(response.forecasts[i].text.includes("Cloud"))
			{
				
				image[i].src="images/partly_cloudy.png"
			}
			else if(response.forecasts[i].text.includes("Snow"))
			{
				
				image[i].src="images/snow.png"
			}
			else if(response.forecasts[i].text.includes("Fog")||response.forecasts[i].text.includes("Haze"))
			{
				image[i].src="images/fog.png"
			}
			else if(response.forecasts[i].text.includes("Clear"))
			{
			
				image[i].src="images/sunny.png"
			}
			else if(response.forecasts[i].text.includes("Sun"))
			{
				
				image[i].src="images/sun.png"
			}
			else{
				console.log(response.forecasts[i].text +"in"+ i);
			}
		
	}
}



