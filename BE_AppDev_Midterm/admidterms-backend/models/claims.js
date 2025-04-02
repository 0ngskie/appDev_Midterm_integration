class Claim {
  constructor(
    claim_id,
    claim_date,
    amount_claimed,
    status,
    full_name,
    claimant_dob,
    claimant_contact_Number,
    claimant_relationship,
    event_date,
    event_location,
    event_description,
    policy_type,
    required_document,
    supporting_document,
    policy_id,
    client_id,
    beneficiary_id
  ) {
    this.claim_id = claim_id;
    this.claim_date = claim_date;
    this.amount_claimed = amount_claimed;
    this.status = status;
    this.full_name = full_name;
    this.claimant_dob = claimant_dob;
    this.claimant_contact_Number = claimant_contact_Number;
    this.claimant_relationship = claimant_relationship;
    this.event_date - event_date;
    this.event_location = event_location;
    this.event_description = event_description;
    this.policy_type = policy_type;
    this.required_document = required_document;
    this.supporting_document = supporting_document;
    this.client_id = client_id;
    this.beneficiary_id = beneficiary_id;
    this.policy_id = policy_id;
  }

  static get validStatuses() {
    return ["Accepted", "Reject", "Under Review"];
  }

  static get requiredDocuments() {
    return ["Valid Government ID", "Copy of Policy Contract"];
  }

  static get supportingDocuments() {
    return [
      "Official Receipt / Billing statement",
      "Medical or Hospital Records",
      "Police or Incident Reports",
      "Certificate of Retiremen or Age Verification",
      "School Registration or Proof of Enrollment",
    ];
  }
}

module.exports = Claim;
