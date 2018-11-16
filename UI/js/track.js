function initMap() {
    // The location of kigali
    var kamonyi = {lat: -1.9800, lng: 29.8584};
    var muhanga = {lat: -2.080, lng: 29.753};
    var nyabugogo = {lat: -1.9367, lng: 30.0535};
    // The map, centered at Uluru
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: kamonyi});
   // The marker, positioned at Uluru
    var present_location = new google.maps.Marker({position: kamonyi, map: map,title:'Present Location',label:'P'});
    var from = new google.maps.Marker({position: muhanga, map: map,title:'Original location',icon:'../img/origin.png'});
    var destination = new google.maps.Marker({position: nyabugogo, map: map,title:'Destination',label:'D'});
    }