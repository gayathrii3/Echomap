import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const MapView = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations from backend
    fetch("http://127.0.0.1:5000/locations")
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const mapEl = document.querySelector(".leaflet-container");
    if (!mapEl) return;
    const map = mapEl._leaflet_map;
    if (!map || locations.length === 0) return;

    const heatPoints = locations.map(loc => [loc.lat, loc.lng, 0.6]);
    L.heatLayer(heatPoints, { radius: 25 }).addTo(map);
  }, [locations]);

  return (
    <MapContainer center={[28.6139, 77.209]} zoom={12} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;

