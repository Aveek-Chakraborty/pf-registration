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
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Sending...' : 'Send Walkathon Certificates'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default CertificateButton;
