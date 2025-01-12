import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

  const getColorByFrequency = (frequency) => {
    const maxFrequency = 10; // Adjust this based on your data's highest frequency
    const opacity = Math.min(1, frequency / maxFrequency); // Scale opacity between 0 and 1
    return `rgba(255, 0, 0, ${opacity})`; // Red color with varying opacity
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
            color: "#000000", // Border color
            fillColor: getColorByFrequency(frequency), // Adjusted by frequency
            weight: 1,
            fillOpacity: 0.7, // Adjust opacity for heatmap effect
          };
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.NAME) {
            // Bind a popup to each feature with its properties
            layer.bindPopup(
              `<b>County:</b> ${feature.properties.NAME}<br><b>Vehicles:</b> ${
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

  return <div id="map-canvas" style={{ width: "100%", height: "500px", marginTop: "20px" }} />;
};

export default HeatmapMap;
