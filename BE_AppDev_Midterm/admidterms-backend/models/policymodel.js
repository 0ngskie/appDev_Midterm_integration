class Policy {
    constructor(policy_id, start_date, end_date, policy_status = 'Under review', user_id, plan_id, submittedBy_id, approvedBy_id, policy_type, supporting_document) {
        this.policy_id = policy_id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.policy_status = policy_status; // Enum: 'Approved', 'Under review', 'Rejected'
        this.user_id = user_id; // Foreign key referencing users(user_id)
        this.plan_id = plan_id; // Foreign key referencing plans(plan_id)
        this.submittedBy_id = submittedBy_id; // Foreign key referencing users(user_id)
        this.approvedBy_id = approvedBy_id; // Foreign key referencing users(user_id)
        this.policy_type = policy_type;
        this.supporting_document = supporting_document;
    }
}

module.exports = Policy;
