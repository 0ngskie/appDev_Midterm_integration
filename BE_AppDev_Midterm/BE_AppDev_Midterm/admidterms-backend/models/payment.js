class Payment {
    constructor(payment_id, payment_date, amount_paid, status, policy_id) {
        this.payment_id = payment_id;
        this.payment_date = payment_date;
        this.amount_paid = amount_paid;
        this.status = status;
        this.policy_id = policy_id;
    }
}

module.exports = Payment;
