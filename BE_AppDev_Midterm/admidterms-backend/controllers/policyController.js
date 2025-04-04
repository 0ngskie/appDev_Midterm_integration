const Policy = require("../models/policymodel");
const mysqlConnection = require("../mysql/mysqlConnection");

// Create Policy
module.exports.createPolicy = (req, res) => {
    const {
        start_date,
        end_date,
        policy_status = "Under review", // Default value
        user_id,
        plan_id,
        submittedBy_id,
        approvedBy_id,
        policy_type,
        supporting_document,
    } = req.body;

    // Validate required fields
    if (!start_date || !end_date || !user_id || !plan_id || !policy_type || !supporting_document) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure supporting_documents is an array
    if (!Array.isArray(supporting_document)) {
        return res.status(400).json({ error: "Supporting documents must be an array" });
    }

    // Validate the number of supporting documents
    if (supporting_document.length > 3) {
        return res.status(400).json({ error: "You can select up to three supporting documents only" });
    }

    // Define allowed supporting documents based on policy type
    const allowedDocuments = {
        "Auto Insurance": ["Valid government ID", "Vehicle info"],
        "Education Plan": ["Valid government ID", "Birth certificate", "School documents"],
        "Health Insurance": ["Valid government ID", "Health declaration form"],
        "Retirement Plan": ["Valid government ID", "Proof of income"],
    };

    // Check if the policy_type is valid
    if (!allowedDocuments[policy_type]) {
        return res.status(400).json({ error: `Invalid policy type: ${policy_type}` });
    }

    // Validate each supporting document
    for (const document of supporting_document) {
        if (!allowedDocuments[policy_type].includes(document)) {
            return res.status(400).json({
                error: `Invalid supporting document for ${policy_type}. Allowed documents: ${allowedDocuments[policy_type].join(", ")}`,
            });
        }
    }

    // Convert the array of supporting documents to a comma-separated string for storage
    const supportingDocumentString = supporting_document.join(", ");

    const query = `
        INSERT INTO policy (
            start_date, end_date, policy_status, user_id, plan_id, 
            submittedBy_id, approvedBy_id, policy_type, supporting_document
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    mysqlConnection.query(
        query,
        [
            start_date,
            end_date,
            policy_status,
            user_id,
            plan_id,
            submittedBy_id || null,
            approvedBy_id || null,
            policy_type,
            supportingDocumentString || null,
        ],
        (error, results) => {
            if (error) {
                console.error("Error creating policy:", error);
                return res.status(500).json({ error: "Error creating policy" });
            }
            res.status(201).json({ message: "Policy created successfully", policy_id: results.insertId });
        }
    );
};

// Get All Policies
module.exports.getAllPolicies = (req, res) => {
    const query = `
        SELECT 
            policy_id, start_date, end_date, policy_status, 
            user_id, plan_id, submittedBy_id, approvedBy_id, 
            policy_type, supporting_document
        FROM policy
    `;

    mysqlConnection.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching policies:", error);
            return res.status(500).json({ error: "Error fetching policies" });
        }

        const policies = results.map(row => new Policy(
            row.policy_id,
            row.start_date,
            row.end_date,
            row.policy_status,
            row.user_id,
            row.plan_id,
            row.submittedBy_id,
            row.approvedBy_id,
            row.policy_type,
            row.supporting_document
        ));

        res.json(policies);
    });
};

// Get Policy by ID
module.exports.getPolicyById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            policy_id, start_date, end_date, policy_status, 
            user_id, plan_id, submittedBy_id, approvedBy_id, 
            policy_type, supporting_documents
        FROM policy 
        WHERE policy_id = ?
    `;
    mysqlConnection.query(query, [id], (error, results) => {
        if (error) {
            console.error("Error fetching policy:", error);
            return res.status(500).json({ error: "Error fetching policy" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Policy not found" });
        }
        const policy = new Policy(
            results[0].policy_id,
            results[0].start_date,
            results[0].end_date,
            results[0].policy_status,
            results[0].user_id,
            results[0].plan_id,
            results[0].submittedBy_id,
            results[0].approvedBy_id,
            results[0].policy_type,
            results[0].supporting_documents
        );
        res.json(policy);
    });
};

// Update Policy
module.exports.updatePolicy = (req, res) => {
    const { id } = req.params;
    const {
        start_date,
        end_date,
        policy_status,
        user_id,
        plan_id,
        submittedBy_id,
        approvedBy_id,
        policy_type,
        supporting_document,
    } = req.body;

    // Validate required fields
    if (!start_date || !end_date || !user_id || !plan_id || !policy_type) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `
        UPDATE policy 
        SET start_date = ?, end_date = ?, policy_status = ?, 
            user_id = ?, plan_id = ?, submittedBy_id = ?, 
            approvedBy_id = ?, policy_type = ?, supporting_document = ? 
        WHERE policy_id = ?
    `;
    mysqlConnection.query(
        query,
        [
            start_date,
            end_date,
            policy_status,
            user_id,
            plan_id,
            submittedBy_id || null,
            approvedBy_id || null,
            policy_type,
            supporting_document || null,
            id,
        ],
        (error, results) => {
            if (error) {
                console.error("Error updating policy:", error);
                return res.status(500).json({ error: "Error updating policy" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "Policy not found" });
            }
            res.json({ message: "Policy updated successfully" });
        }
    );
};

// Delete Policy
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