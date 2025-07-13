export class EstoqueDTO {
  id: number;
  livroId: number;
  quantidade: number;
  quantidadeEmprestada: number;
  disponivel: boolean;

  constructor(
    livroId: number,
    quantidade: number,
    disponivel: boolean,
    quantidadeEmprestada?: number,
    id?: number
  ) {
    this.id = id ?? 0;
    this.livroId = livroId;
    this.quantidade = quantidade;
    this.quantidadeEmprestada = quantidadeEmprestada ?? 0;
    this.disponivel = disponivel;
  }
}
