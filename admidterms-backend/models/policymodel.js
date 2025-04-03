class Policy {
    constructor(policy_id, start_date, end_date, policy_status, user_id, plan_id, submittedBy_id, approvedBy_id) {
        this.policy_id = policy_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.policy_status = policy_status;
        this.user_id = user_id;
        this.plan_id = plan_id;
        this.submittedBy_id = submittedBy_id;
        this.approvedBy_id = approvedBy_id;
    }
}

module.exports = Policy;
