const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
