import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { textUtils } from "../utils/textUtil";

export class Livro {
    id: number;
    titulo: string;
    autor: string;
    editora: string;
    edicao: string;
    isbn: string;
    categoriaId: number;

    private livroRepository: LivroRepository;

    constructor(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number) {

        this.livroRepository = LivroRepository.getInstance();

        titulo = textUtils.capitalizarTexto(titulo);
        autor = textUtils.capitalizarTexto(autor);
        editora = textUtils.capitalizarTexto(editora);
        edicao = textUtils.capitalizarTexto(edicao);
        isbn = isbn.trim().replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
        
        // Valida o título do livro
        if (!titulo || titulo.trim() === "" || titulo.length < 3) {
            throw new Error("Título inválido. Deve ter pelo menos 3 caracteres.");
        }

        // Valida o autor do livro
        if (!autor || autor.trim() === "" || autor.length < 3) {
            throw new Error("Autor inválido. Deve ter pelo menos 3 caracteres.");
        }

        // Valida a editora do livro
        if (!editora || editora.trim() === "" || editora.length < 3) {
            throw new Error("Editora inválida. Deve ter pelo menos 3 caracteres.");
        }

        // Valida a edição do livro
        if (!edicao || edicao.trim() === "" || edicao.length < 3) {
            throw new Error("Edição inválida. Deve ter pelo menos 3 caracteres.");
        }

        // Valida o ISBN do livro
        if (!isbn || isbn.trim() === "" || isbn.length < 13) {
            throw new Error("ISBN inválido. Deve ter pelo menos 13 caracteres.");
        }

        // Verifica se a categoria existe
        let categoriaLivro = CategoriaLivroRepository.getInstance().getListaCategoriasLivros().find(categoria => categoria.id === categoriaId);
        if (!categoriaLivro) {
            throw new Error("Categoria não encontrada.");
        }

        // Verifica se o livro já existe
        if (this.livroRepository.getListaLivros().some( livro => livro.titulo === titulo 
                                                        && livro.edicao === edicao 
                                                        && livro.autor === autor 
                                                        && livro.editora === editora 
                                                        && livro.isbn === isbn)) { 
            throw new Error("Livro já cadastrado.");
        }

        // Cria um novo livro com um ID único
        let id = this.livroRepository.getListaLivros().length + 1;

        this.id = id;                  
        this.titulo = titulo;          
        this.autor = autor;            
        this.editora = editora;        
        this.edicao = edicao;          
        this.isbn = isbn;              
        this.categoriaId = categoriaId;

    }
}