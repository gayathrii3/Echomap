import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat/dist/leaflet-heat.js";
 
function HeatLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !points.length) return;

    const heat = L.heatLayer(points, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}

function Heatmap() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/locations")
      .then((res) => res.json())
      .then((data) => {
        // Ensure numbers
        const points = data.map((loc) => [Number(loc.lat), Number(loc.lng), 1]);
        setLocations(points);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Heatmap */}
      <HeatLayer points={locations} />

      {/* Markers */}
      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc[0], loc[1]]}>
          <Popup>Location {idx + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Heatmap;
