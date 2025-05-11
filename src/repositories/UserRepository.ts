/**
 * ================================================================
 * 🗂️ HERO REPOSITORY
 *
 * O que é um Repository?
 * - Um Repository (ou Repositório) é uma camada responsável por
 *   armazenar, buscar, atualizar e deletar dados de uma "fonte".
 * - Essa fonte pode ser um banco de dados real, uma API externa,
 *   ou, como neste exemplo, uma estrutura em memória (array).
 *
 * Para que ele serve?
 * - Centraliza toda a lógica de acesso aos dados, separando essa
 *   responsabilidade das regras de negócio (que ficam no Service).
 * - Facilita a manutenção e a futura troca da fonte de dados.
 *
 * Como se relaciona com o restante do projeto?
 * - O Repository é usado pelo Service (HeroService) para realizar
 *   operações como criar, listar, atualizar e deletar heróis.
 * - As rotas (heroes.routes.ts) apenas chamam métodos do Service,
 *   que por sua vez utiliza este Repository.
 *
 * 📌 Resumo da arquitetura:
 * routes ➝ service ➝ repository ➝ dados (array ou banco)
 * ================================================================
 */

import user from '../models/User';

interface ICreateUserDTO {
  id: string;
  name: string;
  passw: string;
  email: string;
}

interface IUpdateUserDTO {
  id: string;
  data: {
    name: string;
    email: string;
    passw: string;
  };
}

class UserRepository {
  private users: user[];

  constructor() {
    // Nosso "banco de dados" será um array de heróis em memória
    this.users = [];
  }

  // ========================================
  // CREATE → Cria e armazena um novo herói
  // ========================================
  public create(data: ICreateUserDTO): user {
    const { id, name, email, passw } = data;

    const newUser = new user(id, name, email, passw); // cria uma nova instância do herói
    this.users.push(newUser); // salva no array

    return newUser;
  }

  // ========================================
  // READ → Leitura de dados
  // ========================================

  // Retorna todos os heróis cadastrados
  public getAll(): user[] {
    return this.users;
  }

  // Busca um herói específico pelo ID
  public getById(id: string): user | undefined {
    return this.users.find(user => user.id === id);
  }

  // Retorna o índice (posição) do herói no array
  public findIndexById(id: string): number {
    return this.users.findIndex(hero => hero.id === id);
  }

  // ========================================
  // UPDATE → Atualiza um herói existente
  // ========================================
  public update(data: IUpdateUserDTO): user {
    const index = this.findIndexById(data.id);

    this.users[index] = {
      ...this.users[index], // mantém dados antigos
      ...data.data, // sobrescreve com dados novos
    };

    return this.users[index];
  }

  // ========================================
  // DELETE → Remove um herói do array
  // ========================================
  public delete(index: number): void {
    this.users.splice(index, 1); // remove 1 elemento na posição index
  }
}

export default UserRepository;
