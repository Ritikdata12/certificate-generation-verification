import React, { useRef, useState } from 'react';
import axios from 'axios';
import Tables from './Tables';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [logs, setLogs] = useState([]);
  const inputRef = useRef(null)


  const handleFileChange = (e) => setFile(e.target.files[0]);

  const uploadFile = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/upload', formData);
      alert(response.data.message);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/logs');
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return (
    <>
    <Header/>
    <div style={{ width: "100%", minHeight: "100vh", overflowY: 'auto', padding: '20px' , marginTop: '100px' }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem"}}>Admin Dashboard</h2>
      <div style={{ width: "100%", flexFlow: "column", display: "flex", alignItems: "center"}}>
        <div className='input-box' onClick={() => inputRef.current.click()}>
          upload files
        </div>
        <input hidden ref={inputRef} type="file" onChange={handleFileChange} />
        <div>

        <button onClick={uploadFile}>Upload File</button>
        </div>
      </div>

   

      {/* <div style={{ height: '400px', marginTop: '20px' , display: 'flex' }}> */}
        <Sidebar/>
        {/* <Tables />
      </div> */}

      <div style={{marginTop: '50px'}}>
        <Footer/>
      </div>


    </div>
    </>
  );
}

export default AdminDashboard;
