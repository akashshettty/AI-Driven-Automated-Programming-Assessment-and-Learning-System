require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// ── Startup key check ──────────────────────────────────
const apiKey = process.env.GROQ_API_KEY;
if (!apiKey || apiKey === 'dummy_key' || apiKey.trim() === '') {
    console.error('┌─────────────────────────────────────────────────┐');
    console.error('│  ❌ GROQ_API_KEY is missing or set to dummy_key │');
    console.error('│  AI features (hints, chat) will NOT work.        │');
    console.error('│  Fix: set your real key in server/.env           │');
    console.error('│  GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx       │');
    console.error('└─────────────────────────────────────────────────┘');
} else {
    console.log('✅ GROQ_API_KEY loaded:', apiKey.slice(0, 8) + '...' + apiKey.slice(-4));
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const analyzeRoute = require('./routes/analyze');
const executeRoute = require('./routes/execute');
const chatRoute = require('./routes/chat');

app.use('/api/analyze', analyzeRoute);
app.use('/api/execute', executeRoute);
app.use('/api/chat', chatRoute);

// Health Check
app.get('/', (req, res) => {
    res.send('Real-Time Code Mentor API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}\n`);
});
