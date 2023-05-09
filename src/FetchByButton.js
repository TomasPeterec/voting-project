import React, { useState } from 'react';

function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/userVotes/')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    <div>
      <h1>My Data:</h1>
      {loading && <p>Loading...</p>}
      <button onClick={fetchData}>Fetch Data</button>
      <ul>
        {data.map(item => (
          <li key={item.primary_key}>{item.mail_or_id}: {item.voted_values}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;