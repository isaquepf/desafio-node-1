import TransactionsRepository from '../repositories/TransactionsRepository';

interface TransactionDTO {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsDTO {
  transactions: TransactionDTO[];
  balance: BalanceDTO;
}

class ListTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionsDTO {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    return { transactions, balance };
  }
}

export default ListTransactionsService;
