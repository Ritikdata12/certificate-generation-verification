import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress'; 
import axios from 'axios';
import './Table.css'; 

const Tables = () => {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true); 
    try {
      const response = await axios.get('https://certificate-generation-verification-83ig.vercel.app/api/admin/certificates');
      setTable(response.data); 
    } catch (error) {
      setError('Error fetching data'); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  const uploadData = async (newData) => {
    try {
      await axios.post('https://certificate-generation-verification-83ig.vercel.app/api/admin/upload', newData);
      fetchData(); 
    } catch (error) {
      console.error("Error uploading data", error); 
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'certificateId', headerName: 'Certificate ID', width: 200 },
    { field: 'studentName', headerName: 'Student Name', width: 200 },
    { field: 'internshipDomain', headerName: 'Internship Domain', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'endDate', headerName: 'End Date', width: 150 },
  ];

  return (
    <Box
      sx={{
        height: 1000,
        minWidth: '80%',
        borderRadius: '8px',
        border: "0px",
        overflow: 'auto',
      }}
    >
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : error ? (
        <p className="error-message">{error}</p> 
      ) : (
        <DataGrid
          rows={table.map((row, index) => ({ ...row, id: index }))} 
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 55,
              },
            },
          }}
          pageSizeOptions={[55]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5', 
            },
            '& .MuiDataGrid-cell': {
              fontSize: '20px',
              marginLeft: '50px',
              padding: '10px 2px', 
            },
            '& .MuiDataGrid-columnHeaders': {
              display: 'flex',
              justifyContent: 'space-evenly',
              fontSize: '20px',
              paddingLeft: '50px',
            },
            '& .MuiDataGrid-columnHeader:nth-child(3)': { marginLeft: 5 },
            '& .MuiDataGrid-columnHeader:nth-child(4)': { marginLeft: 6 },
            '& .MuiDataGrid-columnHeader:nth-child(5)': { marginLeft: 6 },
            '& .MuiDataGrid-columnHeader:nth-child(6)': { marginLeft: 4 },
            '& .MuiDataGrid-columnHeader:nth-child(7)': { marginLeft: 6 },
            '& .MuiDataGrid-columnHeader:nth-child(8)': { marginLeft: 6 },
          }}
        />
      )}
    </Box>
  );
};

export default Tables;
