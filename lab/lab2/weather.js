$(document).ready(function(){
	var x = document.getElementById("weather");
	var y = document.getElementById("weather2");
	
	function getLocation()
	  {
	  if (navigator.geolocation)
	    {
	    navigator.geolocation.getCurrentPosition(showPosition);
	    }
	  else{x.innerHTML = "Geolocation is not supported by this browser.";}
	  }
	  
	  
	  
	  
	function showPosition(position)
	  {
	var xmlhttp;
	var latitude=position.coords.latitude;
	var longtitude=position.coords.longtitude;
	    if (window.XMLHttpRequest) {
	        // code for IE7+, Firefox, Chrome, Opera, Safari
	        xmlhttp = new XMLHttpRequest();
	    } else {
	        // code for IE6, IE5
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	           var json = xmlhttp.responseText;
	var data = JSON.parse( json );
	var temp = Math.round(data.main.temp - 273.15);
	var html  = '<h3>Weather for: ' + data.name + '</h3><img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" /><h3>' + data.weather[0].main + " " + temp + "&deg;</h3><!--" + json + "-->";
	var html2='<h3>Wind : ' + data.wind.speed + 'mps'+'</h3><h3>' + 'Humidity:' + " " + data.main.humidity + "</h3><!--" + json + "-->";
	x.innerHTML = html;
	y.innerHTML=html2;
	}
	    }
	    xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude, true);
	    xmlhttp.send();
	  }
	window.onload=getLocation();
	});