import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import DataTable from "./DataTable/DataTable.jsx";
import SummaryCards from "./SummaryCards/SummaryCards.jsx";
import PieChart from "./Charts/PieChart.jsx";
import BarChart from "./Charts/BarChart.jsx";
import CombinedChart from "./Charts/CombinedChart.jsx";
import Filter from "./Filter/Filter.jsx";
import LazyLoader from "./LazyLoader/LazyLoader.jsx";
import "./Dashboard.css";
import HeatmapMap from "./Charts/HeatMap.jsx";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMake, setSelectedMake] = useState(null); // Track the selected make
  const [geoJson, setGeoJson] = useState(null);

  const [filterOptions, setFilterOptions] = useState({
    electric_vehicle_types: [],
    clean_alternative_fuel_vehicle_cafv_eligibilities: [],
    makes: [],
    models: [],
  });

  const fetchGeoJson = async () => {
    const response = await fetch("/data/washington-state-counties_.geojson");
    const data = await response.json();
    setGeoJson(data);
  };

  useEffect(() => {
    fetchGeoJson();
  }, []);

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch("/Electric_Vehicle_Population_Data.csv"); // Replace with your actual file path
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) =>
          header
            .trim()
            .toLowerCase()
            .replace(/[\s\W]+/g, "_"),
        complete: (result) => {
          const allData = result.data;
          const processedData = allData.map((item) => {
            const location = item.vehicle_location;
            if (location) {
              const coordinates = location
                .replace("POINT (", "")
                .replace(")", "")
                .split(" ");
              const longitude = parseFloat(coordinates[0]);
              const latitude = parseFloat(coordinates[1]);

              return { ...item, longitude, latitude };
            }
            return item;
          });

          setData(processedData);
          setFilteredData(processedData);
          const electric_vehicle_types = [
            ...new Set(allData.map((item) => item.electric_vehicle_type)),
          ];
          const clean_alternative_fuel_vehicle_cafv_eligibilities = [
            ...new Set(
              allData.map(
                (item) => item.clean_alternative_fuel_vehicle_cafv_eligibility
              )
            ),
          ];
          const makes = [...new Set(allData.map((item) => item.make))];

          // Create make-model mapping
          const makeModelMap = {};
          allData.forEach((item) => {
            if (item.make && item.model) {
              if (!makeModelMap[item.make]) {
                makeModelMap[item.make] = new Set();
              }
              makeModelMap[item.make].add(item.model);
            }
          });

          // Flatten make-model map into an array of objects
          const models = Object.entries(makeModelMap).map(
            ([make, modelsSet]) => ({
              make,
              models: [...modelsSet],
            })
          );

          setFilterOptions({
            electric_vehicle_types,
            clean_alternative_fuel_vehicle_cafv_eligibilities,
            makes,
            models,
          });
          setLoading(false);
        },
        error: (err) => console.error("Error parsing CSV:", err),
      });
    };

    fetchCSV();
  }, []);

  const handleFilterChange = (criteria) => {
    const filtered = data.filter((item) => {
      return (
        (!criteria.electric_vehicle_type ||
          item.electric_vehicle_type === criteria.electric_vehicle_type) &&
        (!criteria.clean_alternative_fuel_vehicle_cafv_eligibility ||
          item.clean_alternative_fuel_vehicle_cafv_eligibility ===
            criteria.clean_alternative_fuel_vehicle_cafv_eligibility) &&
        (!criteria.make || item.make === criteria.make) &&
        (!criteria.model || item.model === criteria.model)
      );
    });

    setFilteredData(filtered);
    setSelectedMake(criteria.make || null);
  };

  // Calculate total vehicles and total models
  const totalVehicles = data.length; // Get total from raw data
  const totalModels = [...new Set(data.map((item) => item.model))].length;

  // if (loading) return <LazyLoader />;

  return (
    <div className="dashboard">
      <div className="dashboard-tile">
        <div className="heatmap-container">
          <h3>County Heatmap</h3>
          <HeatmapMap filteredData={filteredData} geoJsonData={geoJson} />
        </div>
      </div>
      <h1>Electric Vehicles Dashboard</h1>
      <Filter options={filterOptions} onChange={handleFilterChange} />
      <div className="dashboard-tile">
        <SummaryCards
          data={filteredData}
          totalVehiclez={totalVehicles}
          totalModelz={totalModels}
        />
      </div>

      <div className="dashboard-tile">
        <CombinedChart data={filteredData} selectedMake={selectedMake} />
        {/* <SimpleBarChart /> */}
      </div>

      <DataTable data={filteredData} />
    </div>
  );
};

export default Dashboard;
