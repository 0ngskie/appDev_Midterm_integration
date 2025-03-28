//methods shortcut 
const express = require("express");
const router = express.Router();
const plansController = require("../controllers/plansController");

// Define CRUD routes
router.get("/", plansController.getAllPlans);
router.get("/:id", plansController.getPlanById);
router.post("/", plansController.createPlan);
router.put("/:id", plansController.updatePlan);
router.delete("/:id", plansController.deletePlan);

module.exports = router;
