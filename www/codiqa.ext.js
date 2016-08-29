(function () {		// Immediately Invoked Function Expression; to prevent Namespace conflicts
    "use strict";	// JavaScript Strict Mode

    document.addEventListener("deviceready", onDeviceReady.bind(this), false );	// For Cordova to work properly, we need wait for the "deviceready" Event, and invoke the onDeviceReady function
    
    function onDeviceReady() {			// All our code, espcially Cordova-based code, must be in the onDeviceReady function, which confirms the API is available for use
		console.log("Cordova Ready");	// Some Dev feedback that Cordova API is ready
		
		navigator.splashscreen.hide();	// Hide the Splashscreen, or else it will display for 10 seconds (defined in config.xml)
        
        document.addEventListener("pause", onPause.bind(this), false );		// Handle Cordova Pause Event
        document.addEventListener("resume", onResume.bind(this), false );	// Handle Cordova Resume Event
		
		$("#btnName").on("click", function(){getName()});			// Setting up the Event Handler for clicking on the "btnName" button in the HTML file
		function getName() {										// Defining the getName() function to ask for a User's name
			localStorage.userName = prompt("What's your name?");	// The result of the JavaScript prompt() Method is stored in a localStorage object, named userName
			console.log(localStorage.userName);						// Output result to Console for the developer
			if((localStorage.userName === "") || (localStorage.userName === "null") || (localStorage.userName === undefined)) {	// Check that userName is not empty, OR null OR undefined
				alert("Please enter a valid name!");																			// If any of those conditions are True, fire a JavaScript alert() to let the User know of invalid input
			} else {																											// Or else, the input is good, so
				$(".welcomeMsg").html(", " + localStorage.userName.replace(/[^a-zA-Z]/g, "") + "!");							// Find all instances of the "welcomeMsg" class in the HTML file, use the html() method to write their name (but first strip out invalid characters with the replace() method) on-screen, plus concatenation with an exlamation point and comma
			}
		} // END getName()

		function loadName() {										// Defining the loadName() function to show a User's name, if there is one
			if((localStorage.userName === "") || (localStorage.userName === "null") || (localStorage.userName === undefined)) { // Check if the "userName" localStorage object is empty, OR null, OR undifined
				console.log(localStorage.userName);																				// If any of those conditions are True, do nothing except display, in the Console, the contents of "userName"
			} else {																											// Or else, there is a "userName" saved, so,
				$(".welcomeMsg").html(", " + localStorage.userName.replace(/[^a-zA-Z]/g, "") + "!");							// Display the "userName" on-screen, but first strip out invalid characters
			}	
		} // END loadName()
		
		$(".btnURL").on("click", function(){getURL($(this))});						// Event Handler for clicking on any button to load a URL. $(this) element should have a "data-url" Property and Value
		function getURL(theURL) { 													// Define the getURL() function; takes on Parameter (the Object that was clicked)
			cordova.InAppBrowser.open(theURL.data("url"), "_blank", "location=yes");// Cordova API to load the InAppBrowser; based on the "data-url" Property of the $(this) Object, opening in a "_blank" instance, with the Location Bar visibile
		} // END getURL()
		
		$("#btnCamera").on("click", function(){snapPicture()});				// Event Handler for clicking on the Camera button
		function snapPicture() {											// Define the snapPicture() function
			navigator.camera.getPicture(onSuccess, onFail, 					// Cordova API to load the Camera Framework. Result is an onSuccess, or onFail Callback function
				{ quality: 50,												// To the Camera API, pass it a "quality" paramater, and
				  destinationType: Camera.DestinationType.FILE_URI 			// Pass in a "destinationType" parameter (a URL [path]) of the image
				});
		} // END snapPicture()
		
		function onSuccess(imageURI) {						// Define onSuccess Camera callback function, with the 'imageURI' Object
			var image = document.getElementById("myImage");	// Reference to the myImage <img> object in the HTML file
			image.src = imageURI;							// Set the "src" property of the selected <img> tag; display the captured image on-screen
		}

		function onFail(message) {							// Define onFail Camera callback function, with the 'message' Object
			alert('Failed because: ' + message);			// No photo captured; alert() the reason
		}
		
		loadName();		// Invoke the loadName() function at app's startup so can show the User's name, if they've ever input it 
    }	// END onDeviceReady()

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    }
} )();

/*
	Author:		Victor Campos <vcampos@sdccd.edu>
	Project:	mySDCE
	Version:	1.0.20160707
	Date:		2016-07-07
	Description:The unoffical San Diego Continuing Education app.
*/