const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policyController");

// Create a new policy includes submittedBy_id and approvedBy_id
router.post("/", policyController.createPolicy);

// Get all includes submittedBy_id and approvedBy_id
router.get("/", policyController.getAllPolicies);

// grabs single policy
router.get("/:id", policyController.getPolicyById);

// Update includes submittedBy_id and approvedBy_id
router.put("/:id", policyController.updatePolicy);

// Delete 
router.delete("/:id", policyController.deletePolicy);

module.exports = router;