const express = require("express");
const router = express.Router();
const claimsController = require("../controllers/claimsController");

// Routes for claims (CRUD Application)
router.get("/", claimsController.getAllClaims);

router.post("/", claimsController.createClaim);
router.get("/:id", claimsController.getClaim);
router.get("/policy/:policyid", claimsController.getClaimsByPolicy);
router.get("/status/:status", claimsController.getClaimsByStatus);
router.patch("/:id/status", claimsController.updateClaimStatus);
router.put("/:id", claimsController.updateClaim);
router.delete("/:id", claimsController.deleteClaim);

module.exports = router;
