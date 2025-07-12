import { textUtils } from "../utils/textUtil";

export class Livro {
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
        titulo = textUtils.capitalizarTexto(titulo);
        autor = textUtils.capitalizarTexto(autor);
        editora = textUtils.capitalizarTexto(editora);
        edicao = textUtils.capitalizarTexto(edicao);
        isbn = isbn.trim().replace(/[^0-9]/g, "");

        if (!titulo || titulo.length < 3) {
            throw new Error("Título inválido. Deve ter pelo menos 3 caracteres.");
        }

        if (!autor || autor.length < 3) {
            throw new Error("Autor inválido. Deve ter pelo menos 3 caracteres.");
        }

        if (!editora || editora.length < 3) {
            throw new Error("Editora inválida. Deve ter pelo menos 3 caracteres.");
        }

        if (!edicao || edicao.length < 3) {
            throw new Error("Edição inválida. Deve ter pelo menos 3 caracteres.");
        }

        if (!isbn || isbn.length < 13) {
            throw new Error("ISBN inválido. Deve ter pelo menos 13 caracteres.");
        }

        this.id = id ?? 0;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoriaId = categoriaId;
    }
}
