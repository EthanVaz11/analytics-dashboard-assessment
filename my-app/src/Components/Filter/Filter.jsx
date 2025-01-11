import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onChange }) => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');  // Add a city input field (if needed)
  const [model, setModel] = useState(''); // Example for model filter
  const [make, setMake] = useState(''); // Example for model filter

  const handleFilter = () => {
    // Create criteria object with all the values from the state
    const criteria = { 
      state, 
      city, 
      model,
      make
       // Include other fields as needed
    };
    
    console.log("Filter criteria:", criteria); // Debug log to check criteria
    onChange(criteria);  // Pass criteria to parent component
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter by State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
        <input
        type="text"
        placeholder="Filter by Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default Filter;
