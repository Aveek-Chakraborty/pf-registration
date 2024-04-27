"use client"
import React, { useState } from 'react';

type BoysCrossData = {
  name: string;
  time: string;
};

const BoysCrossComponent: React.FC = () => {
  const [data, setData] = useState<BoysCrossData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showData, setShowData] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/topboys');
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
    <div className="bg-gray-100 p-4 rounded-lg shadow-md relative m-3 w-1/2 ">
      <div className='flex justify-between'>
        <h1 className="text-xl font-bold mb-4">Boyscross Data</h1>
        {showData && (
          <button onClick={handleClose} className=" bg-red-500 text-white px-2 py-1 rounded-md ">
          Close
        </button>
        )}
      </div>
      {!showData && (
        <button onClick={fetchData} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      )}
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      {showData && (
        <div className="table-container mt-3">
          <table className="table-auto w-full border border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b border-gray-200">{item.name}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      )}
    </div>
  );
};

export default BoysCrossComponent;
