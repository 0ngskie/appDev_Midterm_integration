const User = require("../models/user");
const mysqlConnection = require("../mysql/mysqlConnection");

//Ex. Get All Users
module.exports.getAllUsers = (req, res) => {
    const query = `
        SELECT 
            u.*, 
            p.policy_id, p.start_date, p.end_date, p.policy_status, 
            pl.policy_type, pl.plan_type, pl.policy_overview,
            s.username AS submitted_by, a.username AS approved_by,
            agent.first_name AS agent_first_name,
            agent.last_name AS agent_last_name
        FROM users u
        LEFT JOIN policy p ON u.user_id = p.user_id
        LEFT JOIN plans pl ON p.plan_id = pl.plan_id
        LEFT JOIN users s ON p.submittedBy_id = s.user_id
        LEFT JOIN users a ON p.approvedBy_id = a.user_id
        LEFT JOIN users agent ON u.agent_id = agent.user_id
    `;

    mysqlConnection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching users and policies:", error);
            return res.status(500).json({ error: "Error fetching users and policies" });
        }

        const users = results.reduce((acc, row) => {
            let user = acc.find(u => u.user_id === row.user_id);
            if (!user) {
                user = new User(
                    row.user_id,
                    row.first_name,
                    row.last_name,
                    row.date_of_birth,
                    row.age,
                    row.nationality,
                    row.contact_number,
                    row.email,
                    row.address,
                    row.province,
                    row.city,
                    row.zipcode,
                    row.country,
                    row.username,
                    row.password,
                    row.role,
                    row.agent_id
                );
                user.policies = [];
                user.agent = row.agent_id ? {
                    first_name: row.agent_first_name,
                    last_name: row.agent_last_name
                } : null;
                acc.push(user);
            }

            if (row.policy_id) {
                user.policies.push({
                    policy_id: row.policy_id,
                    start_date: row.start_date,
                    end_date: row.end_date,
                    policy_status: row.policy_status,
                    submitted_by: row.submitted_by,
                    approved_by: row.approved_by,
                    plan: {
                        policy_type: row.policy_type,
                        plan_type: row.plan_type,
                        policy_overview: row.policy_overview
                    }
                });
            }

            return acc;
        }, []);

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