
import piu from '../models/Piu';

interface ICreatePiuDTO {
    id: string;
    content: string;
    likeN: number;
    chatN: number;
    date: string;
    lastCDate: string;
}


class PiuRepository {
  private pius: piu[];

  constructor() {
    // Nosso "banco de dados" será um array de heróis em memória
    this.pius = [];
  }

  public create(data: ICreatePiuDTO): piu {
    const { id, content, likeN, chatN, date, lastCDate } = data;

    const newPiu = new piu(id, content, likeN, chatN, date, lastCDate); // cria uma nova instância do herói
    this.pius.push(newPiu); // salva no array

    return newPiu;
}

  public delete(index: number): void {
    this.pius.splice(index, 1); // remove 1 elemento na posição index
  }

    public getAll(): piu[] {
    return this.pius;
  }

  // Busca um herói específico pelo ID
  public getById(id: string): piu | undefined {
    return this.pius.find(user => user.id === id);
  }

  // Retorna o índice (posição) do herói no array
  public findIndexById(id: string): number {
    return this.pius.findIndex(hero => hero.id === id);
  }
}

export default PiuRepository;