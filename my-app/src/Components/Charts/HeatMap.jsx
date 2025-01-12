import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Simple hash function to generate a unique color for each make
const generateColor = (make) => {
  let hash = 0;
  for (let i = 0; i < make.length; i++) {
    hash = make.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Create a color from the hash value by turning the hash into a hex color code
  const color = `#${((hash >> 24) & 0xff).toString(16)}${((hash >> 16) & 0xff).toString(16)}${((hash >> 8) & 0xff).toString(16)}`;
  return color;
};

const HeatmapMap = ({ data }) => {
  const mapRef = useRef(null);
  const makeColorMap = useRef({}); // Store make-color mappings persistently

  useEffect(() => {
    if (!mapRef.current) {
      const baseLayer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      });

      mapRef.current = L.map("map-canvas", {
        center: [47.6062, -122.3321],
        zoom: 7,
        layers: [baseLayer],
      });
    }

    // Clear previous markers before re-adding
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        mapRef.current.removeLayer(layer);
      }
    });

    data.forEach((item) => {
      if (item.latitude && item.longitude) {
        // Generate a unique color for each make, only if it hasn't been generated before
        if (!makeColorMap.current[item.make]) {
          makeColorMap.current[item.make] = generateColor(item.make);
        }

        const color = makeColorMap.current[item.make];

        const markerOptions = {
          radius: 10,
          fillOpacity: 0.3,
          stroke: true,
          weight: 1,
          color: color,
        };

        L.circleMarker([item.latitude, item.longitude], markerOptions)
          .bindPopup(
            `<b>${item.make}</b><br>County: ${item.county}<br>Vehicles: ${item.count}`
          )
          .addTo(mapRef.current);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [data]);

  return <div id="map-canvas" style={{ width: "100%", height: "500px", marginTop: "20px" }} />;
};

export default HeatmapMap;
