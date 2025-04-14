const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Simple test API endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Endpoint to serve the HTML file
app.get('/drive-picker', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'picker.html');

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: "HTML file not found"
            });
        }

        const htmlContent = fs.readFileSync(filePath, 'utf8');
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlContent);

    } catch (error) {
        console.error("Error serving HTML:", error);
        res.status(500).json({
            success: false,
            message: "Error serving HTML file",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
