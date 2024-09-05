import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import certificateTemplate from '../assets/certificate-template.png'; 
import './StudentPortal.css';

function StudentPortal() {
  const [certificateId, setCertificateId] = useState('');
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); 
  const [verificationStatus, setVerificationStatus] = useState(''); // New state for verification status

  const coordinates = {
    name: { x: 370, y: 230 },
    domain: { x: 250, y: 338 },
    startDate: { x: 255, y: 360 },
    endDate: { x: 425, y: 360 },
  };

  const handleInputChange = (e) => {
    setCertificateId(e.target.value);
  };

  const handleSearch = async () => {
    setErrorMessage('');
    setCertificateDetails(null);
    setLoading(true); 

    try {
      setTimeout(async () => {
        const response = await fetch(`http://localhost:5000/api/user/certificate/${certificateId}`);
        const data = await response.json();

        setLoading(false); 

        if (response.ok) {
          setCertificateDetails(data);
        } else {
          setErrorMessage(data.message || 'Certificate not found.');
        }
      }, 3000); 
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error fetching certificate details.');
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF('landscape'); 
    
    const img = new Image();
    img.src = certificateTemplate;
    img.onload = () => {
      doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

      if (certificateDetails) {
        doc.setFontSize(24);
        doc.text(certificateDetails.studentName, 109, 120, { align: 'center' }); 
        doc.setFontSize(16);
        doc.text(certificateDetails.internshipDomain, 105, 140, { align: 'center' }); 
        doc.text((certificateDetails.startDate), 60, 170); 
        doc.text((certificateDetails.endDate), 145, 170); 
      }

      doc.save(`${certificateId}.pdf`);
    };
  };

  const handleVerify = async () => {
    setVerificationStatus(''); // Reset verification status
    setErrorMessage('');
    setLoading(true);

    // Simulate delay of 5 seconds for verification process
    setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/verify/${certificateId}`);
        const data = await response.json();

        setLoading(false);

        if (response.ok) {
          setVerificationStatus('success');
        } else {
          setVerificationStatus('failed');
          setErrorMessage(data.message || 'Verification failed.');
        }
      } catch (error) {
        setLoading(false);
        setVerificationStatus('failed');
        setErrorMessage('Error during verification.');
      }
    }, 5000); // Delay of 5 seconds
  };

  return (
    <div className="App">
      <h1>Certificate Verification</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certificateId}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div className="loader"></div>} 

      {errorMessage && <p className="error">{errorMessage}</p>}

      {certificateDetails && (
        <>
          <div className="certificate-preview">
            <img src={certificateTemplate} alt="Certificate Template" className="certificate-image"/>
            <div className="certificate-overlay">
              <p
                className="certificate-name"
                style={{
                  position: 'absolute',
                  top: `${coordinates.name.y}px`,
                  left: `${coordinates.name.x}px`,
                  transform: 'translateX(-50%)',
                  fontSize: '24px',
                  textAlign: 'center',
                }}
              >
                {certificateDetails.studentName}
              </p>
              <p
                className="certificate-domain"
                style={{
                  position: 'absolute',
                  top: `${coordinates.domain.y}px`,
                  left: `${coordinates.domain.x}px`,
                  transform: 'translateX(-50%)',
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                {certificateDetails.internshipDomain}
              </p>
              <p
                className="certificate-dates"
                style={{
                  position: 'absolute',
                  top: `${coordinates.startDate.y}px`,
                  left: `${coordinates.startDate.x}px`,
                  fontSize: '16px',
                }}
              >
                {new Date(certificateDetails.startDate).toDateString()}
              </p>
              <p
                className="certificate-dates"
                style={{
                  position: 'absolute',
                  top: `${coordinates.endDate.y}px`,
                  left: `${coordinates.endDate.x}px`,
                  fontSize: '16px',
                }}
              >
                {new Date(certificateDetails.endDate).toDateString()}
              </p>
            </div>
          </div>

          <button onClick={handleDownload}>Download Certificate as PDF</button>
          <button onClick={handleVerify} className={`verify-button ${verificationStatus}`}>Verify Certificate</button>

          {verificationStatus && (
            <p className={`verification-message ${verificationStatus}`}>
              {verificationStatus === 'success' ? 'Verification Successful!' : 'Verification Failed'}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default StudentPortal;
