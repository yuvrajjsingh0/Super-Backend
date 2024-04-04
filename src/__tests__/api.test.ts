const request = require('supertest');

import {createApp} from '../app';

const app = createApp();

// Test cases
describe('Transaction API endpoints', () => {
  it('should create a new transaction', async () => {
    const response = await request(app)
      .post('/transaction')
      .set('Content-type', 'application/json')
      .send({
        customerId: 1,
        amount: 500,
        status: "pending",
        payments: [{ method: "crypto", amount: 400 }, { method: "card", amount: 600 }]
      })
    expect(response.status).toBe(201);
    // Add more assertions as needed
  }, 10000);

  it('should update transaction status', async () => {
    const response = await request(app)
      .post('/transaction/transactionStatus')
      .send({
        transaction_id: 2,
        status: 'Completed'
      });
    expect(response.status).toBe(201);
    // Add more assertions as needed
  });

  it('should retrieve transactions for a specific customer', async () => {
    const response = await request(app)
      .get('/transaction/transactionsByCustomer?customer_id=1');
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
      .get('/transaction/2');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

});
