//methods shortcut 
const express = require("express");
const router = express.Router();
const plansController = require("../controllers/plansController");

// Define CRUD routes
router.get("/", plansController.getAllPlans);
router.post("/createPlan", plansController.createPlan);
router.put("/updatePlan", plansController.updatePlan);
router.delete("/deletePlan", plansController.deletePlan);
router.get("/:id", plansController.getPlanById);

module.exports = router;
