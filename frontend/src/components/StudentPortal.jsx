import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import certificateTemplate from '../assets/certificate-template.png'; // Import your certificate template
import './StudentPortal.css';

function StudentPortal() {
  const [certificateId, setCertificateId] = useState('');
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const coordinates = {
    name: { x: 370, y: 215 },
    domain: { x: 255, y: 323 },
    startDate: { x: 255, y: 345 },
    endDate: { x: 425, y: 345 },
  };

  const handleInputChange = (e) => {
    setCertificateId(e.target.value);
  };

  const handleSearch = async () => {
    setErrorMessage('');
    setCertificateDetails(null);

    try {
      const response = await fetch(`http://localhost:5000/api/user/certificate/${certificateId}`);
      const data = await response.json();

      if (response.ok) {
        setCertificateDetails(data);
      } else {
        setErrorMessage(data.message || 'Certificate not found.');
      }
    } catch (error) {
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
        doc.text(certificateDetails.studentName, 109, 120, { align: 'center' }); // Name position
        doc.setFontSize(16);
        doc.text(certificateDetails.internshipDomain, 105, 140, { align: 'center' }); // Internship domain position
        doc.text(new Date(certificateDetails.startDate).toDateString(), 60, 170); // Start Date position
        doc.text(new Date(certificateDetails.endDate).toDateString(), 145, 170); // End Date position
      }

      doc.save(`${certificateId}.pdf`);
    };
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
        </>
      )}
    </div>
  );
}

export default StudentPortal;
