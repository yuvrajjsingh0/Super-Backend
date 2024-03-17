import { pool } from "../../util/db";
import { TransactionDTO } from "../dto/transaction.dto";

class TransactionsDao{

    async createTransactionWithPaymentMethods(transaction: TransactionDTO) {
        let client;
        try {
          client = await pool.connect();
          await client.query('BEGIN');
      
          const transactionQueryText = 'INSERT INTO transactions (customer_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id';
          const transactionValues = [transaction.customer_id, transaction.amount, transaction.status];
          const transactionResult = await client.query(transactionQueryText, transactionValues);
          const transactionId = transactionResult.rows[0].id;
      
          for (const method of transaction.payments) {
            const paymentMethodQueryText = 'INSERT INTO payment_methods (transaction_id, method, amount) VALUES ($1, $2, $3)';
            const paymentMethodValues = [transactionId, method.method, method.amount];
            await client.query(paymentMethodQueryText, paymentMethodValues);
          }
      
          await client.query('COMMIT');
          return { transactionId };
        } catch (error) {
          if (client) await client.query('ROLLBACK');
          throw error;
        } finally {
          if (client) client.release();
        }
    }

    async getTransactionDetails(transactionId: number) {
        try {
          const client = await pool.connect();
          const queryText = `
            SELECT 
              t.id AS transaction_id,
              t.total_amount,
              t.status,
              c.id AS customer_id,
              c.name AS customer_name,
              c.email AS customer_email,
              pm.method AS payment_method,
              pm.amount AS payment_amount
            FROM transactions t
            JOIN customers c ON t.customer_id = c.id
            JOIN payment_methods pm ON t.id = pm.transaction_id
            WHERE t.id = $1
          `;
          const values = [transactionId];
          const result = await client.query(queryText, values);
          client.release();
          return result.rows;
        } catch (error) {
          throw error;
        }
    }

    async updateTransactionStatus(transactionId: number, newStatus: string) {
        try {
          const client = await pool.connect();
          const queryText = `
            UPDATE transactions
            SET status = $1
            WHERE id = $2
            RETURNING *
          `;
          const values = [newStatus, transactionId];
          const result = await client.query(queryText, values);
          client.release();
          return result.rows[0];
        } catch (error) {
          throw error;
        }
    }

    async listTransactionsForCustomer(customerId: number) {
        try {
          const client = await pool.connect();
          const queryText = `
            SELECT 
              t.id AS transaction_id,
              t.total_amount,
              t.status
            FROM transactions t
            JOIN customers c ON t.customer_id = c.id
            WHERE c.id = $1
          `;
          const values = [customerId];
          const result = await client.query(queryText, values);
          client.release();
          return result.rows;
        } catch (error) {
          throw error;
        }
    }

    async calculateTotalSalesPerCustomer() {
        try {
          const client = await pool.connect();
          const queryText = `
            SELECT
              c.id AS customer_id,
              c.name AS customer_name,
              SUM(t.total_amount) AS total_sales_value
            FROM customers c
            LEFT JOIN transactions t ON c.id = t.customer_id
            GROUP BY c.id, c.name
          `;
          const result = await client.query(queryText);
          client.release();
          return result.rows;
        } catch (error) {
          throw error;
        }
    }
      
      
}

export default new TransactionsDao();