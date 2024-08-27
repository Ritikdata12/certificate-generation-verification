const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
const {getUploadLogs} = require('../controllers/adminController');

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log("Uploaded Data:", sheetData);

    const Certificate = require('../models/Certificate');
    await Certificate.insertMany(sheetData); 

    res.status(200).json({
      message: 'File uploaded and processed successfully',
      data: sheetData,
    });
  } catch (error) {
    console.error("Error during file upload:", error.message);
    res.status(500).json({
      message: 'An error occurred during file upload',
      error: error.message,
    });
  }
});

router.get('/download/:certificateId', (req, res) => {
  const { certificateId } = req.params;
  const filePath = path.join(__dirname, '..', 'generated_pdfs', `${certificateId}.pdf`);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Send the file for download
    res.download(filePath);
  } else {
    res.status(404).json({ message: 'PDF not found' });
  }
});


router.get('/logs', getUploadLogs); // New route to fetch upload logs


module.exports = router;
