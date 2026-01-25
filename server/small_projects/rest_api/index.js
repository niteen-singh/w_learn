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




const express = require("express");
const fs = require("fs/promises"); // promise-based fs
const path = require("path");

const app = express();
app.use(express.json()); // parse JSON bodies

const DATA_FILE = path.join(__dirname, "MOCK_DATA.json");

// ----------------------
// Helper functions
async function readUsers() {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
}

async function writeUsers(users) {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
}

// ----------------------
// Home route
app.get("/", (req, res) => {
    res.send("Home Page");
});

// ----------------------
// GET all users
app.get("/users", async (req, res) => {
    try {
        const users = await readUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// ----------------------
// POST new user
app.post("/users", async (req, res) => {
    try {
        const users = await readUsers();
        const newUser = { id: users.length + 1, ...req.body };
        users.push(newUser);
        await writeUsers(users);
        res.status(201).json({ status: "success", id: newUser.id });
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
            const users = await readUsers();
            const user = users.find(u => u.id === id);
            if (!user) return res.status(404).send("User not found");
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    })
    // PATCH (partial update) user
    .patch(async (req, res) => {
        try {
            const id = Number(req.params.id);
            const users = await readUsers();
            const user = users.find(u => u.id === id);
            if (!user) return res.status(404).send("User not found");

            // Partial update
            const { first_name, last_name, email, gender } = req.body;
            if (first_name) user.first_name = first_name;
            if (last_name) user.last_name = last_name;
            if (email) user.email = email;
            if (gender) user.gender = gender;

            await writeUsers(users);
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
            let users = await readUsers();
            const initialLength = users.length;

            users = users.filter(u => u.id !== id);

            if (users.length === initialLength) return res.status(404).send("User not found");

            await writeUsers(users);
            res.send("User deleted successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    });

// ----------------------
app.listen(8000, () => console.log("Server started on PORT 8000"));


//not fully done lerned how to use postman 
