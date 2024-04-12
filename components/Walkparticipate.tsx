"use client"

import React, { useState } from 'react';

const CertificateButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/walkcert');
      const data = await response.json();
      if (data.message !== 'Emails sent successfully!') {
        throw new Error('Error sending emails');
      }
      setMessage(data.message);
    } catch (error) {
      setMessage('Error sending emails. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? 'Sending...' : 'Send Walkathon Certificates'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default CertificateButton;
