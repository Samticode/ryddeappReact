const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('better-sqlite3', { verbose: console.log })
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const session = require('express-session');




const db = new sqlite3('./database/data.db')
const saltRounds = 10 || process.env.SALT_ROUNDS;
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));




function setSessionVariables(data, reqSession) {
    reqSession.familyId = data.FamilyID;
    reqSession.familyName = data.FamilyName;

    reqSession.userId = '';
    reqSession.username = '';
    reqSession.email = '';
    reqSession.password = '';
    reqSession.isParent = '';
}




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
    try {
        const hashedPassword = await bcrypt.hash(req.body.familyPassword, saltRounds);

        const query = `INSERT INTO Families (FamilyName, FamilyPassword) VALUES (?, ?)`;
        const data = db.prepare(query).run(req.body.familyName, hashedPassword);
        res.send({ message: 'Success'});
    } catch (error) {
        res.status(500).send({ message: 'Error creating family' });
    }
});


app.post('/api/loginFamily', async (req, res) => {
    const query = `SELECT FamilyID, FamilyName, FamilyPassword FROM Families WHERE FamilyName = ?`;

    const data = db.prepare(query).get(req.body.familyName);

    if (data) {
        const match = await bcrypt.compare(req.body.familyPassword, data.FamilyPassword);
        if (match) {
            setSessionVariables(data, req.session);
          res.send({ message: 'Success' });
          console.log('Success!')
        } else {
          res.send({ message: 'Incorrect password' });
          console.log('Incorrect password')
        }
      } else {
        res.send({ message: 'Family not found' });
        console.log('Family not found')
      }

      console.log(req.session)
});




const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});