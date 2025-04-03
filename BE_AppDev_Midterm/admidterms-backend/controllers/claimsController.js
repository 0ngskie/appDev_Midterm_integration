const Claim = require("../models/claims");
const mysqlConnection = require("../mysql/mysqlConnection");
const sanitize = {
  string: (value) => (typeof value === "string" ? value.trim() : value),
  number: (value) => (isNaN(Number(value)) ? null : Number(value)),
  date: (value) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
  },
  enum: (value, validValues) => (validValues.includes(value) ? value : null),
  phone: (value) =>
    typeof value === "string" ? value.replace(/[^\d+]/g, "") : null,
};

// Check if policy exists
const checkPolicyExists = (policyId, callback) => {
  const query = "SELECT * FROM policy WHERE policy_id = ?";
  mysqlConnection.query(query, [policyId], (error, results) => {
    if (error) {
      console.error("Error checking policy existence:", error);
      return callback(error, null);
    }
    callback(null, results.length > 0);
  });
};

// Check if client exists
const checkClientExists = (clientId, callback) => {
  const query = "SELECT * FROM users WHERE user_id = ? AND role = 'Client'";
  mysqlConnection.query(query, [clientId], (error, results) => {
    if (error) {
      console.error("Error checking client existence:", error);
      return callback(error, null);
    }
    callback(null, results.length > 0);
  });
};

// Check if beneficiary exists
const checkBeneficiaryExists = (beneficiaryId, callback) => {
  if (!beneficiaryId) return callback(null, true); // Optional field
  const query = "SELECT * FROM beneficiaries WHERE beneficiary_id = ?";
  mysqlConnection.query(query, [beneficiaryId], (error, results) => {
    if (error) {
      console.error("Error checking beneficiary existence:", error);
      return callback(error, null);
    }
    callback(null, results.length > 0);
  });
};

// Get All Claims with pagination
exports.getAllClaims = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query =
    "SELECT * FROM claims ORDER BY claim_date DESC LIMIT ? OFFSET ?";
  const countQuery = "SELECT COUNT(*) as total FROM claims";

  mysqlConnection.query(countQuery, (countError, countResults) => {
    if (countError) {
      console.error("Error counting claims:", countError);
      return res.status(500).json({ error: "Error fetching claims" });
    }

    mysqlConnection.query(query, [limit, offset], (error, results) => {
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
            claim.full_name,
            claim.claimant_dob,
            claim.claimant_contact_Number,
            claim.claimant_relationship,
            claim.event_date,
            claim.event_location,
            claim.event_description,
            claim.policy_type,
            claim.required_document,
            claim.supporting_document,
            claim.policy_id,
            claim.client_id,
            claim.beneficiary_id
          )
      );

      res.json({
        data: claims,
        pagination: {
          page,
          limit,
          total: countResults[0].total,
          totalPages: Math.ceil(countResults[0].total / limit),
        },
      });
    });
  });
};

// Create a new claim
exports.createClaim = (req, res) => {
  const sanitized = {
    claim_date: sanitize.date(req.body.claim_date),
    amount_claimed: sanitize.number(req.body.amount_claimed),
    status:
      sanitize.enum(req.body.status, Claim.validStatuses) || "Under Review",
    full_name: sanitize.string(req.body.full_name),
    claimant_dob: sanitize.date(req.body.claimant_dob),
    claimant_contact_Number: sanitize.phone(req.body.claimant_contact_Number),
    claimant_relationship: sanitize.string(req.body.claimant_relationship),
    event_date: sanitize.date(req.body.event_date),
    event_location: sanitize.string(req.body.event_location),
    event_description: sanitize.string(req.body.event_description),
    policy_type: sanitize.enum(req.body.policy_type, [
      "Retirement",
      "Education",
      "Health",
      "Auto",
    ]),
    required_document: sanitize.enum(
      req.body.required_document,
      Claim.requiredDocuments
    ),
    supporting_document: req.body.supporting_document
      ? sanitize.enum(req.body.supporting_document, Claim.supportingDocuments)
      : null,
    policy_id: sanitize.number(req.body.policy_id),
    client_id: sanitize.number(req.body.client_id),
    beneficiary_id: req.body.beneficiary_id
      ? sanitize.number(req.body.beneficiary_id)
      : null,
  };

  // Validate required fields
  const requiredFields = [
    "claim_date",
    "amount_claimed",
    "full_name",
    "claimant_dob",
    "claimant_contact_Number",
    "claimant_relationship",
    "event_date",
    "event_description",
    "policy_type",
    "required_document",
    "policy_id",
    "client_id",
  ];

  const missingFields = requiredFields.filter((field) => !sanitized[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // Validate amount
  if (sanitized.amount_claimed <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number." });
  }

  // Validate dates
  if (new Date(sanitized.event_date) > new Date()) {
    return res
      .status(400)
      .json({ error: "Event date cannot be in the future." });
  }

  // Check all references exist
  checkPolicyExists(sanitized.policy_id, (policyError, policyExists) => {
    if (policyError) {
      return res.status(500).json({ error: "Error checking policy" });
    }
    if (!policyExists) {
      return res.status(404).json({ error: "Policy does not exist" });
    }

    checkClientExists(sanitized.client_id, (clientError, clientExists) => {
      if (clientError) {
        return res.status(500).json({ error: "Error checking client" });
      }
      if (!clientExists) {
        return res.status(404).json({ error: "Client does not exist" });
      }

      checkBeneficiaryExists(
        sanitized.beneficiary_id,
        (beneficiaryError, beneficiaryExists) => {
          if (beneficiaryError) {
            return res
              .status(500)
              .json({ error: "Error checking beneficiary" });
          }
          if (!beneficiaryExists) {
            return res
              .status(404)
              .json({ error: "Beneficiary does not exist" });
          }

          const query = `
          INSERT INTO claims (
            claim_date, amount_claimed, status, full_name, claimant_dob,
            claimant_contact_Number, claimant_relationship, event_date,
            event_location, event_description, policy_type, required_document,
            supporting_document, policy_id, client_id, beneficiary_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

          const values = [
            sanitized.claim_date,
            sanitized.amount_claimed,
            sanitized.status,
            sanitized.full_name,
            sanitized.claimant_dob,
            sanitized.claimant_contact_Number,
            sanitized.claimant_relationship,
            sanitized.event_date,
            sanitized.event_location,
            sanitized.event_description,
            sanitized.policy_type,
            sanitized.required_document,
            sanitized.supporting_document,
            sanitized.policy_id,
            sanitized.client_id,
            sanitized.beneficiary_id,
          ];

          mysqlConnection.query(query, values, (error, results) => {
            if (error) {
              console.error("Error creating claim:", error);
              return res.status(500).json({ error: "Error creating claim" });
            }

            const newClaim = new Claim(
              results.insertId,
              sanitized.claim_date,
              sanitized.amount_claimed,
              sanitized.status,
              sanitized.full_name,
              sanitized.claimant_dob,
              sanitized.claimant_contact_Number,
              sanitized.claimant_relationship,
              sanitized.event_date,
              sanitized.event_location,
              sanitized.event_description,
              sanitized.policy_type,
              sanitized.required_document,
              sanitized.supporting_document,
              sanitized.policy_id,
              sanitized.client_id,
              sanitized.beneficiary_id
            );

            res.status(201).json(newClaim);
          });
        }
      );
    });
  });
};

// Get a claim by ID
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
      results[0].full_name,
      results[0].claimant_dob,
      results[0].claimant_contact_Number,
      results[0].claimant_relationship,
      results[0].event_date,
      results[0].event_location,
      results[0].event_description,
      results[0].policy_type,
      results[0].required_document,
      results[0].supporting_document,
      results[0].policy_id,
      results[0].client_id,
      results[0].beneficiary_id
    );

    res.json(claim);
  });
};

// Get claims by policy ID
exports.getClaimsByPolicy = (req, res) => {
  const { policyid } = req.params;
  if (!policyid || isNaN(parseInt(policyid))) {
    return res.status(400).json({
      error: "Policy ID must be a valid number",
      example: "/policy/123",
    });
  }

  checkPolicyExists(policyid, (error, exists) => {
    if (error) {
      return res.status(500).json({ error: "Error checking policy" });
    }
    if (!exists) {
      return res.status(404).json({ error: "Policy does not exist" });
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
            claim.full_name,
            claim.claimant_dob,
            claim.claimant_contact_Number,
            claim.claimant_relationship,
            claim.event_date,
            claim.event_location,
            claim.event_description,
            claim.policy_type,
            claim.required_document,
            claim.supporting_document,
            claim.policy_id,
            claim.client_id,
            claim.beneficiary_id
          )
      );

      res.json(claims);
    });
  });
};

// Get claims by status
exports.getClaimsByStatus = (req, res) => {
  const { status } = req.params;

  if (!Claim.validStatuses.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Must be one of: ${Claim.validStatuses.join(
        ", "
      )}`,
    });
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
          claim.full_name,
          claim.claimant_dob,
          claim.claimant_contact_Number,
          claim.claimant_relationship,
          claim.event_date,
          claim.event_location,
          claim.event_description,
          claim.policy_type,
          claim.required_document,
          claim.supporting_document,
          claim.policy_id,
          claim.client_id,
          claim.beneficiary_id
        )
    );

    res.json(claims);
  });
};

// Update Claim Status
exports.updateClaimStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Claim.validStatuses.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Must be one of: ${Claim.validStatuses.join(
        ", "
      )}`,
    });
  }

  const query = "UPDATE claims SET status = ? WHERE claim_id = ?";
  mysqlConnection.query(query, [status, id], (error, results) => {
    if (error) {
      console.error("Error updating claim status:", error);
      return res.status(500).json({ error: "Error updating claim status" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.json({ message: "Claim status updated successfully" });
  });
};

// Update Claims
exports.updateClaim = (req, res) => {
  const { id } = req.params;

  // Get the existing claim to check its status
  this.getClaim(
    { params: { id } },
    {
      json: (existingClaim) => {
        if (
          existingClaim.status === "Accepted" ||
          existingClaim.status === "Reject"
        ) {
          return res.status(403).json({
            error:
              "Claims with status 'Accepted' or 'Reject' cannot be modified",
          });
        }

        const updates = {
          claim_date: req.body.claim_date
            ? sanitize.date(req.body.claim_date)
            : undefined,
          amount_claimed: req.body.amount_claimed
            ? sanitize.number(req.body.amount_claimed)
            : undefined,
          status: req.body.status
            ? sanitize.enum(req.body.status, Claim.validStatuses)
            : undefined,
          full_name: req.body.full_name
            ? sanitize.string(req.body.full_name)
            : undefined,
          claimant_dob: req.body.claimant_dob
            ? sanitize.date(req.body.claimant_dob)
            : undefined,
          claimant_contact_Number: req.body.claimant_contact_Number
            ? sanitize.phone(req.body.claimant_contact_Number)
            : undefined,
          claimant_relationship: req.body.claimant_relationship
            ? sanitize.string(req.body.claimant_relationship)
            : undefined,
          event_date: req.body.event_date
            ? sanitize.date(req.body.event_date)
            : undefined,
          event_location: req.body.event_location
            ? sanitize.string(req.body.event_location)
            : undefined,
          event_description: req.body.event_description
            ? sanitize.string(req.body.event_description)
            : undefined,
          policy_type: req.body.policy_type
            ? sanitize.enum(req.body.policy_type, [
                "Retirement",
                "Education",
                "Health",
                "Auto",
              ])
            : undefined,
          required_document: req.body.required_document
            ? sanitize.enum(req.body.required_document, Claim.requiredDocuments)
            : undefined,
          supporting_document: req.body.supporting_document
            ? sanitize.enum(
                req.body.supporting_document,
                Claim.supportingDocuments
              )
            : undefined,
          policy_id: req.body.policy_id
            ? sanitize.number(req.body.policy_id)
            : undefined,
          client_id: req.body.client_id
            ? sanitize.number(req.body.client_id)
            : undefined,
          beneficiary_id: req.body.beneficiary_id
            ? sanitize.number(req.body.beneficiary_id)
            : null,
        };

        // Validate amount if provided
        if (updates.amount_claimed && updates.amount_claimed <= 0) {
          return res
            .status(400)
            .json({ error: "Amount must be a positive number" });
        }

        // Validate dates if provided
        if (updates.event_date && new Date(updates.event_date) > new Date()) {
          return res
            .status(400)
            .json({ error: "Event date cannot be in the future" });
        }

        // Check references if provided
        const checkReferences = (callback) => {
          if (updates.policy_id) {
            checkPolicyExists(updates.policy_id, (error, exists) => {
              if (error) return callback(error);
              if (!exists) return callback(new Error("Policy does not exist"));
              callback(null);
            });
          } else if (updates.client_id) {
            checkClientExists(updates.client_id, (error, exists) => {
              if (error) return callback(error);
              if (!exists) return callback(new Error("Client does not exist"));
              callback(null);
            });
          } else if (updates.beneficiary_id !== undefined) {
            checkBeneficiaryExists(updates.beneficiary_id, (error, exists) => {
              if (error) return callback(error);
              if (!exists)
                return callback(new Error("Beneficiary does not exist"));
              callback(null);
            });
          } else {
            callback(null);
          }
        };

        checkReferences((error) => {
          if (error) {
            return res.status(404).json({ error: error.message });
          }

          const query = `
            UPDATE claims 
            SET 
              claim_date = COALESCE(?, claim_date),
              amount_claimed = COALESCE(?, amount_claimed),
              status = COALESCE(?, status),
              full_name = COALESCE(?, full_name),
              claimant_dob = COALESCE(?, claimant_dob),
              claimant_contact_Number = COALESCE(?, claimant_contact_Number),
              claimant_relationship = COALESCE(?, claimant_relationship),
              event_date = COALESCE(?, event_date),
              event_location = COALESCE(?, event_location),
              event_description = COALESCE(?, event_description),
              policy_type = COALESCE(?, policy_type),
              required_document = COALESCE(?, required_document),
              supporting_document = COALESCE(?, supporting_document),
              policy_id = COALESCE(?, policy_id),
              client_id = COALESCE(?, client_id),
              beneficiary_id = COALESCE(?, beneficiary_id)
            WHERE claim_id = ?
          `;

          const values = [
            updates.claim_date,
            updates.amount_claimed,
            updates.status,
            updates.full_name,
            updates.claimant_dob,
            updates.claimant_contact_Number,
            updates.claimant_relationship,
            updates.event_date,
            updates.event_location,
            updates.event_description,
            updates.policy_type,
            updates.required_document,
            updates.supporting_document,
            updates.policy_id,
            updates.client_id,
            updates.beneficiary_id,
            id,
          ];

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
        });
      },
      status: (code) => ({
        json: (err) => res.status(code).json(err),
      }),
    },
    () => {}
  );
};

// Delete a claim
exports.deleteClaim = (req, res) => {
  const { id } = req.params;

  // Check if claim exists and its status
  this.getClaim(
    { params: { id } },
    {
      json: (existingClaim) => {
        if (existingClaim.status === "Accepted") {
          return res.status(403).json({
            error: "Accepted claims cannot be deleted",
          });
        }

        const query = "DELETE FROM claims WHERE claim_id = ?";
        mysqlConnection.query(query, [id], (error, results) => {
          if (error) {
            console.error("Error deleting claim:", error);
            return res.status(500).json({ error: "Error deleting claim" });
          }
          if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Claim not found" });
          }
          res.json({ message: "Claim deleted successfully" });
        });
      },
      status: (code) => ({
        json: (err) => res.status(code).json(err),
      }),
    },
    () => {}
  );
};
