class Payment {
    constructor(payment_id, payment_frequency, payment_due_date, payment_method, payment_status, policy_id, amount_due) {
      this.payment_id = payment_id;
      this.payment_frequency = payment_frequency;
      this.payment_due_date = payment_due_date;
      this.payment_method = payment_method;
      this.payment_status = payment_status;
      this.policy_id = policy_id;
      this.amount_due = amount_due;
    }
  }
  
  module.exports = Payment;
  
  