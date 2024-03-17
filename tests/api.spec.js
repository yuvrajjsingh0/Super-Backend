const request = require('supertest');
const express = require('express');
const app = express();

// Import your transactionController
const transactionController = require( '../dist/transactions/controllers/transaction.controller');

// Assign a different port for testing
const PORT = 3001;

// Set up your routes
app.post('/transaction', (req, res) => transactionController.createTransaction);
app.post('/transaction/transactionStatus', (req, res) => transactionController.updateTransactionStatus(req, res));
app.get('/transaction/transactionsByCustomer', (req, res) => transactionController.getTransactionsByCustomer(req, res));
app.get('/transaction/totalSalesPerCustomer', (req, res) => transactionController.getTransactionsByCustomer(req, res));
app.get('/transaction/:id', (req, res) => transactionController.getTransaction(req, res));

// Start the server on the testing port
const server = app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
});

// Close the server after all tests are done
afterAll(() => {
  server.close();
});

// Test cases
describe('Transaction API endpoints', () => {
  it('should create a new transaction', async () => {
    const response = await request(app)
      .post('/transaction')
      .send({
        customerId: 1,
        totalAmount: 500,
        status: 'pending',
        payment_method: [{ method: "crypto", amount: 400 }, { method: "card", amount: 600 }]
      })
    expect(response.status).toBe(201);
    // Add more assertions as needed
  });

  it('should update transaction status', async () => {
    const response = await request(app)
      .post('/transaction/transactionStatus')
      .send({
        id: 1,
        newStatus: 'Completed'
      });
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  it('should retrieve transactions for a specific customer', async () => {
    const response = await request(app)
      .get('/transaction/transactionsByCustomer?customerId=1');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  it('should retrieve total sales per customer', async () => {
    const response = await request(app)
      .get('/transaction/totalSalesPerCustomer');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  it('should retrieve a specific transaction by ID', async () => {
    const response = await request(app)
      .get('/transaction/1');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
});

// const request = require('supertest');
// const app = require('../dist/app.js');

// // Test for creating a transaction
// describe('POST /transaction', () => {
//   it('should create a new transaction', async () => {
//     const response = await request(app)
//       .post('/transaction')
//       .send({
//         customerId: 1,
//         totalAmount: 500,
//         status: 'pending',
//         payment_method: [{ method: "crypto", amount: 400 }, { method: "card", amount: 600 }]
//       });
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('id');
//   });
// });

// describe('POST /transaction/transactionStatus', () => {
//   it('should update transaction status', async () => {
//     const response = await request(app)
//       .post('/transaction/transactionStatus')
//       .send({
//         id: 1,
//         newStatus: 'Completed'
//       });
//     expect(response.status).toBe(200);
//   });
// });

// // Test for retrieving transactions by customer
// describe('GET /transaction/transactionsByCustomer', () => {
//   it('should retrieve transactions for a specific customer', async () => {
//     const response = await request(app)
//       .get('/transaction/transactionsByCustomer?customerId=1');
//     expect(response.status).toBe(200);
//     // Add more assertions as needed
//   });
// });

// // Test for retrieving total sales per customer
// describe('GET /transaction/totalSalesPerCustomer', () => {
//   it('should retrieve total sales per customer', async () => {
//     const response = await request(app)
//       .get('/transaction/totalSalesPerCustomer');
//     expect(response.status).toBe(200);
//     // Add more assertions as needed
//   });
// });

// // Test for retrieving a specific transaction by ID
// describe('GET /transaction/:id', () => {
//   it('should retrieve a specific transaction by ID', async () => {
//     const response = await request(app)
//       .get('/transaction/1');
//     expect(response.status).toBe(200);
//     // Add more assertions as needed
//   });
// });
