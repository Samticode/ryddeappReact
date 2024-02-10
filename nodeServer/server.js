const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());


app.get('/api', (req, res) => {
    res.send({ users: ['John', 'Betty', 'Hal'] });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});