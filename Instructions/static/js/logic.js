// Creating map object
const mymap = L.map("map", {
    center: [19.4438324, -155.2231598],
    zoom: 3
});

// Adding tile layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(mymap);

    // Function that will determine the color 
    function chooseColor(mag) {
        if (mag> 5.0) {
            return "red"
        }

        if (mag > 4.0) {
            return "orange"
        }

        if (mag> 3.0) {
            return "yellow"
        }

        if (mag > 2.0) {
            return "blue"
        }
        return "green"
    }
    function markerSize(magnitude) {
        return magnitude *4;
    }
function MarkerOptions(feature) {
    return {
        radius: markerSize(feature.properties.mag),
        fillColor: chooseColor(feature.properties.mag),
        color: "white",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }
};

//const markers = L.circleMarkers(+features.properties.mag, {
    //fillOpacity: 0.75,
    //color: "white",
    //fillColor: chooseColor(+features.properties.mag),
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    //radius: markerSize(features.properties.mag)
//})

    (async function () {
    // Link to GeoJSON
        const APILink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
        const data = await d3.json(APILink);
        console.log(data)
        L.geoJSON(data.features, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
            style: MarkerOptions, 
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<h1>Magnitude" + feature.properties.mag + "</h1> <hr> <h3>Coordinates: " + feature.properties.place + "</h3>")
            }
        }).addTo(mymap);
    })()



 //}).bindPopup("<h1>Magnitude" + properties.mag + "</h1> <hr> <h3>Coordinates: " + geometry.coordinates + "</h3>")

    // (async function () {
    //     const response = await d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson");
    //     const markers = L.markerClusterGroup();
    //     response.forEach(data => {
    //         const location = data.location;
    //         if (location) {
    //             const coord = [location.coordinates[1], location.coordinates[0]]
    //             const descriptor = data.descriptor
    //             markers.addLayer(L.cirlcemarker(coordinates).bindPopup(descriptor))
    //         }
    //     })
    //     // Add our marker cluster layer to the map
    //     myMap.addLayer(markers);
    // })()