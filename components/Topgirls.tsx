import React, { useState } from 'react';

type Girlcrossdata = {
  name: string;
  time: string;
};

const WalkCrossComponent: React.FC = () => {
  const [data, setData] = useState<Girlcrossdata[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showData, setShowData] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/topgirls');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData.data);
      setError(null);
      setShowData(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowData(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md relative m-3 w-1/2">
      <h1 className="text-xl font-bold mb-4">Girlscross Data</h1>
      {!showData && (
        <button onClick={fetchData} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      )}
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      {showData && (
        <div>
          <ul>
            {data.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>Name:</strong> {item.name}, <strong>Time:</strong> {item.time}
              </li>
            ))}
          </ul>
          <button onClick={handleClose} className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default WalkCrossComponent;
