const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 65111

app.use((req, res, next) => {
    if(req.url !== '/') {
        return res.status(404).sendFile(path.join(__dirname, '404.html'));
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
