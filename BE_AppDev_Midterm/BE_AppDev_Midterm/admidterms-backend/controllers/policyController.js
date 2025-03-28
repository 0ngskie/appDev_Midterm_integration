const mysqlConnection = require("../mysql/mysqlConnection");

// Create y
module.exports.createPolicy = (req, res) => {
    const { description, policy_type, start_date, end_date, user_id, plan_id } = req.body;
    const query = "INSERT INTO policy (description, policy_type, start_date, end_date, user_id, plan_id) VALUES (?, ?, ?, ?, ?, ?)";
    mysqlConnection.query(query, [description, policy_type, start_date, end_date, user_id, plan_id], (error, results) => {
        if (error) {
            console.error("Error creating policy:", error);
            return res.status(500).json({ error: "Error creating policy" });
        }
        res.status(201).json({ message: "Policy created successfully", policy_id: results.insertId });
    });
};

// Read no
module.exports.getAllPolicies = (req, res) => {
    const query = "SELECT * FROM policy";
    mysqlConnection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching policies:", error);
            return res.status(500).json({ error: "Error fetching policies" });
        }
        res.json(results);
    });
};

// Read singel
module.exports.getPolicyById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM policy WHERE policy_id = ?";
    mysqlConnection.query(query, [id], (error, results) => {
        if (error) {
            console.error("Error fetching policy:", error);
            return res.status(500).json({ error: "Error fetching policy" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Policy not found" });
        }
        res.json(results[0]);
    });
};

// Update  
module.exports.updatePolicy = (req, res) => {
    const { id } = req.params;
    const { description, policy_type, start_date, end_date, user_id, plan_id } = req.body;
    const query = "UPDATE policy SET description = ?, policy_type = ?, start_date = ?, end_date = ?, user_id = ?, plan_id = ? WHERE policy_id = ?";
    mysqlConnection.query(query, [description, policy_type, start_date, end_date, user_id, plan_id, id], (error, results) => {
        if (error) {
            console.error("Error updating policy:", error);
            return res.status(500).json({ error: "Error updating policy" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Policy not found" });
        }
        res.json({ message: "Policy updated successfully" });
    });
};

// Delet 
module.exports.deletePolicy = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM policy WHERE policy_id = ?";
    mysqlConnection.query(query, [id], (error, results) => {
        if (error) {
            console.error("Error deleting policy:", error);
            return res.status(500).json({ error: "Error deleting policy" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Policy not found" });
        }
        res.json({ message: "Policy deleted successfully" });
    });
};