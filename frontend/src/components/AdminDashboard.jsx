import React, { useRef, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null)


  const handleFileChange = (e) => setFile(e.target.files[0]);

  const uploadFile = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/upload', formData);
      
      console.log(response.data);
      alert(response.data.message);
      
    } catch (error) {
      alert("File upload failed. Please try again.");
      console.error("File upload error:", error);
    }
  };



  return (
    <>
    <Header/>
    <div style={{ width: "100%", minHeight: "100vh", overflowY: 'auto', padding: '20px' , marginTop: '100px'  , backgroundColor: "white"}}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem"}}>Admin Dashboard</h2>
      <form onSubmit={uploadFile} style={{ width: "100%", flexFlow: "column", display: "flex", alignItems: "center"}}>
        <div className='input-box' onClick={() => inputRef.current.click()}>
          upload files
        </div>
        <input hidden ref={inputRef} type="file" onChange={handleFileChange} />
        <div>

        <button>Upload File</button>
        </div>
      </form>

   

        <Sidebar/>

      <div style={{marginTop: '50px'}}>
        <Footer/>
      </div>


    </div>
    </>
  );
}

export default AdminDashboard;
