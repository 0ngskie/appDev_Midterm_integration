class Policy {
    constructor(policy_id, description, policy_type, start_date, end_date, user_id, plan_id) {
        this.policy_id = policy_id;
        this.description = description;
        this.policy_type = policy_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.user_id = user_id;
        this.plan_id = plan_id;
    }
}

module.exports = Policy;
