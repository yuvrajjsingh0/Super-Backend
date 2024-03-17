import express from 'express';
import { CommonRoutesConfig } from '../util/common/routes.config';

import transactionController from './controllers/transaction.controller';

export class TransactionRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'transaction');
    }

    configureRoute(): void {
        this.router.post('/', [
            transactionController.createTransaction
        ]);

        this.router.post('/transactionStatus', [
            transactionController.updateTransactionStatus
        ]);

        this.router.get('/transactionsByCustomer', [
            transactionController.getTransactionsByCustomer
        ]);

        this.router.get('/totalSalesPerCustomer', [
            transactionController.getTotalSalesPerCustomer
        ]);

        this.router.get('/:id', [
            transactionController.getTransaction
        ]);
 
    }

}