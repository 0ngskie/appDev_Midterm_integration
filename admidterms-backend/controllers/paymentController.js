const db = require('../mysql/mysqlConnection');
const Payment = require('../models/payment');

// Get all payments
exports.getAllPayments = (req, res) => {
    const sql = `SELECT * FROM payments ORDER BY payment_due_date DESC`;
    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error when fetching payments' });
        }
        return res.status(200).json({ count: results.length, payments: results });
    });
};

// Create a new payment
exports.createPayment = (req, res) => {
    console.log("Request received:", req.body);

    const { payment_frequency, preferred_due_date, payment_method, payment_due_date, policy_id } = req.body;

    const planQuery = `
        SELECT p.policy_type, p.plan_type
        FROM policy po
        JOIN plans p ON po.plan_id = p.plan_id
        WHERE po.policy_id = ?
    `;

    db.query(planQuery, [policy_id], (err, results) => {
        if (err) {
            console.error("Error fetching policy plan:", err);
            return res.status(500).json({ error: "Database error fetching policy plan" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Policy not found" });
        }

        const { policy_type, plan_type } = results[0];

        const priceList = {
            "Retirement": { "Basic": 2000, "Standard": 3800, "Premium": 7000 },
            "Education": { "Basic": 7200, "Standard": 2000, "Premium": 3500 },
            "Health": { "Basic": 1000, "Standard": 2200, "Premium": 4500 },
            "Auto": { "Basic": 900, "Standard": 1500, "Premium": 2800 }
        };

        let amountDue = priceList[policy_type]?.[plan_type] || 0;
        if (amountDue === 0) {
            return res.status(400).json({ error: "Invalid policy type or plan type" });
        }

        const today = new Date();
        const dueDate = new Date(payment_due_date);
        let paymentStatus = 'Pending';

        if (dueDate < today) {
            // Calculate months overdue
            const monthsLate = 
                (today.getFullYear() - dueDate.getFullYear()) * 12 + 
                (today.getMonth() - dueDate.getMonth());
            
            // Apply penalty based on how many months overdue
            // 10% penalty per month overdue, capped at 100% (double the original amount)
            const penaltyRate = Math.min(monthsLate * 0.1, 1.0);
            const penaltyAmount = amountDue * penaltyRate;
            
            // Add penalty to the original amount
            amountDue += penaltyAmount;
            
            paymentStatus = 'Over Due';
            
            console.log(`Payment overdue by ${monthsLate} months. Applied penalty rate of ${penaltyRate * 100}%`);
        }

        const sql = `
        INSERT INTO payments 
        (payment_frequency, preferred_due_date, payment_method, amount_due, payment_due_date, payment_status, policy_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [payment_frequency, preferred_due_date, payment_method, amountDue, payment_due_date, paymentStatus, policy_id],
            (err, insertResult) => {
                if (err) {
                    console.error("Payment insert error:", err);
                    return res.status(500).json({ error: "Error inserting payment: " + err.message });
                }

                console.log("Payment inserted successfully:", insertResult);
                const paymentId = insertResult.insertId;

                // Insert into payment history
                const historySql = `
                    INSERT INTO payment_history 
                    (payment_id, payment_date, amount_paid, payment_method, transaction_reference, status) 
                    VALUES (?, NOW(), ?, ?, ?, ?)
                `;

                db.query(
                    historySql,
                    [paymentId, amountDue, payment_method, `TRANS-${paymentId}-${Date.now()}`, paymentStatus],
                    (historyErr, historyResult) => {
                        if (historyErr) {
                            console.error("Error inserting into payment history:", historyErr);
                            return res.status(500).json({ error: "Error inserting payment history" });
                        }

                        console.log("Payment history recorded:", historyResult);
                        return res.status(201).json({
                            message: 'Payment created successfully and recorded in payment history',
                            payment: {
                                id: paymentId,
                                policy_id,
                                payment_frequency,
                                preferred_due_date,
                                payment_method,
                                amount_due: amountDue,
                                payment_due_date,
                                payment_status: paymentStatus
                            }
                        });
                    }
                );
            }
        );
    });
};

// Get payment by ID
exports.getPaymentById = (req, res) => {
    db.query(
        `SELECT p.*, po.policy_status, u.first_name, u.last_name 
         FROM payments p
         JOIN policy po ON p.policy_id = po.policy_id
         JOIN users u ON po.user_id = u.user_id
         WHERE p.payment_id = ?`,
        [req.params.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error when fetching payment' });
            if (results.length === 0) return res.status(404).json({ error: 'Payment not found' });
            return res.status(200).json(results[0]);
        }
    );
};

// Update payment
exports.updatePayment = (req, res) => {
    const { id } = req.params;
    const { payment_frequency, preferred_due_date, payment_method, amount_due, payment_due_date, payment_status } = req.body;

    const validStatuses = ['Paid', 'Pending', 'Over Due'];
    if (payment_status && !validStatuses.includes(payment_status)) {
        return res.status(400).json({ error: 'Invalid payment status' });
    }

    // If payment_due_date is provided, check if it would result in an overdue status
    let calculatedAmountDue = amount_due;
    let calculatedStatus = payment_status;
    
    if (payment_due_date && !payment_status) {
        const today = new Date();
        const dueDate = new Date(payment_due_date);
        
        // If due date is in the past, calculate penalty and set status to overdue
        if (dueDate < today) {
            // Fetch the original amount if not provided
            if (!calculatedAmountDue) {
                // Need to first get the original amount from the database
                return db.query('SELECT policy_id FROM payments WHERE payment_id = ?', [id], (err, results) => {
                    if (err || results.length === 0) {
                        return res.status(err ? 500 : 404).json({ 
                            error: err ? 'Database error' : 'Payment not found' 
                        });
                    }
                    
                    const policy_id = results[0].policy_id;
                    
                    // Now get the base price
                    db.query(`
                        SELECT p.policy_type, p.plan_type
                        FROM policy po
                        JOIN plans p ON po.plan_id = p.plan_id
                        WHERE po.policy_id = ?
                    `, [policy_id], (err, planResults) => {
                        if (err || planResults.length === 0) {
                            return res.status(err ? 500 : 404).json({ 
                                error: err ? 'Database error' : 'Policy details not found' 
                            });
                        }
                        
                        const { policy_type, plan_type } = planResults[0];
                        
                        const priceList = {
                            "Retirement": { "Basic": 2000, "Standard": 3800, "Premium": 7000 },
                            "Education": { "Basic": 7200, "Standard": 2000, "Premium": 3500 },
                            "Health": { "Basic": 1000, "Standard": 2200, "Premium": 4500 },
                            "Auto": { "Basic": 900, "Standard": 1500, "Premium": 2800 }
                        };
                        
                        let baseAmount = priceList[policy_type]?.[plan_type] || 0;
                        
                        // Calculate months overdue
                        const monthsLate = 
                            (today.getFullYear() - dueDate.getFullYear()) * 12 + 
                            (today.getMonth() - dueDate.getMonth());
                        
                        // Apply penalty
                        const penaltyRate = Math.min(monthsLate * 0.1, 1.0);
                        calculatedAmountDue = baseAmount + (baseAmount * penaltyRate);
                        calculatedStatus = 'Over Due';
                        
                        // Now continue with the update
                        performUpdate(calculatedAmountDue, calculatedStatus);
                    });
                });
            } else {
                // If amount is provided, we'll assume it's the base amount and apply penalty
                const monthsLate = 
                    (today.getFullYear() - dueDate.getFullYear()) * 12 + 
                    (today.getMonth() - dueDate.getMonth());
                
                // Apply penalty based on months overdue
                const penaltyRate = Math.min(monthsLate * 0.1, 1.0);
                calculatedAmountDue = calculatedAmountDue * (1 + penaltyRate);
                calculatedStatus = 'Over Due';
            }
        }
    }
    
    // If we're not fetching original amount, proceed with update
    if (calculatedAmountDue === amount_due) {
        performUpdate(calculatedAmountDue, calculatedStatus);
    }
    
    function performUpdate(finalAmount, finalStatus) {
        const updateFields = [];
        const queryParams = [];

        if (payment_frequency) updateFields.push('payment_frequency = ?'), queryParams.push(payment_frequency);
        if (preferred_due_date) updateFields.push('preferred_due_date = ?'), queryParams.push(preferred_due_date);
        if (payment_method) updateFields.push('payment_method = ?'), queryParams.push(payment_method);
        if (finalAmount) updateFields.push('amount_due = ?'), queryParams.push(finalAmount);
        if (payment_due_date) updateFields.push('payment_due_date = ?'), queryParams.push(payment_due_date);
        if (finalStatus) updateFields.push('payment_status = ?'), queryParams.push(finalStatus);

        if (updateFields.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }

        queryParams.push(id);

        const sql = `UPDATE payments SET ${updateFields.join(', ')} WHERE payment_id = ?`;

        db.query(sql, queryParams, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error when updating payment' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Payment not found or no changes made' });
            }

            // Insert a new record into payment history
            const insertHistorySql = `
                INSERT INTO payment_history 
                (payment_id, payment_date, amount_paid, payment_method, transaction_reference, status) 
                VALUES (?, NOW(), ?, ?, ?, ?)
            `;

            db.query(
                insertHistorySql,
                [id, finalAmount || amount_due, payment_method, `TRANS-${id}-${Date.now()}`, finalStatus || payment_status],
                (historyErr, historyResult) => {
                    if (historyErr) {
                        console.error("Error inserting payment history:", historyErr);
                        return res.status(500).json({ error: "Error inserting payment history" });
                    }

                    return res.status(200).json({ message: 'Payment updated and new history record created successfully' });
                }
            );
        });
    }
};

// Delete payment
exports.deletePayment = (req, res) => {
    db.query('DELETE FROM payments WHERE payment_id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error when deleting payment' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Payment not found' });
        return res.status(200).json({ message: 'Payment deleted successfully' });
    });
};

// Get payment history by policy ID
exports.getPaymentHistoryByPolicyId = (req, res) => {
    const sql = `
        SELECT p.*, po.policy_status, u.first_name, u.last_name
        FROM payments p
        JOIN policy po ON p.policy_id = po.policy_id
        JOIN users u ON po.user_id = u.user_id
        WHERE p.policy_id = ?
        ORDER BY p.payment_due_date DESC`;
    
    db.query(sql, [req.params.policyId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error when fetching payment history' });
        return res.status(200).json({ count: results.length, payment_history: results });
    });
};