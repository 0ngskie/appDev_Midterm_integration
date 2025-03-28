const User = require("../models/user");
const mysqlConnection = require("../mysql/mysqlConnection");

//Ex. Get All Users
module.exports.getAllUsers = (req, res) => {

    const query = "SELECT * FROM users";

    mysqlConnection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Error fetching users" });
        }

        // Map results to User.
        const users = results.map(user => new User(
            user.user_id,
            user.firstName,
            user.lastName,
            user.dateOfBirth,
            user.age,
            user.nationality,
            user.phonenumber,
            user.email,
            user.address,
            user.province,
            user.city,
            user.zipcode,
            user.country,
            user.username,
            user.password,
            user.role
        ));

        res.json(users);
    });
};

// BASIC CRUD

//Get User by ID
module.exports.getUser = (req, res) => {

    const { user_id } = req.params;

    const query = "SELECT * FROM users WHERE user_id = ?";

    mysqlConnection.query(query, user_id, (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Error fetching users" });
        }

        // Map results to User.
        const users = results.map(user => new User(
            user.user_id,
            user.firstName,
            user.lastName,
            user.dateOfBirth,
            user.age,
            user.nationality,
            user.phonenumber,
            user.email,
            user.address,
            user.province,
            user.city,
            user.zipcode,
            user.country,
            user.username,
            user.password,
            user.role
        ));

        res.json(users);
    });
};

//Create
module.exports.createUser = (req, res) => {
    const { 
        firstName, 
        lastName, 
        dateOfBirth, 
        age, 
        nationality, 
        phonenumber, 
        email, 
        address, 
        province, 
        city, 
        zipcode, 
        country, 
        username, 
        password, 
        role 
    } = req.body;

    //Username and Email Validation
    const checkQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
    mysqlConnection.query(checkQuery, [username, email], (error, results) => {
        if (error) {
            console.error("Error checking existing user:", error);
            return res.status(500).json({ error: "Error checking existing user" });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "Username or Email already exists" });
        }

        //Age Validation
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
            calculatedAge--;
        }

        if (calculatedAge < 18 || age < 18) {
            return res.status(403).json({ error: "User must be at least 18 years old" });
        }

        const query = "INSERT INTO users (firstName, lastName, dateOfBirth, age, nationality, phonenumber, email, address, province, city, zipcode, country, username, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            firstName,
            lastName,
            dateOfBirth,
            age,
            nationality,
            phonenumber,
            email,
            address,
            province,
            city,
            zipcode,
            country,
            username,
            password,
            role
        ];

        mysqlConnection.query(query, values, (error, results) => {
            if (error) {
                console.error("Error creating user:", error);
                return res.status(500).json({ error: "Error creating user" });
            }

            res.status(201).json({ 
                message: "User created successfully", 
                user_id: results.insertId 
            });
        });
    });
};

//Update
module.exports.updateUser = (req, res) => {

    const { user_id } = req.params;

    const { 
        firstName, 
        lastName, 
        dateOfBirth, 
        age, 
        nationality, 
        phonenumber, 
        email, 
        address, 
        province, 
        city, 
        zipcode, 
        country, 
        username, 
        password, 
        role 
    } = req.body;

    const query = "UPDATE users SET firstName = ?, lastName = ?, dateOfBirth = ?, age = ?, nationality = ?, phonenumber = ?, email = ?, address = ?, province = ?, city = ?, zipcode = ?, country = ?, username = ?, password = ?, role = ? WHERE user_id = ?";

    const values = [
        firstName,
        lastName,
        dateOfBirth,
        age,
        nationality,
        phonenumber,
        email,
        address,
        province,
        city,
        zipcode,
        country,
        username,
        password,
        role,
        user_id
    ];

    mysqlConnection.query(query, values, (error, results) => {
        if (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ error: "Error updating user" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully"});
    });
};

//Update Password
module.exports.updatePassword = (req, res) => {
    const { user_id } = req.params;
    const { password } = req.body;

    const query = "UPDATE users SET password = ? WHERE user_id = ?";
    mysqlConnection.query(query, [password, user_id], (error, results) => {
        if (error) {
            console.error("Error updating password:", error);
            return res.status(500).json({ error: "Error updating password" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Password updated successfully" });
    });
};

//Login
module.exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const query = "SELECT * FROM users WHERE username = ?";
    mysqlConnection.query(query, [username], (error, results) => {
        if (error) {
            console.error("Error checking user:", error);
            return res.status(500).json({ error: "Error checking user" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = results[0];
        if (user.password === password) {
            // Create a simple token (in production, use JWT or similar)
            const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
            
            res.json({
                message: "Login successful",
                user_id: user.user_id,
                username: user.username,
                role: user.role,
                token: token
            });
        } else {
            res.status(401).json({ error: "Invalid username or password" });
        }
    });
};

//Delete
module.exports.deleteUser = (req, res) => {

    const { user_id } = req.params;

    const query = "DELETE FROM users WHERE user_id = ?";

    mysqlConnection.query(query, user_id, (error, results) => {
        if (error) {
            console.error("Error deleting user:", error);
            return res.status(500).json({ error: "Error deleting user" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    });
};