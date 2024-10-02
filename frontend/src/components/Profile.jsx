import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Col, Card, ListGroup, Alert, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const Profile = ({ encryptedEmail }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile/${encryptedEmail}`);
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load profile data.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [encryptedEmail]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
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
  const handlesubmit =()=>{
    window.location.href = "/student"
  }

  return (
    <>
    <Header/>
    <Container className="mt-5" style={{height: "auto"}}>
      <Row>
       

        <Col md={8} style={{marginTop: "50px"}}>
          <h4>Certificates</h4>
          <Row>
            {profileData.certificates.map((certificate, index) => (
              <Col md={6} key={index} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{certificate.studentName}</Card.Title>
                    <Card.Text>
                      <strong>Internship Domain:</strong> {certificate.internshipDomain}
                    </Card.Text>
                    <Card.Text>
                        <strong>Certificate id:</strong>{certificate.certificateId}
                    </Card.Text>
                    <Card.Text>
                      <strong>Start Date:</strong> {new Date(certificate.startDate).toDateString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>End Date:</strong> {new Date(certificate.endDate).toDateString()}
                    </Card.Text>
                    <Card.Text>
                        <Button onClick={handlesubmit}>go to</Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
    <div className="space" style={{marginTop: "200px"}}>
.
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
