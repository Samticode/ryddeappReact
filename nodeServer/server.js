const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.send([{name: 'John', age: 30}]);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});