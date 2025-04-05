const express = require("express");
const router = express.Router();
const claimsController = require("../controllers/claimsController");

// Routes for claims (CRUD Application)
router.get("/claims", claimsController.getAllClaims);

router.post("/claims", claimsController.createClaim);
router.get("/claims/:id", claimsController.getClaim);
router.get("/claims/policy/:policyid", claimsController.getClaimsByPolicy);
router.get("/claims/status/:status", claimsController.getClaimsByStatus);
router.patch("/claims/:id/status", claimsController.updateClaimStatus);
router.put("/claims/:id", claimsController.updateClaim);
router.delete("/claims/:id", claimsController.deleteClaim);

module.exports = router;
