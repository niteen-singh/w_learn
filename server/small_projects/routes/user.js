const express = require("express");
const pool = require("../db");
const {handleGetAllUsers, handlePostNewUser, handleGetUserById, handleUpdateUserById, handleDelUserById} = require("../controllers/user");
const router = express.Router();


router.route("/")
    .get(handleGetAllUsers)// GET all users
    .post(handlePostNewUser);// POST new user

// GET, PATCH, DELETE by ID
router.route("/:id")  
    .get(handleGetUserById)// GET user by ID   
    .patch(handleUpdateUserById)// PATCH (partial update) user
    .delete(handleDelUserById);// DELETE user


module.exports = router;