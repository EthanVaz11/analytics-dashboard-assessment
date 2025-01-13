import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ options, onChange }) => {
  const [electric_vehicle_type, setElectric_vehicle_type] = useState('');
  const [clean_alternative_fuel_vehicle_cafv_eligibility, setClean_alternative_fuel_vehicle_cafv_eligibility] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);

  // Update model options when make changes
  const handleMakeChange = (selectedMake) => {
    setMake(selectedMake);
    setModel(''); // Reset model when make changes

    // Find the models for the selected make
    const selectedMakeObject = options.models.find((item) => item.make === selectedMake);
    setFilteredModels(selectedMakeObject ? selectedMakeObject.models : []);
  };

  const handleFilter = () => {
    const criteria = { electric_vehicle_type, clean_alternative_fuel_vehicle_cafv_eligibility, make, model };
    onChange(criteria); // Send the selected filter criteria to parent
  };

  return (
    <div className="filter">
      {/* Dropdown for Electric Vehicle Type */}
      <select value={electric_vehicle_type} onChange={(e) => setElectric_vehicle_type(e.target.value)}>
        <option value="">Select Electric Vehicle Type</option>
        {options.electric_vehicle_types.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Dropdown for Alternative Fuel Eligibility */}
      <select value={clean_alternative_fuel_vehicle_cafv_eligibility} onChange={(e) => setClean_alternative_fuel_vehicle_cafv_eligibility(e.target.value)}>
        <option value="">Select Alternative Fuel Eligibility</option>
        {options.clean_alternative_fuel_vehicle_cafv_eligibilities.map((eligibility, index) => (
          <option key={index} value={eligibility}>
            {eligibility}
          </option>
        ))}
      </select>

      {/* Dropdown for Make */}
      <select value={make} onChange={(e) => handleMakeChange(e.target.value)}>
        <option value="">Select Make</option>
        {options.makes.map((makeOption, index) => (
          <option key={index} value={makeOption}>
            {makeOption}
          </option>
        ))}
      </select>

      {/* Dropdown for Model */}
      <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!make}>
        <option value="">Select Model</option>
        {filteredModels.map((modelOption, index) => (
          <option key={index} value={modelOption}>
            {modelOption}
          </option>
        ))}
      </select>

      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default Filter;
