import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const RawDataset: React.FC = () => {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  useEffect(() => {
    fetch('/Electric_Vehicle_Population_Data.csv')
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result: any) => {
            setParsedData(result.data);
          },
        });
      });
  }, []);

  const paginatedData = parsedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <h2>CSV Data Dashboard</h2>
      <table>
        <thead>
          <tr>
          <th>#</th> {/* Add a number column */}
            {parsedData[0] && Object.keys(parsedData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row:any, index:number) => (
            <tr key={index}>
              <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
              {Object.values(row).map((value:any, idx:number) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
    {/* Show Previous button only if not on the first page */}
    {currentPage > 1 && (
      <button onClick={() => setCurrentPage((prev) => prev - 1)}>Previous</button>
    )}
    {/* Show Next button only if not on the last page */}
    {currentPage * rowsPerPage < parsedData.length && (
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
    )}
  </div>
    </div>
  );
};


export default RawDataset;

