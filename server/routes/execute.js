const express = require('express');
const router = express.Router();

// Piston API endpoint (self-hosted — update PISTON_API when deployed)
const PISTON_API = process.env.PISTON_URL || 'https://emkc.org/api/v2/piston';

router.post('/', async (req, res) => {
    const { code, input = '', language = 'cpp' } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    const langMap = {
        cpp:        { language: 'c++',        version: '10.2.0', filename: 'main.cpp'  },
        java:       { language: 'java',        version: '15.0.2', filename: 'Main.java' },
        python:     { language: 'python',      version: '3.10.0', filename: 'main.py'   },
        javascript: { language: 'javascript',  version: '18.15.0',filename: 'main.js'  },
    };

    const lang = langMap[language] || langMap['cpp'];

    try {
        const response = await fetch(`${PISTON_API}/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: lang.language,
                version:  lang.version,
                files: [{ name: lang.filename, content: code }],
                stdin: input,
                args: [],
                compile_timeout: 10000,
                run_timeout: 3000,
            })
        });

        if (!response.ok) {
            const msg = await response.text();
            throw new Error(`Piston API error: ${response.status} — ${msg}`);
        }

        const result = await response.json();

        res.json({
            success:  !result.compile || result.compile.code === 0,
            output:   result.run?.stdout  || result.run?.output || '',
            error:    result.run?.stderr  || result.compile?.stderr || '',
            exitCode: result.run?.code    ?? 0,
        });

    } catch (error) {
        console.error('Execution error:', error.message);
        res.status(500).json({
            success: false,
            output:  '',
            error:   `Execution failed: ${error.message}`,
            exitCode: -1,
        });
    }
});

module.exports = router;
