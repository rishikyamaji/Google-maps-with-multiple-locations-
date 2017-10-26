
/* to write our string into the infowindow */
var contentString = '<div id="content">' +

    '<div id="siteNotice">' +
    '</div>' +

    '<div id="bodyContent">' +


    '<img src="/images/thumbnail.jpg"  class="img-responsive"  width="50" height="50">' +
    '<h1 class="doctor">Dr. Fayaz Hussain</h1>' +
    '<p>BDS MDS - Conservative Dentistry  </p>' +
    '</div>' +
    '</div>';
window.onload = function () {

    var geocoder;/*  this is code to load the current location into the textfield*/ // start
    geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } 
   
    function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        codeLatLng(lat, lng)
    }
    function errorFunction() {
        alert("Geocoder failed");
    }
   

    function codeLatLng(lat, lng) {

        var latlng = new google.maps.LatLng(lat, lng);
        var myLatlng = new google.maps.LatLng(lat, lng);
      
        var markermain = new google.maps.Marker({
            position: myLatlng,
            
            icon: icons['parking'].icon,
            map: map,
            draggable: true,
            title: "rishi this is your location" 
        });
        google.maps.event.addListener(markermain, 'dragend', function (e) {
            geocoder = new google.maps.Geocoder(); /* this code for the destination adress when we click on the destination */

            var lat = this.position.lat();
            var lng = this.position.lng();
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {


                if (results[0]) {
                    //formatted address
                    //alert(results[0].formatted_address)
                    
                    document.getElementById("myText").value = results[0].formatted_address;
                }
            });



        });
        
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {


            if (results[1]) {
                //formatted address
                //alert(results[0].formatted_address)
                document.getElementById("myText").value = results[0].formatted_address;
            }

        });
    }//end


    var mapOptions = {
        center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var icons = {
        parking: {
            icon: '/images/marker6.png'

        }/*,*/
        //library: {
        //    icon: 'images/marker6.png'
        //},
        //info: {
        //    icon: 'images/marker6.png'
        //}
    };


    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
    for (i = 0; i < markers.length; i++) {
        var data = markers[i];
     
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            icon: icons['parking'].icon,

            map: map,
            title: data.title
        });
        if (i == 1) {
            data.description += contentString;
        }
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
               
                infowindow.setContent(data.description);
                infowindow.open(map, marker);
            });
            google.maps.event.addListener(marker, "click", function (e) {
                geocoder = new google.maps.Geocoder(); /* this code for the destination adress when we click on the destination */
                

                var latlng = new google.maps.LatLng(data.lat, data.lng);
                    geocoder.geocode({ 'latLng': latlng }, function (results, status) {


                        if (results[0]) {
                            //formatted address
                            //alert(results[0].formatted_address)
                            
                            document.getElementById("myText1").value = results[0].formatted_address;
                        }
                    });
              

                
            });
        })(marker, data);

        //marker.addListener('mouseover', function () {
        //    infowindow.open(map, marker);
        //});
        //marker.addListener('mouseout', function () {
        //    infowindow.close(map, marker);
        //});



       
        $('input[type=text]').on('click', function (e) {
            var directionsDisplay;
            var directionsService = new google.maps.DirectionsService();
            var map;
            directionsDisplay = new google.maps.DirectionsRenderer({
                polylineOptions: {
                    strokeColor: "blue"
                }
            });
            var start = document.getElementById('myText').value;
            var end = document.getElementById('myText1').value;
            //alert(start);
            var request = {
                origin: start,
                
                destination: end,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
                
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }

                var mapOptions = {
                zoom:15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: { lat: 17.3850, lng:  78.4867 }
            }
                map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
            directionsDisplay.setMap(map);
                
            });
        });

    }
}