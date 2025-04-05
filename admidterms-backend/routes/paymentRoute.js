const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/payment', paymentController.getAllPayments);
router.get('/payment/:id', paymentController.getPaymentById);
router.post('/payment', paymentController.createPayment);
router.put('/payment/:id', paymentController.updatePayment);
router.delete('/payment/:id', paymentController.deletePayment);
router.get('/payment/history/:policyId', paymentController.getPaymentHistoryByPolicyId);

module.exports = router;
