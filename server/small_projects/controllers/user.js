const pool = require("../db");

async function handleGetAllUsers(req, res) {
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
}

async function handlePostNewUser(req, res) {
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
}

async function handleGetUserById(req, res) {
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
    }

async function handleUpdateUserById(req, res) {
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
    }

async function handleDelUserById(req, res) {
        try {
            const id = Number(req.params.id);

            const query = `DELETE FROM users WHERE id=$1`;
            await pool.query(query, [id]);

            res.send("User deleted successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    }

module.exports = {
    handleGetAllUsers,
    handlePostNewUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDelUserById
};