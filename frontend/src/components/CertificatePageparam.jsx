import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
const CertificatePageparam = () => {
    const { certificateId } = useParams();
    const [certificateDetails, setCertificateDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchCertificate = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/api/user/certificate/${certificateId}`);
          const data = await response.json();
          setLoading(false);
          if (response.ok) {
            setCertificateDetails(data);
          } else {
            setErrorMessage(data.message || 'Certificate not found.');
          }
        } catch (error) {
          setLoading(false);
          setErrorMessage('Error fetching certificate details.');
        }
      };
  
      fetchCertificate();
    }, [certificateId]);
  
    if (loading) return <div>Loading...</div>;
    if (errorMessage) return <div className="error">{errorMessage}</div>;
  return (
    <div>
    <h1>Certificate Details</h1>
    {certificateDetails && (
      <div>
        <p>Name: {certificateDetails.studentName}</p>
        <p>Domain: {certificateDetails.Domain}</p>
      </div>
    )}
  </div>
  )
}

export default CertificatePageparam