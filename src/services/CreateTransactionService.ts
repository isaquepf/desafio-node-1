import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const availableOperations = ['income', 'outcome'];

    if (!availableOperations.includes(type))
      throw new Error('Invalid operation!');

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value)
      throw new Error('Insufficient balance.');

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;