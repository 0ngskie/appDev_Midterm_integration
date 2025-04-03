const db = require("../mysql/mysqlConnection");
const Plans = require("../models/plans");

// Get all plans (with tiers)
exports.getAllPlans = (req, res) => {
    db.query("SELECT * FROM plans", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

// Get a single plan by ID
exports.getPlanById = (req, res) => {
    db.query("SELECT plan_id, plan_name, tier FROM plans WHERE plan_id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Plan not found" });
        res.json(result[0]);
    });
};

// Create a new plan
exports.createPlan = (req, res) => {
    const { plan_name, tier } = req.body;
    
    db.query(
        "INSERT INTO plans (plan_name, tier) VALUES (?, ?)",
        [plan_name, tier],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Plan created", plan_id: result.insertId });
        }
    );
};

// Update an existing plan
exports.updatePlan = (req, res) => {
    const { plan_name, tier } = req.body;
    
    db.query(
        "UPDATE plans SET plan_name = ?, tier = ? WHERE plan_id = ?",
        [plan_name, tier, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Plan not found" });
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