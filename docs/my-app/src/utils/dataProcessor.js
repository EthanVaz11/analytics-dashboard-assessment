// src/utils/dataProcessor.js

/**
 * Filters the dataset based on the given criteria.
 * @param {Array} data - The dataset to be filtered.
 * @param {Object} criteria - The criteria to filter by (e.g., electric vehicle type).
 * @returns {Array} - The filtered dataset.
 */
export const processData = (data, criteria) => {
    if (!criteria) return data;  // If no criteria are provided, return the original data
  
    return data.filter((item) => {
      let isValid = true;
  
      // Filter by each field if a value is provided in the criteria
      if (criteria.state && item['State'] && !item['State'].toLowerCase().includes(criteria.state.trim().toLowerCase())) {
        isValid = false;
      }
  
      if (criteria.city && item['City'] && !item['City'].toLowerCase().includes(criteria.city.trim().toLowerCase())) {
        isValid = false;
      }
  
      if (criteria.model && item['Model'] && !item['Model'].toLowerCase().includes(criteria.model.trim().toLowerCase())) {
        isValid = false;
      }
  
      if (criteria.make && item['Make'] && !item['Make'].toLowerCase().includes(criteria.make.trim().toLowerCase())) {
        isValid = false;
      }
  
      if (criteria.postalCode && item['Postal Code'] && !item['Postal Code'].toString().includes(criteria.postalCode.trim())) {
        isValid = false;
      }
  
      if (criteria.year && item['Model Year'] && !item['Model Year'].toString().includes(criteria.year.trim())) {
        isValid = false;
      }
  
      // Add more filtering rules here for other columns if needed
  
      return isValid;
    });
  };
  