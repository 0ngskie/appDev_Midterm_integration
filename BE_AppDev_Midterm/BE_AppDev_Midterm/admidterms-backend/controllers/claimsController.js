const Claim = require("../models/claims");
const mysqlConnection = require("../mysql/mysqlConnection");

//Get All Claims
exports.getAllClaims = (req, res) => {
  const query = "SELECT * FROM claims ORDER BY claim_date DESC";

  mysqlConnection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching claims:", error);
      return res.status(500).json({ error: "Error fetching claims" });
    }

    const claims = results.map(
      (claim) =>
        new Claim(
          claim.claim_id,
          claim.claim_date,
          claim.amount_claimed,
          claim.status,
          claim.policy_id
        )
    );
    res.json(claims);
  });
};

//Create a new claim
exports.createClaim = (req, res) => {
  const { claim_date, amount_claimed, status, policy_id } = req.body;

  const query =
    "INSERT INTO claims (claim_date, amount_claimed, status, policy_id) VALUES (?, ?, ?, ?)";
  const values = [claim_date, amount_claimed, status, policy_id];

  mysqlConnection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error creating claim:", error);
      return res.status(500).json({ error: "Error creating claim" });
    }

    const newClaim = new Claim(
      results.insertId,
      claim_date,
      amount_claimed,
      status,
      policy_id
    );
    res.status(201).json(newClaim);
  });
};

//Get a claim by ID
exports.getClaim = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM claims WHERE claim_id = ?";

  mysqlConnection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching claim:", error);
      return res.status(500).json({ error: "Error fetching claim" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Claim not found" });
    }

    const claim = new Claim(
      results[0].claim_id,
      results[0].claim_date,
      results[0].amount_claimed,
      results[0].status,
      results[0].policy_id
    );
    res.json(claim);
  });
};

//Get claims by policy ID
exports.getClaimsByPolicy = (req, res) => {
  const { policyid } = req.params;
  if (isNaN(policyid)) {
    return res.status(400).json({ error: "Policy ID must be a number" });
  }

  const query =
    "SELECT * FROM claims WHERE policy_id = ? ORDER BY claim_date DESC";
  mysqlConnection.query(query, [policyid], (error, results) => {
    if (error) {
      console.error("Error fetching claims:", error);
      return res.status(500).json({ error: "Error fetching claims" });
    }
    const claims = results.map(
      (claim) =>
        new Claim(
          claim.claim_id,
          claim.claim_date,
          claim.amount_claimed,
          claim.status,
          claim.policy_id
        )
    );
    res.json(claims);
  });
};

//Get claims by status
exports.getClaimsByStatus = (req, res) => {
  const { status } = req.params;
  const allowedStatuses = ["Claimed", "Unclaimed"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const query =
    "SELECT * FROM claims WHERE status = ? ORDER BY claim_date DESC";
  mysqlConnection.query(query, [status], (error, results) => {
    if (error) {
      console.error("Error fetching claims:", error);
      return res.status(500).json({ error: "Error fetching claims" });
    }

    const claims = results.map(
      (claim) =>
        new Claim(
          claim.claim_id,
          claim.claim_date,
          claim.amount_claimed,
          claim.status,
          claim.policy_id
        )
    );
    res.json(claims);
  });
};

//Update claims
exports.updateClaim = (req, res) => {
  const { id } = req.params;
  const { claim_date, amount_claimed, status, policy_id } = req.body;

  const query =
    "UPDATE claims SET claim_date = ?, amount_claimed = ?, status = ?, policy_id = ? WHERE claim_id = ?";
  const values = [claim_date, amount_claimed, status, policy_id, id];

  mysqlConnection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating claim:", error);
      return res.status(500).json({ error: "Error updating claim" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Claim not found" });
    }
    res.json({ message: "Claim updated successfully" });
  });
};

// Delete a claim
exports.deleteClaim = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM claims WHERE claim_id = ?";

  mysqlConnection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error deleting claim:", error);
      return res.status(500).json({ error: "Error deleting claim" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Claim not found" });
    }
    res.json({ message: "Claim deleted" });
  });
};
