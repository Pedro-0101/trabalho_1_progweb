import { textUtils } from "../../utils/textUtil";

export class CategoriaLivro {
  id: number;
  nome: string;

  constructor(nome: string, id?: number) {
    if (!nome || nome.trim() === "") {
      throw new Error("O nome da categoria não pode ser vazio.");
    }

    nome = textUtils.capitalizarTexto(nome);

    this.id = id ?? 0;
    this.nome = nome;
  }
}
