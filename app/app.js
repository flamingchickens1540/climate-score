const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const path = require('path');
app.use(cors());
app.use(express.static('templates'));
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});