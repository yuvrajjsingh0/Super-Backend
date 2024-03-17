const request = require('supertest');
const app = require('../dist/app.js');

// Test for creating a transaction
describe('POST /transaction', () => {
  it('should create a new transaction', async () => {
    const response = await request(app)
      .post('/transaction')
      .send({
        customerId: 1,
        totalAmount: 500,
        status: 'pending',
        payment_method: [{ method: "crypto", amount: 400 }, { method: "card", amount: 600 }]
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});

describe('POST /transaction/transactionStatus', () => {
  it('should update transaction status', async () => {
    const response = await request(app)
      .post('/transaction/transactionStatus')
      .send({
        id: 1,
        newStatus: 'Completed'
      });
    expect(response.status).toBe(200);
  });
});

// Test for retrieving transactions by customer
describe('GET /transaction/transactionsByCustomer', () => {
  it('should retrieve transactions for a specific customer', async () => {
    const response = await request(app)
      .get('/transaction/transactionsByCustomer?customerId=1');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
});

// Test for retrieving total sales per customer
describe('GET /transaction/totalSalesPerCustomer', () => {
  it('should retrieve total sales per customer', async () => {
    const response = await request(app)
      .get('/transaction/totalSalesPerCustomer');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
});

// Test for retrieving a specific transaction by ID
describe('GET /transaction/:id', () => {
  it('should retrieve a specific transaction by ID', async () => {
    const response = await request(app)
      .get('/transaction/1');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
});
