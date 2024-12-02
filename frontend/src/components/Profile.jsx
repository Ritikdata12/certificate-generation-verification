// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Spinner, Container, Row, Col, Card, ListGroup, Alert, Button } from 'react-bootstrap';
// import Header from './Header';
// import Footer from './Footer';

// import "./Profile.css";

// const Profile = ({ encryptedEmail }) => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/user/profile/${encryptedEmail}`);
//         setProfileData(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to load profile data.');
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [encryptedEmail]);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }
//   const handlesubmit =()=>{
//     window.location.href = "/student"
//   }

//   return (
//     <>
//     <Header/>
//     <Container fluid className="mt-5 ">
//   <Row>
//     <Col md={11} style={{ marginTop: "50px" , marginLeft: "50px" }}>
//       <h4>User Certificates</h4>
//       <br />
//       <br />
//       <Row>
//         {profileData.certificates.map((certificate, index) => (
//           <Col md={4} key={index} className="mb-4">
//             <Card>
//               <Card.Body>
//                 <Card.Title>{certificate.studentName}</Card.Title>
//                 <Card.Text>
//                   <strong>Internship Domain:</strong> {certificate.Domain}
//                 </Card.Text>
//                 <Card.Text>
//                   <strong>Certificate ID:</strong> {certificate.certificateId}
//                 </Card.Text>
//                 <Card.Text>
//                   <strong>Start Date:</strong> {new Date(certificate.startDate).toDateString()}
//                 </Card.Text>
//                 <Card.Text>
//                   <strong>End Date:</strong> {new Date(certificate.endDate).toDateString()}
//                 </Card.Text>
//                 <Button onClick={handlesubmit}>Go to</Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Col>
//   </Row>
// </Container>

//     <div className="space" style={{marginTop: "200px"}}>
// .
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Button,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import "./Profile.css";

const Profile = ({ encryptedEmail }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://certificate-generation-verification-83ig.vercel.app/api/user/profile/${encryptedEmail}`
        );
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load profile data.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [encryptedEmail]);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const handleSubmit = () => {
    window.location.href = "/student";
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <Container fluid>
          <h2 className="text-center mt-5">Your Certificates</h2>
          <Row className="mt-4">
            {profileData.certificates.map((certificate, index) => (
              <Col lg={4} md={6} sm={12} key={index} className="mb-4">
                <Card className="profile-card shadow-sm">
                  <Card.Body>
                    <Card.Title className="profile-card-title">
                      {certificate.studentName}
                    </Card.Title>
                    <Card.Text>
                      <strong>Internship Domain:</strong> {certificate.Domain}
                    </Card.Text>
                    <Card.Text>
                      <strong>Certificate ID:</strong>{" "}
                      {certificate.certificateId}
                    </Card.Text>
                    <Card.Text>
                      <strong>Start Date:</strong>{" "}
                      {new Date(certificate.startDate).toDateString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>End Date:</strong>{" "}
                      {new Date(certificate.endDate).toDateString()}
                    </Card.Text>
                    <Button
                      onClick={handleSubmit}
                      className="profile-card-button"
                    >
                      View Certificate
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

