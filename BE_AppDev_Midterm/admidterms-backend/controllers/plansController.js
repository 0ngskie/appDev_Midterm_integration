const db = require("../mysql/mysqlConnection");
const Plans = require("../models/plans");

// Get all plans
exports.getAllPlans = (req, res) => {
    db.query("SELECT * FROM plans", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

// Create a new plan
exports.createPlan = (req, res) => {
    const { plan_id, policy_type, plan_type, policy_overview, coverage_id, coverage_details, key_detail_id, key_benefit } = req.body;
    
    db.query(
        "INSERT INTO plans (plan_id, policy_type, plan_type, policy_overview, coverage_id, coverage_details, key_detail_id, key_benefit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [plan_id, policy_type, plan_type, policy_overview, coverage_id, coverage_details, key_detail_id, key_benefit],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Plan created", plan_id: result.insertId });
        }
    );
};

// Update an existing plan
exports.updatePlan = (req, res) => {
    const { plan_id, policy_type, plan_type, policy_overview, coverage_id, coverage_details, key_detail_id, key_benefit } = req.body;
    
    db.query(
        "UPDATE plans SET plan_id = ?, policy_type = ?, plan_type = ?, policy_overview = ?, coverage_id = ?, coverage_details = ?, key_detail_id = ?, key_benefit = ? WHERE plan_id = ?",
        [plan_id, policy_type, plan_type, policy_overview, coverage_id, coverage_details, key_detail_id, key_benefit, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Plan not found or no changes made" });
            res.json({ message: "Plan updated" });
        }
    );
};

// Delete a plan
exports.deletePlan = (req, res) => {
    db.query("DELETE FROM plans WHERE plan_id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Plan not found" });
        res.json({ message: "Plan deleted" });
    });
};

// Get a single plan by ID
exports.getPlanById = (req, res) => {
    db.query("SELECT * FROM plans WHERE plan_id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Plan not found" });
        res.json(result[0]);
    });
};