import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import DataTable from './DataTable/DataTable.jsx';
import SummaryCards from './SummaryCards/SummaryCards.jsx';
import PieChart from './Charts/PieChart.jsx';
import BarChart from './Charts/BarChart.jsx';
import CombinedChart from './Charts/CombinedChart.jsx';
import Filter from './Filter/Filter.jsx';
import LazyLoader from './LazyLoader/LazyLoader.jsx';
import './Dashboard.css';
import HeatmapMap from './Charts/HeatMap.jsx';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMake, setSelectedMake] = useState(null); // Track the selected make
  const [geoJson, setGeoJson] = useState(null);


  const [filterOptions, setFilterOptions] = useState({
    states: [],
    cities: [],
    makes: [],
    models: [],
  });


  const fetchGeoJson = async () => {
    const response = await fetch('/data/washington-state-counties_.geojson');
    const data = await response.json();
    setGeoJson(data);
  };
  
  useEffect(() => {
    fetchGeoJson();
  }, []);
  

  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch('/Electric_Vehicle_Population_Data.csv'); // Replace with your actual file path
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().toLowerCase().replace(/[\s\W]+/g, '_'),
        complete: (result) => {
          const allData = result.data;
          
          const processedData = allData.map((item) => {
            const location = item.vehicle_location;
            if (location) {
              const coordinates = location.replace('POINT (', '').replace(')', '').split(' ');
              const longitude = parseFloat(coordinates[0]);
              const latitude = parseFloat(coordinates[1]);

              return { ...item, longitude, latitude };
            }
            return item;
          });

          setData(processedData);
          setFilteredData(processedData);

          const states = [...new Set(allData.map((item) => item.state))];
          const cities = [...new Set(allData.map((item) => item.city))];
          const makes = [...new Set(allData.map((item) => item.make))];
          const models = [...new Set(allData.map((item) => item.model))];

          setFilterOptions({ states, cities, makes, models });
          setLoading(false);
        },
        error: (err) => console.error('Error parsing CSV:', err),
      });
    };

    fetchCSV();
  }, []);

  const handleFilterChange = (criteria) => {
    const filtered = data.filter((item) => {
      return (
        (!criteria.state || item.state === criteria.state) &&
        (!criteria.city || item.city === criteria.city) &&
        (!criteria.make || item.make === criteria.make) &&
        (!criteria.model || item.model === criteria.model)
      );
    });

    setFilteredData(filtered);
    setSelectedMake(criteria.make || null);
  };

  if (loading) return <LazyLoader />;

  return (
    <div className="dashboard">
      <h1>Electric Vehicles Dashboard </h1>
      <Filter options={filterOptions} onChange={handleFilterChange} />
      <SummaryCards data={filteredData} />

      {/* Heatmap Section */}
      <div className="heatmap-container">
        <h3>County Heatmap</h3>
        <HeatmapMap filteredData={filteredData}  geoJsonData={geoJson} />
        {console.log("geoJson Heat Map", geoJson)}
      </div>

      <div className="charts-container">
        <CombinedChart data={filteredData} selectedMake={selectedMake} />
      </div>
      <DataTable data={filteredData} />
    </div>
  );
};

export default Dashboard;
