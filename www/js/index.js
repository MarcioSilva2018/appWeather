/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        tryingFile();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// start Geolocation function using GPS Mobile user
function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError)
    
}

function geoCallback (position){
    console.log(position);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    
    mySuperCode();
    weather(lat, lng);
    
    var loc = 'Latitude' + lat + '<br>' +
'Longitude' + lng + '<br>' +
'Altitude' +position.coords.altitude + '<br>';
    //+
//'Accuracy' +position.coords.accuracy + '<br>' +
//'Atitude Accuracy' +position.coords.altitudeAccuracy +
//'Heading' +position.coords.heading + '<br>' +
//'Speed' +position.coords.speed + '<br>' +
//'TimeStamp' +position.timestamp + '<br>' ;

document.getElementById('location').innerHTML = loc

} 

function mySuperCode(){
    var http = new XMLHttpRequest();
    
    // The API is requesting a hardcoded lat and long. You need to change this
    // so it is dynamic with the values obtained from the reading
    const opencage = 'https://api.opencagedata.com/geocode/v1/json?q=53.3461+-6.2586&key=22e5695431c543d682e4d4b52ec743ab';
    
    http.open("GET", opencage);
    http.send();
    
    http.onreadystatechange = (e)=>{
    var response = http.responseText;
    var responseJSON = JSON.parse(response);
    console.log(responseJSON);
    
    var country = responseJSON.results[0].components.country;
    console.log(country);
        document.getElementById('country').innerHTML = country;
    
     var city = responseJSON.results[0].components.city;
    console.log(city);
         document.getElementById('city').innerHTML = city;
    
     var currency = responseJSON.results[0].annotations.currency.iso_code;
    console.log(currency);
         document.getElementById('currency').innerHTML = currency;
        
        
        //'https://api.openweathermap.org/data/2.5/weather?q=city&key=7462d508cae94b74bb15b60d309f2ade
       // var weather = responseJSON.results[0].components.weather;
       // console.log(responseJSON);
        //document.getElementById('wheather').innerHTML = wheather;
   
}
}

function weather(lat,long){
    var http = new XMLHttpRequest();
    const weatherURL = 'https://samples.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=7462d508cae94b74bb15b60d309f2ade';
    http.open("GET", weatherURL);
    http.send();
    
    http.onreadystatechange = (e)=>{
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log(responseJSON);
        
        var temp = responseJSON.main.temp - 273.15;
        var wind = responseJSON.wind.speed;
       // var weatherDis = responseJSON.weather.0;
        
        document.getElementById('weather').innerHTML = 'The current temperature is ' + parseInt(temp)+ '  ºC';
        document.getElementById('wind').innerHTML = 'The wind speed is ' + wind + ' km/h';
       // document.getElementById('description').innerHTML = 'Mostly = ' + weatherDis;
    }
    
}

function onError(message){
    console.log(message)
}

function initMap() {     
    console.log("hello maps");
    var uluru = {lat: -25.363, lng: 131.444};           
    var map = new google.maps.Map(document.getElementById('map'), { 
        zoom: 4,        
        center: uluru      
    });

     var marker = new google.maps.Marker({
                  position: uluru,         
                  map: map     
                });     
           
            } 
// displayCurrencies() function getting the JSON through the API key and loading to the screen 
function displayCurrencies(){
    var from = document.getElementById('from');
    var to = document.getElementById('to');
    var http = new XMLHttpRequest();
    http.onreadystatechange=function() {
        if(http.readyState==4 && http.status==200){
            var obj = JSON.parse(this.responseText);
            var options='';
            for(key in obj.rates){
                options=options+ '<option>'+key+'</option>';
            }
            from.innerHTML=options;
            to.innerHTML=options;
        }
    }
    http.open('GET','http://data.fixer.io/api/latest?access_key=00c0ce7eb372d177a25e972bdb0b4e30', true)
    http.send();
}

//convertCurrency() function converting the currencies
// parsing the FROM and TO elements using the API key 
//saves the result in a variable called result
function convertCurrency(){
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    var amount = document.getElementById('amount').value;
    var xHttp = new XMLHttpRequest();
        xHttp.onreadystatechange=function(){
            if(xHttp.readyState==4 && xHttp.status==200){
                var obj = JSON.parse(this.responseText);
                var el= obj.rates[from];
                var el2= obj.rates[to];
                if(el && el2!= undefined){
                    result = parseFloat(amount)*parseFloat(el2)/parseFloat(el);
                }
            }
        }
        xHttp.open('GET', 'http://data.fixer.io/api/latest?access_key=00c0ce7eb372d177a25e972bdb0b4e30&base'+from+'&symbols'+to, true);
        xHttp.send();
}

// showResult() function printing the result of the convertion to the screen, which will be called on the Convert onClick Button. 
function showResult(){
    document.getElementById("show").innerHTML = '<b> Convertion Result: </b> '+ result;
}

// create a file for the user record they data such as geolocation, current converter etc
function tryingFile(){
    console.log("hello!!");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
    
}


//Get the file (file entry)
function fileSystemCallback(fs){
    
   
    //display the console
    console.log('file system open :' +fs.name);
    //display in front end
    //var toFrontEnd = 'file system open: ' + fs.name;
    //document.getElementById('file').innerHTML = toFrontEnd;
     // name of the file we want to create
    var fileToCreate = "MyFirstFile.txt";
    // opening / creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals,
                   getFileCallback, onError);
    
}
var fileSystemOptionals = { create: true, exclusive: false };

function getFileCallback(fileEntry){
    // Display in the console
    console.log("fileEntry is file?" + fileEntry.isFile.toString());

    // Displaying in front end
    //var toFrontEnd = document.getElementById('file').innerHTML;
    //toFrontEnd += "fileEntry is file?" + fileEntry.isFile.toString();
    //document.getElementById('file').innerHTML = toFrontEnd;
    
    var dataObj = new Blob(['Hello!'], { type: 'text/plain' });
    // Now decide what to do
    // Write to the file
    writeFile(fileEntry, dataObj);

    // Or read the file
    readFile(fileEntry);
}

// Let's write some files
function writeFile(fileEntry, dataObj) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['Hello'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

    });
}

// Let's read some files
function readFile(fileEntry) {

    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function() {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);

        };

    }, onError);
}

/*7462d508cae94b74bb15b60d309f2ade api wheather key */


/*function mySuperCode(){
    var http = new XMLHttpRequest();
    const opencage =  'https://api.opencagedata.com/geocode/v1/json?q=53.3461+-6.2586&key=22e5695431c543d682e4d4b52ec743ab’;
    
http.open("GET", opencage);
http.send();
http.onreadystatechange= (e) =>{
    var response = http.responseText;
    var responseJSON= JSON.parse(response);
    console.log(responseJSON);
    
    var country = responseJSON.result[0].components.country;
    console.log(country);
    
     var city = responseJSON.result[0].components.city;
    console.log(city);
    
     var currency = responseJSON.result[0].annotations.currency.iso_code;
    console.log(currency);
    document.getElementById('location').innerHTML = country;
}
}
*/
                               



