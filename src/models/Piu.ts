
class piu {
    id: string; // Identificador único do herói
    content: string; // Nome do herói (ex: Batman)
    likeN: number; // Poder ou habilidade principal (ex: Inteligência)
    chatN: number;
    date: string;
    lastCDate: string;
  
    /**
     * Construtor para criar um novo herói com base nos dados fornecidos
     */
    constructor(id: string, content: string, likeN: number, chatN: number, date: string, lastCDate: string) {
      this.id = id;
      this.content = content;
      this.likeN = likeN;
      this.chatN = chatN;
      this.date = date;
      this.lastCDate = lastCDate;
    }
  }
  
  export default piu;
  