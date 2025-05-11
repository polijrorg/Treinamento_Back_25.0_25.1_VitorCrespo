

import { randomUUID } from 'crypto';

import piu from '../models/Piu';
import PiuRepository from '../repositories/PiuRepository';


class PiuService {
  private repository: PiuRepository;

  constructor() {
    // Cria uma instância do repositório que gerencia os heróis
    this.repository = new PiuRepository();
  }

  // ========================================
  // CREATE → Criação de novo herói
  // ========================================
  /**
   * Cria um novo herói com os dados fornecidos.
   * Aqui é gerado um ID aleatório usando a biblioteca crypto,
   * e em seguida o método 'create' do repositório é chamado
   * para armazenar o herói na fonte de dados (array em memória).
   */
  public create(content: string, likeN: number, chatN: number, date: string, lastCDate: string): piu {
    const id = randomUUID(); // Gera um ID único

    const piu = this.repository.create({
      id,
      content,
      likeN,
      chatN,
      date,
      lastCDate,
    });

    return piu;
  }


    public delete(id: string): boolean {
        const index = this.repository.findIndexById(id);

        if (index === -1) return false;

        this.repository.delete(index);
        return true;
    }

  public listAll(): piu[] {
    return this.repository.getAll();
  }

  // Busca um herói específico pelo ID
  public findById(id: string): piu | undefined {
    return this.repository.getById(id);
  }
}

export default new PiuService();