const Certificate = require('../models/Certificate');
const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const getCertificateById = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const generatePDF = async (req, res) => {
  try {
    const { certificateId } = req.params;

    // Fetch the certificate data from the database
    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Generate the PDF
    const doc = new jsPDF();
    doc.text("Certificate of Completion", 20, 20);
    doc.text("This is to certify that:", 20, 30);
    doc.text(certificate.studentName, 20, 40);
    doc.text(`Has completed the ${certificate.internshipDomain} internship`, 20, 50);
    doc.text(`Start Date: ${certificate.startDate.toDateString()}`, 20, 60);
    doc.text(`End Date: ${certificate.endDate.toDateString()}`, 20, 70);

    // Convert the PDF to a Buffer (compatible with Node.js)
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // Define the output file path and name
    const outputDir = path.join(__dirname, '..', 'generated_pdfs');
    const outputPath = path.join(outputDir, `${certificateId}.pdf`);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save the PDF buffer to the file system
    fs.writeFileSync(outputPath, pdfBuffer);

    // Return a success message with the path
    res.status(200).json({ message: 'PDF generated and stored successfully.', path: `/download/${certificateId}` });
  } catch (error) {
    console.error('Error generating PDF:', error.message);
    res.status(500).json({ message: 'Error generating PDF.', error: error.message });
  }
};

module.exports = { generatePDF };


