import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import certificateTemplate from '../assets/cert-temp.png';
import animation from "../assets/animation.mp4";
import './StudentPortal.css';
import Footer from './Footer';
import Header from './Header';
import { QRCodeSVG } from 'qrcode.react';

function StudentPortal() {
  const [certificateId, setCertificateId] = useState('');
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [uniqueId, setUniqueId] = useState('');

  const coordinates = {
    name: { x: 370, y: 230 },
    domain: { x: 300, y: 338 },
    startDate: { x: 255, y: 360 },
    endDate: { x: 425, y: 360 },
    uniqueId: { x: 50, y: 50 }, 

  };
    const generateUniqueId = () => {
      return [...Array(16)]
        .map(() => Math.random().toString(36)[2])
        .join('');
    };
  
    useEffect(() => {
      setUniqueId(generateUniqueId());
    }, []);

  const handleInputChange = (e) => setCertificateId(e.target.value);

  const handleSearch = async () => {
    setErrorMessage('');
    setCertificateDetails(null);
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/user/certificate/${certificateId}`);
      const data = await response.json();
    
      setLoading(false);
    
      if (response.ok) {
        setCertificateDetails(data);
        setShowAnimation(true); 
        setTimeout(() => setShowAnimation(false), 2000); 
        setErrorMessage(''); 
      } else {
        setErrorMessage(data.message || 'Certificate not found.');
      }
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
        doc.text(certificateDetails.studentName, 130, 97, { align: 'center' });
        doc.setFontSize(16);
        doc.text(certificateDetails.Domain, 97, 132, { align: 'center' });
        doc.text(new Date(certificateDetails.startDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long', day: 'numeric'
        }), 95, 140);
        doc.text(new Date(certificateDetails.endDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long', day: 'numeric'
        }), 160, 140);
      }

      doc.save(`${certificateId}.pdf`);
    };
  };

  const handleVerify = async () => {
    setVerificationStatus('');
    setErrorMessage('');
    setLoading(true);
    setVerifying(true);

    setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/verify/${certificateId}`);
        const data = await response.json();

        setLoading(false);
        setVerifying(false);

        if (response.ok) {
          setVerificationStatus('success');
        } else {
          setVerificationStatus('failed');
          setErrorMessage(data.message || 'Verification failed.');
        }
      } catch (error) {
        setLoading(false);
        setVerifying(false);
        setVerificationStatus('failed');
        setErrorMessage('Error during verification.');
      }
    }, 5000);
  };

  const certificateVerificationUrl = `http://localhost:5000/api/user/certificate/${certificateId}`;

  return (
    <>
      <Header />
      <div className="App" style={{ marginTop: "100px", height: "1000px" }}>
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

        {loading && (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}

        {errorMessage && <p className="error">{errorMessage}</p>}

        {showAnimation && (
  <div className="animation-overlay">
    <img 
      src="https://i.pinimg.com/originals/78/3c/bd/783cbd26daebf1821ae18f72894ec3a8.gif" 
      alt="Animation" 
      className="animation-image" 
    />
  </div>
)}

        {certificateDetails && (
          <>
            <div className="certificate-preview">
              <img src={certificateTemplate} alt="Certificate Template" className="certificate-image" />
              <div className="certificate-overlay">
              <p
                  className="certificate-id"
                  style={{
                    position: 'absolute',
                    top: `${coordinates.uniqueId.y}px`,
                    left: `${coordinates.uniqueId.x}px`,
                    fontSize: '12px',
                  }}
                >
                  Certificate ID: {uniqueId}
                </p>

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
                  {certificateDetails.Domain}
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
                  {new Date(certificateDetails.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
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
                  {new Date(certificateDetails.endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="qr-code-container" style={{
                position: 'absolute', bottom: '20px', right: '20px',
                padding: '10px', border: '1px solid #ddd', backgroundColor: 'white'
              }}>
                <QRCodeSVG value={certificateVerificationUrl} size={100} />
              </div>
            </div>
                
            <button onClick={handleDownload}>Download Certificate as PDF</button>
            <button onClick={handleVerify} className={`verify-button ${verificationStatus}`}>Verify Certificate</button>

            <div className={`verification-progress ${verifying ? 'active' : ''}`}>
              <div className="progress-bar"></div>
            </div>

            {verificationStatus && (
              <p className={`verification-message ${verificationStatus}`}>
                {verificationStatus === 'success' ? 'Verification Successful!' : 'Verification Failed'}
              </p>
            )}

          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default StudentPortal;
