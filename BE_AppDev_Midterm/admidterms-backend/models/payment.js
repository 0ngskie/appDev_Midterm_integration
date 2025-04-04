class Payment {
    constructor(payment_id, payment_frequency, payment_method, amount_due, preferred_due_date, payment_status, policy_id,) {
      this.payment_id = payment_id;
      this.payment_frequency = payment_frequency;
      this.payment_method = payment_method;
      this.amount_due = amount_due;
      this.preferred_due_date = preferred_due_date;
      this.payment_status = payment_status;
      this.policy_id = policy_id;
    }
  }
  
  module.exports = Payment;
  
  