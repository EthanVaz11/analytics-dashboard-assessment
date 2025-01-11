// src/components/SummaryCards/SummaryCards.jsx
import React from 'react';
import './SummaryCards.css';

const SummaryCards = ({ data }) => {
  const totalVehicles = data.length;
  const avgRange =
    data.reduce((acc, item) => acc + (item['Electric Range'] || 0), 0) /
    totalVehicles;

  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Total Vehicles</h3>
        <p>{totalVehicles}</p>
      </div>
      <div className="card">
        <h3>Average Electric Range</h3>
        <p>{avgRange.toFixed(2)} miles</p>
      </div>
    </div>
  );
};

export default SummaryCards;
