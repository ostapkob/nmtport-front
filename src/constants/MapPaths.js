export let test="text";
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export let lines =  [
        { id: "7", 
             path: [ { lat: 42.817757, lng: 132.891146 }, { lat: 42.817139, lng: 132.893377 }]
        },
         { id: "9", 
             path: [ { lat: 42.814463, lng: 132.891906 }, { lat: 42.815187, lng: 132.889857 }]
        } ,
         { id: "10", 
             path: [ { lat: 42.812937, lng: 132.890043 }, { lat: 42.813219, lng: 132.889027 } ]
        } ,
         {id: "11"  , 
             path: [ { lat: 42.811768, lng: 132.889450 }, { lat: 42.812154, lng: 132.888277 } ]
        } ,
         {id: "12", 
             path: [ { lat: 42.810566, lng: 132.888813 }, { lat: 42.810933, lng: 132.887553 } ]
        } ,
         { id: "13", 
             path: [ { lat: 42.809348, lng: 132.888050 }, { lat: 42.809736, lng: 132.886782 } ]
        } ,
         {id: "14", 
             path: [ { lat: 42.808023, lng: 132.887264 }, { lat: 42.808419, lng: 132.886047 } ]
        } 
    ]

export let markers= [
        { position: { lat: 42.8142, lng: 132.8897 }, title: 'Screen5', icon: 'http://maps.google.com/mapfiles/kml/pal3/icon12.png', alarm: 0 },
        { position: { lat: 42.8150, lng: 132.8907 }, title: 'Screen6', icon: 'http://maps.google.com/mapfiles/kml/pal3/icon13.png', alarm: 0 },
        { position: { lat: 42.8160, lng: 132.8908 }, title: 'Screen7', icon: 'http://maps.google.com/mapfiles/kml/pal3/icon14.png', alarm: 1 }
      ]
export let mapSetting = [
    {
        "elementType": "labels",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    },
        {
        "featureType": "administrative.neighborhood",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    },
        {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    },
        {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
        {
        "color": "#28817b"
        }
        ]
        },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    },
        {
        "featureType": "transit",
        "stylers": [
        {
        "visibility": "off"
        }
        ]
    }
    ]
