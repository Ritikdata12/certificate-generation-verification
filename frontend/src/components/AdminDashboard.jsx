// AdminDashboard.js
import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [logs, setLogs] = useState([]);

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
    <div>
      <h2>Admin Dashboard</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      <button onClick={fetchLogs}>View Logs</button>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log.timestamp} - {log.fileName} - {log.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
