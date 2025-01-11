// src/components/LazyLoader/LazyLoader.jsx
import React from 'react';
import './LazyLoader.css';

const LazyLoader = () => (
  <div className="lazy-loader">
    <div className="spinner"></div>
    <p>Loading data, please wait...</p>
  </div>
);

export default LazyLoader;
