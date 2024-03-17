import express from "express";
import transactionsDao from "../daos/transactions.dao";
import { TransactionDTO } from "../dto/transaction.dto";
class TransactionController {

    async createTransaction(req: express.Request, res: express.Response) {
        try{
            let transaction = await transactionsDao.createTransactionWithPaymentMethods(req.body as TransactionDTO);
            res.status(201).send(transaction);
        }catch(err){
            res.status(500);
        }
    }

    async getTransaction(req: express.Request, res: express.Response) {
        try{
            let transaction = await transactionsDao.getTransactionDetails(Number(req.params.id));
            res.status(200).send(transaction);
        }catch(err){
            res.status(500);
        }
    }

    async updateTransactionStatus(req: express.Request, res: express.Response) {
        try{
            let transaction = await transactionsDao.updateTransactionStatus(Number(req.body.transaction_id), req.body.status);
            res.status(201).send(transaction);
        }catch(err){
            res.status(500);
        }
    }

    async getTransactionsByCustomer(req: express.Request, res: express.Response){
        try{
            let transactions = await transactionsDao.listTransactionsForCustomer(Number(req.body.customer_id));
            res.status(200).send(transactions);
        }catch(err){
            res.status(500);
        }
    }

    async getTotalSalesPerCustomer(req: express.Request, res: express.Response){
        try{
            let transactions = await transactionsDao.calculateTotalSalesPerCustomer();
            res.status(200).send(transactions);
        }catch(err){
            res.status(500);
        }
    }
}

export default new TransactionController();