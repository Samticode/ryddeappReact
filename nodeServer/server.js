const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('better-sqlite3', { verbose: console.log })
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');


const db = new sqlite3('./database/data.db')
const saltRounds = 10 || process.env.SALT_ROUNDS;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.get('/api/all', (req, res) => {
    const query = `
        SELECT 
            Families.FamilyName, 
            Users.Username, 
            Users.Email, 
            Users.IsParent, 
            Chores.ChoreName, 
            Chores.Description
        FROM 
            Users
        INNER JOIN 
            Families ON Users.FamilyID = Families.FamilyID
        INNER JOIN 
            Chores ON Users.UserID = Chores.AssignedUserID;
    `;
    const data = db.prepare(query).all();
    res.send(data);
});


app.post('/api/createFamily', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.familyPassword, saltRounds);

    const query = `
        INSERT INTO Families (FamilyName, FamilyPassword) VALUES (?, ?)
    `;
    const data = db.prepare(query).run(req.body.familyName, hashedPassword);
    res.send(data);
})



const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});