import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./HeatMap.css"

const HeatmapMap = ({ geoJsonData, filteredData }) => {
  const mapRef = useRef(null);

  // Utility function to group by county and count occurrences
  const groupByCounty = (data) => {
    return data.reduce((acc, item) => {
      const county = item.county; // Assuming 'county' is the property name
      if (county) {
        acc[county] = (acc[county] || 0) + 1; // Increment the count
      }
      return acc;
    }, {});
  };

  // Function to calculate color with dynamic opacity based on frequency
  const getColorByFrequency = (frequency) => {
    let color;
    let opacity = 0;

    // Set color based on frequency intervals
    if (frequency === 0) {
      // 0 Frequency -> White (fully transparent)
      color = `rgba(255, 255, 255, 0)`; // White with 0 opacity
    } else if (frequency <= 20) {
      // 1-20 Frequency -> Light Yellowish White
      opacity = Math.max(0.2 + frequency * 0.03, 0.2); // Minimum opacity of 0.2
      color = `rgba(255, 255, 150, ${opacity})`; // Very light yellow
    } else if (frequency <= 50) {
      // 21-50 Frequency -> Light Yellow
      opacity = Math.max(0.3 + frequency * 0.02, 0.3); // Minimum opacity of 0.3
      color = `rgba(255, 255, 0, ${opacity})`; // Light Yellow
    } else if (frequency <= 70) {
      // 51-70 Frequency -> Medium Yellow
      opacity = Math.max(0.5 + frequency * 0.015, 0.5); // Minimum opacity of 0.5
      color = `rgba(255, 220, 0, ${opacity})`; // Medium Yellow
    } else if (frequency <= 120) {
      // 71-120 Frequency -> Orange
      opacity = Math.max(0.7 + frequency * 0.01, 0.7); // Minimum opacity of 0.7
      color = `rgba(255, 165, 0, ${opacity})`; // Orange
    } else if (frequency <= 300) {
      // 121-300 Frequency -> Bright Orange
      opacity = Math.max(0.9 + frequency * 0.005, 0.9); // Minimum opacity of 0.9
      color = `rgba(255, 140, 0, ${opacity})`; // Bright Orange
    } else if (frequency <= 700) {
      // 301-700 Frequency -> Light Red
      opacity = Math.max(1 - frequency * 0.0025, 0.6); // Minimum opacity of 0.6
      color = `rgba(255, 80, 0, ${opacity})`; // Light Red
    } else if (frequency <= 1500) {
      // 701-1500 Frequency -> Red
      opacity = Math.max(1 - frequency * 0.0015, 0.7); // Minimum opacity of 0.7
      color = `rgba(255, 0, 0, ${opacity})`; // Intense Red
    } else {
      // 1501+ Frequency -> Fully Solid Red
      opacity = 1; // Fully opaque red
      color = `rgba(255, 0, 0, ${opacity})`; // Full intensity Red
    }

    return color;
  };

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

    // Process filtered data to calculate county frequencies
    const countyFrequency = groupByCounty(filteredData);

    // Add the GeoJSON data to the map
    if (geoJsonData) {
      const geoJsonLayer = L.geoJSON(geoJsonData, {
        style: (feature) => {
          const countyName = feature.properties.NAME; // Assuming 'NAME' contains the county name
          const frequency = countyFrequency[countyName] || 0; // Get frequency or default to 0
          return {
            color: "#000000", // Border color (black)
            fillColor: getColorByFrequency(frequency), // Adjusted by frequency
            weight: 1,
            fillOpacity: 0.8, // Opacity of the fill (controlled by frequency)
          };
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.NAME) {
            // Bind a popup to each feature with its properties
            layer.bindPopup(
              `<b>County:</b> ${feature.properties.NAME}<br><b>Frequency:</b> ${
                countyFrequency[feature.properties.NAME] || 0
              }`
            );

            // Add a bold label for county name
            layer.bindTooltip(feature.properties.NAME, {
              permanent: true,
              direction: "center",
              className: "county-label-bold", // Custom CSS class for styling
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
  }, [geoJsonData, filteredData]);

  return <div id="map-canvas" style={{ width: "60%", height: "600px", marginTop: "20px" }} />;
};

export default HeatmapMap;
