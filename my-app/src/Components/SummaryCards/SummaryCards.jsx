import React from 'react';

const SummaryCards = ({ data }) => {
  const totalVehicles = data.length;
  const uniqueModels = new Set(data.map((item) => item.model)).size;
  const averageRange =
    data.reduce((sum, item) => sum + (item.electric_range || 0), 0) / totalVehicles || 0;

  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Total Vehicles</h3>
        <p>{totalVehicles}</p>
      </div>
      <div className="card">
        <h3>Unique Models</h3>
        <p>{uniqueModels}</p>
      </div>
      <div className="card">
        <h3>Average Electric Range</h3>
        <p>{averageRange.toFixed(2)} miles</p>
      </div>
    </div>
  );
};

export default SummaryCards;
