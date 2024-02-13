const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('better-sqlite3', { verbose: console.log })

const db = new sqlite3('./database/data.db')



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



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});