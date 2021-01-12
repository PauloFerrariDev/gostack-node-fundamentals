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
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce<Balance>(
      (balanceAcc, transaction): Balance => {
        switch (transaction.type) {
          case 'income': {
            balanceAcc.income += transaction.value;
            break;
          }
          case 'outcome': {
            balanceAcc.outcome += transaction.value;
            break;
          }
          default: {
            break;
          }
        }

        balanceAcc.total = balanceAcc.income - balanceAcc.outcome;

        return balanceAcc;
      },
      initialBalance,
    );

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
