const multer = require('multer');
const xlsx = require('xlsx');
const Certificate = require('../models/Certificate');

// Multer storage setup for storing uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

const uploadLogs = []; // Array to store upload logs

// Function to process Excel data and store it in MongoDB
const processExcelData = async (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  for (const row of data) {
    const { certificateId, studentName, internshipDomain, startDate, endDate } = row;
    try {
      await Certificate.create({
        certificateId,
        studentName,
        internshipDomain,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    } catch (error) {
      console.error(`Error saving certificate data for certificateId ${certificateId}:`, error.message);
    }
  }
};

// Upload Excel file and process the data with logging
const uploadExcel = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload an Excel file.' });
  }

  const logEntry = {
    timestamp: new Date(),
    fileName: req.file.originalname,
    status: 'Processing',
  };
  uploadLogs.push(logEntry);

  try {
    // Process Excel data and wait for completion
    await processExcelData(req.file.path);
    logEntry.status = 'Success';
    res.status(200).json({ message: 'Excel file processed and data saved successfully.' });
  } catch (error) {
    logEntry.status = 'Failed';
    res.status(500).json({ message: 'Failed to process Excel file.', error: error.message });
  }
};

// Endpoint to fetch upload logs
const getUploadLogs = (req, res) => {
  res.status(200).json(uploadLogs);
};

module.exports = { upload, uploadExcel, getUploadLogs };
