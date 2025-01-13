// worker.js
self.onmessage = (event) => {
    const data = event.data;
    const countyCounts = {}; // Example of aggregation logic
    data.forEach(item => {
      countyCounts[item.county] = (countyCounts[item.county] || 0) + 1;
    });
    postMessage(countyCounts); // Send the result back to the main thread
  };
  