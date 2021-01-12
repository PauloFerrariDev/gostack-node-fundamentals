/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialValue: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce<Balance>(
      (balanceAcc, transaction): Balance => {
        if (transaction.type === 'income') {
          balanceAcc.income += transaction.value;
        }

        if (transaction.type === 'outcome') {
          balanceAcc.outcome += transaction.value;
        }

        return balanceAcc;
      },
      initialValue,
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
