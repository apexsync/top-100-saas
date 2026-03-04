const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data.json');

// Helper to get fresh data
function getApps() {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(rawData);
    } catch (e) {
        return [];
    }
}

// API Endpoints
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/apps', (req, res) => {
    res.json(getApps());
});

app.get('/api/apps/:rank', (req, res) => {
    const appsData = getApps();
    const rank = parseInt(req.params.rank);
    const item = appsData.find(a => a.rank === rank);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'App not found' });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    // Serve static files from root
    app.use(express.static(path.join(__dirname, '..')));
    
    // Help with SPA-like behavior if needed
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
