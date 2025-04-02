
class Plans {
    constructor(plan_id, policy_type, plan_type, policy_overview, coverage_id, coverage_details, key_detail_id, key_benefit) {
        this.plan_id = plan_id;
        this.policy_type = policy_type;
        this.plan_type = plan_type;
        this.policy_overview = policy_overview;
        this.coverage_id = coverage_id;
        this.coverage_details = coverage_details;
        this.key_detail_id = key_detail_id;
        this.key_benefit = key_benefit;
    }
}

module.exports = Plans;

//March 31 - April 1, 2025 Update Details:
//1. Modified everything to accomodate the new database scheme for plans