// import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';
// import Sidebar from './Sidebar';

// function AdminDashboard() {
//   const [file, setFile] = useState(null);
//   const inputRef = useRef(null)


//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const uploadFile = async () => {
//     if (!file) return alert("Please select a file first.");

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/upload', formData);
      
//       console.log(response.data);
//       alert(response.data.message);
      
//     } catch (error) {
//       alert("File upload failed. Please try again.");
//       console.error("File upload error:", error);
//     }
//   };



//   return (
//     <>
//     <Header/>
//     <div style={{ width: "100%", minHeight: "100vh", overflowY: 'auto', padding: '20px' , marginTop: '100px'  , backgroundColor: "white"}}>
//       <h2 style={{ textAlign: "center", marginBottom: "2rem"}}>Admin Dashboard</h2>
//       <form onSubmit={uploadFile} style={{ width: "100%", flexFlow: "column", display: "flex", alignItems: "center"}}>
//         <div className='input-box' onClick={() => inputRef.current.click()}>
//           upload files
//         </div>
//         <input hidden ref={inputRef} type="file" onChange={handleFileChange} />
//         <div>

//         <button>Upload File</button>
//         </div>
//       </form>

   

//         <Sidebar/>

//       <div style={{marginTop: '50px'}}>
//         <Footer/>
//       </div>


//     </div>
//     </>
//   );
// }

// export default AdminDashboard;

import React, { useRef, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './AdminDashboard.css'; // Assuming you have some basic CSS for styling.

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // State to manage the loader
  const [fileName, setFileName] = useState(''); // State to store the file name
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault(); 
    if (!file) return alert("Please select a file first.");

    setIsUploading(true); 

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://certificate-generation-verification-83ig.vercel.app/api/admin/upload', formData);

      console.log(response.data);
      alert(response.data.message);

    } catch (error) {
      alert("File upload failed. Please try again.");
      console.error("File upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div style={{ width: "100%", minHeight: "100vh", overflowY: 'auto', padding: '20px', marginTop: '100px', backgroundColor: "white" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Admin Dashboard</h2>

        <form onSubmit={uploadFile} style={{ width: "100%", flexFlow: "column", display: "flex", alignItems: "center" }}>
          <div className='input-box' onClick={() => inputRef.current.click()} style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            {fileName || 'Upload File'} {/* Show the file name if a file is selected */}
          </div>
          <input hidden ref={inputRef} type="file" onChange={handleFileChange} />
          
          <div style={{ marginTop: '20px' }}>
            <button type="submit" disabled={isUploading}> {/* Disable the button while uploading */}
              {isUploading ? 'Uploading...' : 'Upload File'} {/* Change text based on uploading state */}
            </button>
          </div>
        </form>

        {isUploading && (
          <div className="loader-wrapper">
            <div className="loader"></div> {/* Basic loader style */}
          </div>
        )}

        <Sidebar />

        <div style={{ marginTop: '50px' }}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
