//change the creds and options if the api count of one account is ended. 

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

//variables
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
let day = days[d.getDay()];
let locationcontent=document.getElementById("city-wrapper");
let temperaturecontent=document.getElementById("temperature-wrapper");
let humiditycontent=document.getElementById("humidity-wrapper");
let windspeedcontent=document.getElementById("windspeed-wrapper");
let timedatecontent=document.getElementById("time-date-wrapper");
let descriptioncontent=document.getElementById("description-wrapper");
let currenttempwrap=document.getElementById("current-temp-wrapper");
let leftwrap=document.getElementById("left-wrapper");
let loaderwrap=document.getElementById("loader");
let image=document.getElementById("icon-wrapper");
let handle=document.getElementById("form")

handle.addEventListener("submit",retrieveData);

//fetch call hit point parameters preparing
function retrieveData(event)
{
   event.preventDefault();
   document.getElementById("slider-wrapper").innerHTML="";
   let city=document.getElementById("city-name").value;
   let url=`https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=c`
   console.log("city-name:",city,"url:",url)
   obtainedData(url,options);
   let k=document.querySelector(".weather-wrapper")
   k.style.backgroundColor="black";
   loaderwrap.innerText="LOADING!!!"
   locationcontent.innerText=""
   temperaturecontent.innerText=""
   humiditycontent.innerText=""
   windspeedcontent.innerText=""
   timedatecontent.innerText=""
   descriptioncontent.innerText=""
   image.src=""
   currenttempwrap.style.border=""
   leftwrap.style.borderRight=""
	/*var k= document.getElementsByTagName("div")//returns nodeList
	arr =[...k]//using spread/rest operator ... to make it as array
	arr.forEach(i=>{
	i.style.backgroundColor="black"
	})*/
}

//data display call with fetch()
var obtainedData= async(url,options)=>{
	try
	{
		let result= await fetch(url,options);
		let response= await result.json();
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
		locationcontent.innerText=response.location.city+","+response.location.region+","+response.location.country;
		temperaturecontent.innerText=response.current_observation.condition.temperature + "°C";
		humiditycontent.innerText="humidity:"+response.current_observation.atmosphere.humidity+"%";
		windspeedcontent.innerText="wind:"+response.current_observation.wind.speed+"km/hr";
		function addZero(i) {
			if (i < 10) {i = "0" + i}
			return i;
		}
		let h = addZero(d.getHours());
		let m = addZero(d.getMinutes());
		let s = addZero(d.getSeconds());
		let time = h + ":" + m + ":" + s;
		timedatecontent.innerText=day+","+time;
		descriptioncontent.innerText=response.current_observation.condition.text;
		loaderwrap.innerHTML=""
		image.src=getIcon(response.current_observation.condition.text);
				// switch (true) {
				// 	case response.current_observation.condition.text.includes("Thunderstorms"):
				// 		image.src="images/storm.png"
				// 		break;
				// 	case response.current_observation.condition.text.includes("Rain"):
				// 		image.src="images/rain.png"
				// 		break;
				// 	case response.current_observation.condition.text.includes("Showers"):
				// 		image.src="images/rain 2.png"
				// 		break;
				// 	case response.current_observation.condition.text.includes("Cloud"):
				// 		image.src="images/partly_cloudy.png"
				// 		break;
				// 	case response.current_observation.condition.text.includes("Snow"):
				// 		image.src="images/snow.png"
				// 		break;
				// 	case response.current_observation.condition.text.includes("Haze") || response.current_observation.condition.text.includes("Fog") :
				// 		image.src="images/fog.png"
				// 		break;
				// 	case response.current_observation.condition.text.includes("Clear"):
				// 		image.src="images/sunny.png"
				// 		break;
				// 	case response.current_observation.condition.text.includes("Sun"):
				// 		image.src="images/sun.png"
				// 		break;
				// 	default:
				// 		console.log('NA weather!!');
				// 		break;
		
					// if(response.current_observation.condition.text.includes("Thunderstorms"))
					// {
					// 	image.src="images/storm.png"
					// }
					// else if(response.current_observation.condition.text.includes("Rain"))
					// {
					// 	image.src="images/rain.png"
					// }
					// else if(response.current_observation.condition.text.includes("Showers"))
					// {
					// 	image.src="images/rain 2.png"
					// }
					// else if(response.current_observation.condition.text.includes("Cloud"))
					// {
					// 	image.src="images/partly_cloudy.png"
					// }
					// else if(response.current_observation.condition.text.includes("Snow"))
					// {
					// 	image.src="images/snow.png"
					// }
					// else if(response.current_observation.condition.text.includes("Fog")||response.current_observation.condition.text.includes("Haze"))
					// {
					// 	image.src="images/fog.png"
					// }
					// else if(response.current_observation.condition.text.includes("Clear"))
					// {
					// 	image.src="images/sunny.png"
					// }
					// else if(response.current_observation.condition.text.includes("Sun"))
					// {
					// 	image.src="images/sun.png"
					// }
					// else{
					// 	alert('NA weather!!');
					// }
		currenttempwrap.style.border="5px grey outset"
		leftwrap.style.borderRight="5px grey outset"

		// slider-wrapper & forecast-days content population
		document.getElementById("slider-wrapper").innerHTML="";
		//for(let i=0;i<response.forecasts.length;i++){
		response.forecasts.forEach((ele,i)=>{
			if(i<7)
			{
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
		})
		let image1=document.querySelectorAll(".forecast-icon-wrapper");
		let resobj=response.forecasts;
		console.log("resobj:",resobj)
		resobj.forEach((ele, i)=>{
			if(i<7)
			image1[i].src = getIcon(ele.text);
			// { MADE THESE LOGIC AS GETICON() 
			// 	switch (true) {
			// 		case ele.text.includes("Thunderstorms"):
			// 			image1[i].src="images/storm.png"
			// 			break;
			// 		case ele.text.includes("Rain"):
			// 			image1[i].src="images/rain.png"
			// 			break;
			// 		case ele.text.includes("Showers"):
			// 			image1[i].src="images/rain 2.png"
			// 			break;
			// 		case ele.text.includes("Cloud"):
			// 			image1[i].src="images/partly_cloudy.png"
			// 			break;
			// 		case ele.text.includes("Snow"):
			// 			image1[i].src="images/snow.png"
			// 			break;
			// 		case ele.text.includes("Fog") || ele.text.includes("Haze"):
			// 			image1[i].src="images/fog.png"
			// 			break;
			// 		case ele.text.includes("Clear"):
			// 			image1[i].src="images/sunny.png"
			// 			break;
			// 		case ele.text.includes("Sun"):
			// 			image1[i].src="images/sun.png"
			// 			break;
			// 		default:
			// 			console.log(ele.text+":index:"+i);
			// 			break;
			// 	}
				// if(ele.text.includes("Thunderstorms"))
				// {
				// 	image1[i].src="images/storm.png"
				// }
				// else if(ele.text.includes("Rain"))
				// {
				// 	image1[i].src="images/rain.png"
				// }
				// else if(ele.text.includes("Showers"))
				// {	
				// 	image1[i].src="images/rain 2.png"
				// }
				// else if(ele.text.includes("Cloud"))
				// {
				// 	image1[i].src="images/partly_cloudy.png"
				// }
				// else if(ele.text.includes("Snow"))
				// {
				// 	image1[i].src="images/snow.png"
				// }
				// else if(ele.text.includes("Fog")||ele.text.includes("Haze"))
				// {
				// 	image1[i].src="images/fog.png"
				// }
				// else if(ele.text.includes("Clear"))
				// {
				// 	image1[i].src="images/sunny.png"
				// }
				// else if(ele.text.includes("Sun"))
				// {	
				// 	image1[i].src="images/sun.png"
				// }
				// else{
				// 	console.log(ele.text +"in"+ i);
				// }
			}
		)
	}
	catch(err)
	{
		//temperaturecontent.innerText="INVALID INPUT!!"
		//alert("invalid entry for city field, please ensure the given input is a city");
		let timeout;
			function myFunction() 
			{
				timeout = setTimeout(alertFunc, 30000);
			}
			function alertFunc() {
				temperaturecontent.innerText="INVALID INPUT!!";
				loaderwrap.innerHTML="";
			}
			window.location.reload();
			console.log(err);	
	}
		
}



function getIcon(text) {
	switch (true) {
		case text.includes("Thunderstorms"): return "images/storm.png"
		case text.includes("Rain"): return "images/rain.png"
		case text.includes("Showers"): return "images/rain 2.png"
		case text.includes("Cloud"): return "images/partly_cloudy.png"
		case text.includes("Snow"): return "images/snow.png"
		case text.includes("Fog") || text.includes("Haze"): return "images/fog.png"
		case text.includes("Clear"): return "images/sunny.png"
		case text.includes("Sun"): return "images/sun.png"
		default: 
			console.log(ele.text+":index:"+i);
			return '';
	}
}