const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { uploadPrescription } = require('../controllers/prescriptionController');

const router = express.Router();

// POST route for uploading prescription
router.post('/upload', upload.single('prescription'), uploadPrescription);

module.exports = router;
