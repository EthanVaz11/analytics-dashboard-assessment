import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ options, onChange }) => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const handleFilter = () => {
    const criteria = { state, city, make, model };
    onChange(criteria); // Send the selected filter criteria to parent
  };
  console.log(options, "Filter Options")

  return (
    <div className="filter">
      {/* Dropdown for State */}
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Select State</option>
        {options.states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* Dropdown for City */}
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select City</option>
        {options.cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>

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

      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default Filter;
