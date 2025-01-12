import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const HeatmapMap = ({ geoJsonData }) => {
  
  const mapRef = useRef(null);

  useEffect(() => {
    console.log("GeoJSON", geoJsonData); // Inspect this to ensure it's valid
  }, [geoJsonData]);
  
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

    // Clear previous GeoJSON layers before adding new ones
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        mapRef.current.removeLayer(layer);
      }
    });

    console.log("HEATMAPGEOOOJSONN", geoJsonData);

    // Add the GeoJSON data to the map
    if (geoJsonData) {
      const geoJsonLayer = L.geoJSON(geoJsonData, {
        style: () => ({
          color: "blue", // Set the line/polygon color
          weight: 2,
          opacity: 0.6,
        }),
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.NAME) {
            // Bind a popup to each feature with its properties
            layer.bindPopup(
              Object.entries(feature.properties)
                .map(([key, value]) => `<b>${key}</b>: ${value}`)
                .join("<br>")
            );

            // Add a bold label for county name
            layer.bindTooltip(feature.properties.NAME, {
              permanent: true,
              direction: 'center',
              className: 'county-label-bold', // Custom CSS class for styling
            });
          }
        },
      });

      geoJsonLayer.addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [geoJsonData]);

  return <div id="map-canvas" style={{ width: "100%", height: "500px", marginTop: "20px" }} />;
};

export default HeatmapMap;
