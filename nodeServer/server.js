const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('better-sqlite3', { verbose: console.log })
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const session = require('express-session');
const nodemailer = require('nodemailer');




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




//-------------------- FAMILY --------------------//
app.post('/api/createFamily', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.familyPassword, saltRounds);

        const query = `INSERT INTO Families (FamilyName, FamilyPassword) VALUES (?, ?)`;
        const data = db.prepare(query).run(req.body.familyName, hashedPassword);
        res.send({ message: 'Success'});
    } catch (error) {
        res.status(500).send({ message: error });
        console.log(error)
    }
});


app.post('/api/loginFamily', async (req, res) => {
    const query = `SELECT FamilyID, FamilyName, FamilyPassword FROM Families WHERE FamilyName = ?`;

    const data = db.prepare(query).get(req.body.familyName);

    if (data) {
        const match = await bcrypt.compare(req.body.familyPassword, data.FamilyPassword);
        if (match) {
            req.session.familyId = data.FamilyID;
            req.session.familyName = data.FamilyName;

            req.session.userId = '';
            req.session.username = '';
            req.session.email = '';
            req.session.password = '';
            req.session.isParent = '';
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




//-------------------- USER --------------------//
app.get('/api/user', (req, res) => {
    const query = `
        SELECT Users.UserID, Users.Username, Users.Email, Users.Password, Users.IsParent, Users.FamilyID, Users.ProfilePictureID, Families.FamilyName, 
        CASE WHEN Users.ProfilePictureID IS NULL THEN NULL ELSE ProfilePictures.ProfilePictureLink END AS ProfilePictureLink
        FROM Users
        INNER JOIN Families ON Users.FamilyID = Families.FamilyID
        LEFT JOIN ProfilePictures ON Users.ProfilePictureID = ProfilePictures.PictureID
        WHERE Users.UserID = ?`;
    const data = db.prepare(query).get(req.session.userId);
    res.send(data);
});


app.post('/api/createUser', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const query = `INSERT INTO Users (Username, Password, Email, IsParent, FamilyID) VALUES (?, ?, ?, ?, ?)`;
        const data = db.prepare(query).run(req.body.username, hashedPassword, req.body.mail, req.body.isParent, req.session.familyId);
        res.send({ message: 'Success'});
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error creating user' });
    }
});


app.post('/api/loginUser', async (req, res) => {
    const query = `SELECT UserID, Username, Password, Email, IsParent FROM Users WHERE Username = ?`;

    const data = db.prepare(query).get(req.body.username);

    if (data) {
        const match = await bcrypt.compare(req.body.password, data.Password);
        if (match) {
            req.session.userId = data.UserID;
            req.session.username = data.Username;
            req.session.email = data.Email;
            req.session.password = data.Password;
            req.session.isParent = data.IsParent;
            res.send({ message: 'Success' });
            console.log('Success!')
        } else {
            res.send({ message: 'Incorrect password' });
            console.log('Incorrect password')
        }
    } else {
        res.send({ message: 'User not found' });
        console.log('User not found')
    }

    console.log(req.session)
});


app.put('/api/updateUser', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.Password, saltRounds);

        const query = `UPDATE Users SET Username = ?, Email = ?, Password = ? WHERE UserID = ?`;
        const data = db.prepare(query).run(req.body.Username, req.body.Email, hashedPassword, req.body.UserID);
        res.send({ message: 'Success' });
    } catch (error) {
        res.status(500).send({ message: `Error updating user: ${error.message}` });
    }
});

app.post('/api/testMail', async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.body.Email,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'Testing System',
        to: req.body.Email,
        subject: 'Test mail',
        text: 'This is a test mail'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send({ message: 'Error sending mail' });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ message: 'Email sent' });
        }
    });
});




const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});