const User = require("../models/user");
const mysqlConnection = require("../mysql/mysqlConnection");

//Ex. Get All Users
module.exports.getAllUsers = (req, res) => {
    // Simplified query that only fetches users without joining with non-existent tables
    const query = `
        SELECT * FROM users
    `;

    mysqlConnection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Error fetching users" });
        }

        const users = results.map(row => {
            return {
                user_id: row.user_id,
                first_name: row.first_name,
                last_name: row.last_name,
                date_of_birth: row.date_of_birth,
                age: row.age,
                nationality: row.nationality,
                contact_number: row.contact_number,
                email: row.email,
                address: row.address,
                province: row.province,
                city: row.city,
                zipcode: row.zipcode,
                country: row.country,
                username: row.username,
                role: row.role,
                agent_id: row.agent_id
            };
        });

        res.json(users);
    });
};

// Create a new user
module.exports.createUser = (req, res) => {
    const {
        first_name,
        last_name,
        date_of_birth,
        age,
        nationality,
        contact_number,
        email,
        address,
        province,
        city,
        zipcode,
        country,
        username,
        password,
        role,
        agent_id
    } = req.body;

    const query = `
        INSERT INTO users (
            first_name, last_name, date_of_birth, age, nationality,
            contact_number, email, address, province, city,
            zipcode, country, username, password, role, agent_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        first_name, last_name, date_of_birth, age, nationality,
        contact_number, email, address, province, city,
        zipcode, country, username, password, role, agent_id
    ];

    mysqlConnection.query(query, values, (error, results) => {
        if (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ error: "Error creating user" });
        }

        const newUser = new User(
            results.insertId,
            first_name,
            last_name,
            date_of_birth,
            age,
            nationality,
            contact_number,
            email,
            address,
            province,
            city,
            zipcode,
            country,
            username,
            password,
            role,
            agent_id
        );

        res.status(201).json(newUser);
    });
};

// Login user
module.exports.login = (req, res) => {
    const { username, password } = req.body;

    const query = `
        SELECT * FROM users 
        WHERE username = ? AND password = ?
    `;

    mysqlConnection.query(query, [username, password], (error, results) => {
        if (error) {
            console.error("Error during login:", error);
            return res.status(500).json({ error: "Error during login" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = results[0];
        // Don't send password back to client
        delete user.password;
        
        res.json({
            message: "Login successful",
            user: user
        });
    });
};

// Get a single user by ID
module.exports.getUserById = (req, res) => {
    const userId = req.params.id;

    const query = `
        SELECT 
            u.*,
            agent.first_name AS agent_first_name,
            agent.last_name AS agent_last_name
        FROM users u
        LEFT JOIN users agent ON u.agent_id = agent.user_id
        WHERE u.user_id = ?
    `;

    mysqlConnection.query(query, [userId], (error, results) => {
        if (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ error: "Error fetching user" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];
        // Format the response
        const formattedUser = {
            user_id: user.user_id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            date_of_birth: user.date_of_birth,
            email: user.email,
            contact_number: user.contact_number,
            agent_id: user.agent_id,
            agent_name: user.agent_first_name && user.agent_last_name 
                ? `${user.agent_first_name} ${user.agent_last_name}`
                : null
        };

        res.json(formattedUser);
    });
};

// Update user profile
module.exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const {
        first_name,
        last_name,
        date_of_birth,
        email,
        contact_number
    } = req.body;

    const query = `
        UPDATE users 
        SET first_name = ?,
            last_name = ?,
            date_of_birth = ?,
            email = ?,
            contact_number = ?
        WHERE user_id = ?
    `;

    const values = [
        first_name,
        last_name,
        date_of_birth,
        email,
        contact_number,
        userId
    ];

    mysqlConnection.query(query, values, (error, results) => {
        if (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ error: "Error updating user" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch the updated user data
        const fetchQuery = `
            SELECT 
                u.*,
                agent.first_name AS agent_first_name,
                agent.last_name AS agent_last_name
            FROM users u
            LEFT JOIN users agent ON u.agent_id = agent.user_id
            WHERE u.user_id = ?
        `;

        mysqlConnection.query(fetchQuery, [userId], (fetchError, fetchResults) => {
            if (fetchError) {
                console.error("Error fetching updated user:", fetchError);
                return res.status(500).json({ error: "Error fetching updated user" });
            }

            const user = fetchResults[0];
            const formattedUser = {
                user_id: user.user_id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                date_of_birth: user.date_of_birth,
                email: user.email,
                contact_number: user.contact_number,
                agent_id: user.agent_id,
                agent_name: user.agent_first_name && user.agent_last_name 
                    ? `${user.agent_first_name} ${user.agent_last_name}`
                    : null
            };

            res.json(formattedUser);
        });
    });
};

// Update user password
module.exports.updatePassword = (req, res) => {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Current password and new password are required" });
    }

    // First verify the current password
    const verifyQuery = `
        SELECT password FROM users 
        WHERE user_id = ?
    `;

    mysqlConnection.query(verifyQuery, [userId], (verifyError, verifyResults) => {
        if (verifyError) {
            console.error("Error verifying password:", verifyError);
            return res.status(500).json({ error: "Error verifying password" });
        }

        if (verifyResults.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const storedPassword = verifyResults[0].password;
        if (storedPassword !== currentPassword) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }

        // Update the password
        const updateQuery = `
            UPDATE users 
            SET password = ?
            WHERE user_id = ?
        `;

        mysqlConnection.query(updateQuery, [newPassword, userId], (updateError, updateResults) => {
            if (updateError) {
                console.error("Error updating password:", updateError);
                return res.status(500).json({ error: "Error updating password" });
            }

            if (updateResults.affectedRows === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json({ message: "Password updated successfully" });
        });
    });
};

// Verify user information
module.exports.verifyUser = (req, res) => {
    const { name, birthdate, nationality, email } = req.body;

    // Split the full name into parts
    const nameParts = name.split(' ');
    
    let first_name, last_name;
    
    if (nameParts.length >= 3) {
        // For names with middle names, try both full first name and first word
        first_name = nameParts[0]; // "Miguel"
        const possible_compound_first_name = nameParts.slice(0, -1).join(' '); // "Miguel Louis"
        last_name = nameParts[nameParts.length - 1]; // "Carandang"

        const query = `
            SELECT * FROM users 
            WHERE (first_name = ? OR first_name = ?)
            AND last_name = ? 
            AND date_of_birth = ? 
            AND nationality = ? 
            AND email = ?
        `;

        mysqlConnection.query(query, [first_name, possible_compound_first_name, last_name, birthdate, nationality, email], (error, results) => {
            if (error) {
                console.error("Error verifying user:", error);
                return res.status(500).json({ 
                    success: false,
                    message: "Error verifying user information" 
                });
            }

            if (results.length === 0) {
                return res.status(404).json({ 
                    success: false,
                    message: "No matching user found with the provided information" 
                });
            }

            // User found, verification successful
            res.json({
                success: true,
                message: "User verified successfully"
            });
        });
    } else {
        // For simple two-part names
        first_name = nameParts[0];
        last_name = nameParts[1] || '';

        const query = `
            SELECT * FROM users 
            WHERE first_name = ? 
            AND last_name = ? 
            AND date_of_birth = ? 
            AND nationality = ? 
            AND email = ?
        `;

        mysqlConnection.query(query, [first_name, last_name, birthdate, nationality, email], (error, results) => {
            if (error) {
                console.error("Error verifying user:", error);
                return res.status(500).json({ 
                    success: false,
                    message: "Error verifying user information" 
                });
            }

            if (results.length === 0) {
                return res.status(404).json({ 
                    success: false,
                    message: "No matching user found with the provided information" 
                });
            }

            // User found, verification successful
            res.json({
                success: true,
                message: "User verified successfully"
            });
        });
    }
};