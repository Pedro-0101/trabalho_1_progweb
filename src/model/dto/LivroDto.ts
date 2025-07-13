export class LivroDTO {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  edicao: string;
  isbn: string;
  categoriaId: number;

  constructor(
    titulo: string,
    autor: string,
    editora: string,
    edicao: string,
    isbn: string,
    categoriaId: number,
    id?: number
  ) {
    this.id = id ?? 0;
    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.edicao = edicao;
    this.isbn = isbn;
    this.categoriaId = categoriaId;
  }
}
