




//const express = require("express");
//const fs = require("fs");

/*const app = express();

app.use(express.urlencoded({extended : false}))

app.get("/", (req, res) => {
    res.send("home Page");    
});

app
    .route("/users")
    const dataa = fs.readFile("./MOCK_DATA.json", "utf-8")
    const users = JSON.parse(dataa)
    .get((req, res) => {
        return res.json(users);    
    })
    .post((req, res) => {
        const body = req.body;
        users.push({id: users.length + 1, ...body}); 
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
            return res.json({status: "success", id: users.length});
        });
    });

app
    .route("/users/:id")
    const data = fs.readFile("./MOCK_DATA.json", "utf-8")
    .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);    
    })
    .patch(async (req, res) => {
        try{
            const fname = req.body.first_name;
            const lname = req.body.last_name;
            const mail = req.body.email;
            const mf = req.body.gender;
            const id = Number(req.params.id);

            if(users.find(user => user.id === id)){
                //const data = await fs.readFile("./MOCK_DATA.json", "utf-8");
                const users = JSON.parse(data);
                const user = users.find((user) => user.id === id);
                user.first_name = fname;
                user.last_name = lname;
                user.email = mail;
                user.gender = mf;

                await fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2));
                res.send("user UPDATED sucessfully");
            }else{
                res.send("user doesnt exist");
            }
        }catch(err){
            return res.send("server error");
        }
    })
    .delete(async (req, res) => {
        try{
            const id = Number(req.params.id);
            //const data = await fs.readFile("./MOCK_DATA.json", "utf-8");
            const users = JSON.parse(data);
            const Uusers = users.filter(user => user.id !== id);
            await fs.writeFile("./MOCK_DATA.json", JSON.stringify(Uusers, null, 2));
            res.send("user DELETED sucessfully");
        }catch(err){
            return res.send("server error");
        }
    });



app.listen(8000, () => console.log("server Started at PORT 8000"));*/



const pool = require("./db");
const express = require("express");
const fs = require("fs/promises"); // promise-based fs
const path = require("path");
require("dotenv").config();


const app = express();
app.use(express.json()); // parse JSON bodies


app.use((req, res, next) => {
    console.log("hello from middleware");
    //while setting an custom header as shown below always preceed the name with X to showcase the user or devloper that this header is custom type
    res.setHeader("X-MyName", "NiteenKumar Singh");
    next();
})

// ----------------------
// Home route
app.get("/", (req, res) => {
    res.send("Home Page");
});

// ----------------------
// GET all users
app.get("/users", async (req, res) => {
    try {

        const query = `SELECT * FROM users;`;
        const result = await pool.query(query);
        res.status(200).json({
            message : 'users fetched Succesufully',
            user : result.rows,
         });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// ----------------------
// POST new user
app.post("/users", async (req, res) => {
    try {
        
        const {first_name, last_name, email, gender} = req.body;

        const query = `INSERT INTO users (f_name, l_name, email, gender)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;

        const values = [first_name, last_name, email, gender];
        const result = await pool.query(query, values);
        res.status(201).json({
            message : 'user created Succesufully',
            user : result.rows[0],
         });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// ----------------------
// GET, PATCH, DELETE by ID
app.route("/users/:id")
    // GET user by ID
    .get(async (req, res) => {
        try {
            const id = Number(req.params.id);
            const query = `SELECT * FROM users WHERE id=$1`;
            const result = await pool.query(query, [id]);
            if (result.rows.length === 0) return res.status(404).send("User not found");
            res.json(result.rows[0]);

        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    })
    // PATCH (partial update) user
    .patch(async (req, res) => {
        try {
            const id = Number(req.params.id);

            const query = `SELECT * FROM users WHERE id=$1`;
            const user = await pool.query(query, [id]);

            if (user.rows.length === 0) return res.status(404).send("User not found");

            // Partial update
            const { first_name, last_name, email, gender } = req.body;
            
            const update = `UPDATE users
                            SET
                                f_name = $1,
                                l_name = $2,
                                email = $3,
                                gender = $4
                            WHERE id = $5`;

            const values = [first_name, last_name, email, gender, id];
            await pool.query(update ,values);

            res.send("User updated successfully");
            
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    })
    // DELETE user
    .delete(async (req, res) => {
        try {
            const id = Number(req.params.id);

            const query = `DELETE FROM users WHERE id=$1`;
            await pool.query(query, [id]);

            res.send("User deleted successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    });

// ----------------------
app.listen(8000, () => console.log("Server started on PORT 8000"));



//not fully done lerned how to use postman 









/*async function testDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected at:", res.rows[0]);
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

testDB();*/



