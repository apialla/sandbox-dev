import express from 'express';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

import { join, dirname } from 'path';
const __dirname = dirname(__filename);


const app = express();
const PORT = process.env.PORT || 65111

app.use((req, res, next) => {
    if(req.url !== '/') {
        return res.status(404).sendFile(join(__dirname, '404.html'));
    }
    next();
});

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'home.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
