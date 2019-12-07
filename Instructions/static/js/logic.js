// Creating map object
const mymap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
});

// Adding tile layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
});

(async function () {
    // Link to GeoJSON
    const APILink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    const data = await d3.json(APILink);

    // Create a new choropleth layer
    const geojson = L.colorMarker(data, {

        // Define what  property in the features to use
        valueProperty: "mag",

        // Set color scale
        scale: ["#ffffb2", "#b10026"],

        // Number of breaks in step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
            // Border color
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
        },

        // Binding a pop-up to each layer
        onEachFeature: function (feature, layer) {
            const popupMsg = feature.properties.mag
            layer.bindPopup(popupMsg);
        }
    }).addTo(mymap);

    // Set up the legend
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        const div = L.DomUtil.create("div", "info legend");
        const limits = geojson.options.limits;
        const colors = geojson.options.colors;

        // Add min & max
        const legendInfo = "<h1>Median Income</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;

        const labels = limits.map((limit, index) => {
            return "<li style=\"background-color: " + colors[index] + "\"></li>"
        })

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);
})()

