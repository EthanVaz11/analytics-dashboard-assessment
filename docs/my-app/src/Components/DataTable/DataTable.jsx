// src/components/DataTable/DataTable.jsx
import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({ data }) => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIdx, startIdx + rowsPerPage);

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage((prev) => prev - 1)}>
            Previous
          </button>
        )}
        {startIdx + rowsPerPage < data.length && (
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DataTable;
