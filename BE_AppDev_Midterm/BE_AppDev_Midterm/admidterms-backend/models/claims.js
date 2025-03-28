class Claim {
  constructor(claim_id, claim_date, amount_claimed, status, policy_id) {
    this.claim_id = claim_id;
    this.claim_date = claim_date;
    this.amount_claimed = amount_claimed;
    this.status = status;
    this.policy_id = policy_id;
  }
}

module.exports = Claim;
