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

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMake, setSelectedMake] = useState(null); // Track the selected make


  // Dropdown options for filters
  const [filterOptions, setFilterOptions] = useState({
    states: [],
    cities: [],
    makes: [],
    models: [],
  });

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

          console.log("Parsed CSV Data:", allData); // Log parsed data to inspect
          console.log("Test for [0]",allData[0]); // Logs the first object


          setData(allData);
          setFilteredData(allData);

          // Extract unique values for dropdowns
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

  // Filter data based on selected criteria
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
    setSelectedMake(criteria.make || null); // Update selected make
  };

  if (loading) return <LazyLoader />;

  return (
    <div className="dashboard">
      <h1>Electric Vehicles Dashboard</h1>
      <Filter options={filterOptions} onChange={handleFilterChange} />
      <SummaryCards data={filteredData} />
      <div className="charts-container">
      <CombinedChart data={filteredData} selectedMake={selectedMake} />
      </div>
      <DataTable data={filteredData} />
    </div>
  );
};

export default Dashboard;
