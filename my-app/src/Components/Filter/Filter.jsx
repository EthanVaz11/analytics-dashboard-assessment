import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ options, onChange }) => {
  const [electric_vehicle_type, setElectric_vehicle_type] = useState('');
  const [clean_alternative_fuel_vehicle_cafv_eligibility, setClean_alternative_fuel_vehicle_cafv_eligibility] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const handleFilter = () => {
    const criteria = { electric_vehicle_type, clean_alternative_fuel_vehicle_cafv_eligibility, make, model };
    onChange(criteria); // Send the selected filter criteria to parent
  };
  console.log(options, "Filter Options")

  return (
    <div className="filter">
      {/* Dropdown for Make */}
      <select value={make} onChange={(e) => setMake(e.target.value)}>
        <option value="">Select Make</option>
        {options.makes.map((make, index) => (
          <option key={index} value={make}>
            {make}
          </option>
        ))}
      </select>

      {/* Dropdown for Model */}
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="">Select Model</option>
        {options.models.map((model, index) => (
          <option key={index} value={model}>
            {model}
          </option>
        ))}
      </select>

            {/* Dropdown for electric_vehicle_type */}
        <select value={electric_vehicle_type} onChange={(e) => setElectric_vehicle_type(e.target.value)}>
        <option value="">Select Electric Vehicle Type</option>
        {options.electric_vehicle_types.map((electric_vehicle_type, index) => (
          <option key={index} value={electric_vehicle_type}>
            {electric_vehicle_type}
          </option>
        ))}
      </select>

            {/* Dropdown for clean_alternative_fuel_vehicle_cafv_eligibility */}
            <select value={clean_alternative_fuel_vehicle_cafv_eligibility} onChange={(e) => setClean_alternative_fuel_vehicle_cafv_eligibility(e.target.value)}>
        <option value="">Select Alternative Fuel Eligibility</option>
        {options.clean_alternative_fuel_vehicle_cafv_eligibilities.map((clean_alternative_fuel_vehicle_cafv_eligibility, index) => (
          <option key={index} value={clean_alternative_fuel_vehicle_cafv_eligibility}>
            {clean_alternative_fuel_vehicle_cafv_eligibility}
          </option>
        ))}
      </select>
      
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default Filter;
