import http from 'http';
import fs from 'fs';
import path from 'path';

// Manual env parser
const envPath = path.resolve('.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length === 2) {
            process.env[parts[0].trim()] = parts[1].trim();
        }
    });
}

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    // 1. Route POST /api/place-order
    if (req.method === 'POST' && req.url === '/api/place-order') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const parsedBody = JSON.parse(body);
                
                // Emulate Vercel req/res objects
                const mockReq = {
                    method: 'POST',
                    body: parsedBody
                };
                
                const mockRes = {
                    status(statusCode) {
                        res.statusCode = statusCode;
                        return this;
                    },
                    json(data) {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(data));
                        return this;
                    }
                };

                // Dynamically import place-order handler
                const placeOrderModule = await import('./api/place-order.js');
                await placeOrderModule.default(mockReq, mockRes);

            } catch (err) {
                console.error('Serverless execution error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Internal Dev Server Error' }));
            }
        });
        return;
    }

    // 2. Serve static landing page
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
        const htmlPath = path.resolve('index.html');
        if (fs.existsSync(htmlPath)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(fs.readFileSync(htmlPath));
        } else {
            res.statusCode = 404;
            res.end('index.html not found');
        }
        return;
    }

    // 404 for other routes
    res.statusCode = 404;
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`\n🌿 Sthiram Lifestyle Clinic Local Dev Server`);
    console.log(`👉 Running at: http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop\n`);
});
