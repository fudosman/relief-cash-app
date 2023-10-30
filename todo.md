# Prefix all routes with the version, e.g., /api/v1/

User Registration and Authentication:

Registration: POST /users/register
Authentication: POST /users/authenticate
Generate OTP: POST /users/otp
Send OTP: POST /users/otp
Verify OTP: POST /users/otp/verify

User Profile Management:

Get User by ID: GET /users/:userId
Update User: PUT /users/:userId
Change Password: PUT /users/:userId/password
Delete User: DELETE /users/:userId
Get Referrer: GET /users/:userId/referrer
Get Referred Users: GET /users/:userId/referred
Check Credit Rating: GET /users/:userId/credit-rating
Check Loan Eligibility: GET /users/:userId/loan-eligibility
Get Loan Limit: GET /users/:userId/loan-limit

E-Wallet Management:

Create Wallet: POST /wallets
Link Bank Account to Wallet: POST /wallets/:walletId/bank-accounts/:bankAccountId
Link User to Wallet: POST /wallets/:walletId/users/:userId
Get Wallet: GET /wallets/:userId
Perform Wallet Transaction: POST /wallets/:userId/transactions/:customerWalletId
Delete Wallet: DELETE /wallets/:userId
Remittance to Agent Wallet: POST /wallets/remittance/:loanId/:agentWalletId
Transfer Wallet Balance to Bank Account: POST /wallets/transfer/:agentWalletId/bank-accounts/:bankAccountId
Automate Transfer to Bank Account: POST /wallets/transfer/:customerWalletId/bank-accounts/:bankAccountId

Bank Account Management:

Create Bank Account: POST /bank-accounts
Link Bank Account: POST /bank-accounts/:userId
Verify Bank Account: POST /bank-accounts/verify/:userId/:bankAccountId

Referral Code Management:

Check Referral Eligibility: GET /referral/check-eligibility/:userId
Generate Referral Code: POST /referral/generate/:userId
Redeem Referral Code: POST /referral/redeem/:userId
Get Referral Code by User ID: GET /referral/:userId

Loan Processing:

Check Loan Eligibility: GET /loan/check-eligibility/:userId
Apply for Loan: POST /loan/apply/:userId
Calculate Interest: GET /loan/calculate-interest/:loanId
Calculate Loan Repayment Amount: GET /loan/calculate-repayment/:loanId
Approve Loan: POST /loan/approve/:loanId
Disburse Loan: POST /loan/disburse/:loanId
Get Loan Repayment Status: GET /loan/repayment-status/:loanId
Repay Loan: POST /loan/repay/:loanId
Generate Payment Link: POST /loan/generate-payment-link/:loanId
Mark Loan as Repaid: PUT /loan/mark-repaid/:loanId
Get Unpaid Loans by Referral Code: GET /loan/unpaid/:referralCode

Notification Management:

Send Notification: POST /notifications/:userId
Notify Loan Approval to Customer: POST /notifications/loan-approval/:userId
Notify Loan Repayment to Customer: POST /notifications/loan-repayment/:userId
Notify Loan Status to Agent: POST /notifications/loan-status/:agentId
Send SMS Notification: POST /notifications/sms/:userId

Transaction History:

Create Transaction: POST /transactions/:userId
Get User Transactions: GET /transactions/:userId
Get Transaction Details: GET /transactions/:transactionId

User Verification:

Verify User: POST /users/verify/:userId
Verify Agent Bank Account: POST /agents/verify-bank-account/:agentId
Accept Terms and Conditions: POST /agents/accept-terms/:agentId

Support Card Management:

Create Support Card: POST /support-cards/:userId
Update Support Card: PUT /support-cards/:userId/:cardId
