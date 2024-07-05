import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RefoundStatus = () => {
  const [refundStatus, setRefundStatus] = useState('');
  const refundId = 'rfnd_OJ290rBQsidrSn'; // Replace with your refund ID

  useEffect(() => {
    const fetchRefundStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/get_refund_status/${refundId}/`);
            
          } catch (error) {
            console.error('Error fetching refund status:', error);
          }
    };

    fetchRefundStatus();
  }, [refundId]);

  return (
    <div>
      <h1>Refund Status</h1>
      <p>Refund ID: {refundId}</p>
      <p>Status: {refundStatus}</p>
    </div>
  );
};

export default RefoundStatus;
