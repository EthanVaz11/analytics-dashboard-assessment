import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import DataTable from './DataTable/DataTable.jsx';
import SummaryCards from './SummaryCards/SummaryCards.jsx';
import PieChart from './Charts/PieChart.jsx';
import BarChart from './Charts/BarChart.jsx';
import Filter from './Filter/Filter.jsx';
import LazyLoader from './LazyLoader/LazyLoader.jsx';
import { processData } from '../utils/dataProcessor.js';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]); // Stores all fetched data
  const [filteredData, setFilteredData] = useState([]); // Stores the filtered data
  const [loading, setLoading] = useState(true); // To show the loader while data is being fetched

  // Fetch data on component mount
  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch('/Electric_Vehicle_Population_Data.csv'); // Replace with actual file path or API endpoint
      const csvText = await response.text();

      // Parse CSV using PapaParse
      Papa.parse(csvText, {
        header: true, // Assumes the first row is the header
        dynamicTyping: true, // Automatically converts numeric fields
        skipEmptyLines: true,
        complete: (result) => {
          setData(result.data); // Store the entire dataset
          setFilteredData(result.data); // Initially, filtered data is same as all data
          setLoading(false); // Data is loaded, set loading to false
        },
        error: (err) => console.error('Error parsing CSV:', err),
      });
    };

    fetchCSV();
  }, []);

  // Handle the filter changes from the Filter component
  const handleFilterChange = (criteria) => {
    const filtered = processData(data, criteria); // Filter data based on the input criteria
    setFilteredData(filtered); // Update filtered data state
  };

  // Display loader if data is still being fetched
  if (loading) return <LazyLoader />;

  return (
    <div className="dashboard">
      <h1>Electric Vehicles Dashboard</h1>
      <Filter onChange={handleFilterChange} /> {/* Pass filter change handler */}
      <SummaryCards data={filteredData} /> {/* Pass filtered data to SummaryCards */}
      <div className="charts-container">
        <PieChart data={filteredData} /> {/* Pass filtered data to PieChart */}
        <BarChart data={filteredData} /> {/* Pass filtered data to BarChart */}
      </div>
      <DataTable data={filteredData} /> {/* Pass filtered data to DataTable */}
    </div>
  );
};

export default Dashboard;
