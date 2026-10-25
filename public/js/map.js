const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates,
    zoom: 9
});

// Create a custom marker element
const markerElement = document.createElement("div");
markerElement.className = "wanderlust-marker";

markerElement.innerHTML = `
    <span class="marker-home">
        <i class="fa-solid fa-house"></i>
    </span>

    <span class="marker-logo">
        <i class="fa-regular fa-compass"></i>
    </span>
`;

const marker = new mapboxgl.Marker({
    element: markerElement,
    anchor: "bottom"
})
.setLngLat(listing.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 30 }).setHTML(
        `<h4>${listing.title}</h4>
         <p>Exact Location will be provided after booking</p>`
    )
)
.addTo(map);

