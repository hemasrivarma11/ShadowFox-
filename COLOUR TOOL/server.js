const express = require('express');
const app = express();
const PORT = 3000;

let colors = [];

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());

app.post('/color', (req, res) => {
    const { color } = req.body;
    if (color) {
        colors.push(color);
        res.json({ success: true });
    } else {
        res.json({ success: false, error: "No color sent" });
    }
});

app.get('/colors', (req, res) => {
    res.json(colors);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
