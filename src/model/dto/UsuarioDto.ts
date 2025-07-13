export class UsuarioDTO {
  id: number;
  nome: string;
  cpf: string;
  ativo: string;
  categoriaId: number;
  cursoId: number;

  constructor(
    nome: string,
    cpf: string,
    ativo: string,
    categoriaId: number,
    cursoId: number,
    id?: number
  ) {
    this.id = id ?? 0;
    this.nome = nome;
    this.cpf = cpf;
    this.ativo = ativo;
    this.categoriaId = categoriaId;
    this.cursoId = cursoId;
  }
}
