//methods shortcut 
const express = require("express");
const router = express.Router();
const plansController = require("../controllers/plansController");

// Define CRUD routes
router.get("/plans", plansController.getAllPlans);
router.post("/plans/createPlan", plansController.createPlan);
router.put("/plans/updatePlan", plansController.updatePlan);
router.delete("/plans/deletePlan", plansController.deletePlan);
router.get("/plans/:id", plansController.getPlanById);

module.exports = router;
