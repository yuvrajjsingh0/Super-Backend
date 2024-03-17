import express from 'express';
import { CommonRoutesConfig } from '../util/common/routes.config';

import transactionController from './controllers/transaction.controller';

export class AuthRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'auth');
    }

    configureRoute(): void {
        this.router.post('/transaction', [
            transactionController.createTransaction
        ]);

        this.router.post('/transaction/transactionStatus', [
            transactionController.updateTransactionStatus
        ]);

        this.router.get('/transaction/transactionsByCustomer', [
            transactionController.getTransactionsByCustomer
        ]);

        this.router.get('/transaction/totalSalesPerCustomer', [
            transactionController.getTransactionsByCustomer
        ]);

        this.router.get('/transaction/:id', [
            transactionController.getTransaction
        ]);
 
    }

}