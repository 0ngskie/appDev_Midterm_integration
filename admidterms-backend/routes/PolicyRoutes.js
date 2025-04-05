const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policyController");

// Create a new policy includes submittedBy_id and approvedBy_id
router.post("/policy", policyController.createPolicy);

// Get all includes submittedBy_id and approvedBy_id
router.get("/policy", policyController.getAllPolicies);

// grabs single policy
router.get("/policy/:id", policyController.getPolicyById);

// Update includes submittedBy_id and approvedBy_id
router.put("/policy/:id", policyController.updatePolicy);

// Delete 
router.delete("/policy/:id", policyController.deletePolicy);

module.exports = router;