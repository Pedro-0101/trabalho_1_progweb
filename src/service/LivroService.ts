import { Livro } from "../model/entity/Livro";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroService } from "./CategoriaLivroService";


export class LivroService {
    private livroRepository: LivroRepository;
    private categoriaLivroService: CategoriaLivroService;

    constructor() {
        this.livroRepository = LivroRepository.getInstance();
        this.categoriaLivroService = new CategoriaLivroService();
    }

    private async validarLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number): Promise<Livro> {

        // Instância para validação e formatação
        const livro = new Livro(titulo, autor, editora, edicao, isbn, categoriaId);

        // Verifica se existe livro com mesmo isbn
        const livroRepetidoIsbn = await this.getLivroByIsbn(livro.isbn);
        if (livroRepetidoIsbn) throw new Error(`O livro com ISBN ${livro.isbn} já foi incluído.`);

        // Verifica se existe livro com mesma combinação de autor, edição e editora
        const livroRepetidoAEE = await this.getLivroAEE(livro.autor, livro.editora, livro.edicao);
        if (livroRepetidoAEE) throw new Error(`O livro com autor ${livro.autor}, editora ${livro.editora} e edição ${livro.edicao} já foi incluído.`);

        // Verifica se existe categoria de livro
        const existeCategoria = await this.categoriaLivroService.getCategoriaLivroById(livro.categoriaId);
        if (!existeCategoria) throw new Error('Categoria de livro inválida.');

        return livro;

    }

    async criarLivro(
        titulo: string,
        autor: string,
        editora: string,
        edicao: string,
        isbn: string,
        categoriaId: number
    ): Promise<Livro> {
        
        const livroTemp = await this.validarLivro(titulo, autor, editora, edicao, isbn, categoriaId);
        
        // Persiste e obtém o ID gerado
        const id = await this.livroRepository.insertLivro(livroTemp);

        // Retorna nova instância com ID preenchido
        return new Livro(titulo, autor, editora, edicao, isbn, categoriaId, id);
    }

    async getLivroByIsbn(isbn: string): Promise<Livro | null> {
        
        return await this.livroRepository.getLivroByIsbn(isbn);

    }

    async getLivroById(livroId: number): Promise<Livro | null> {

        if(!livroId)throw new Error('Id do livro invalido.');
        return this.livroRepository.getLivroById(livroId);

    }

    async getLivroAEE(autor: string, editora: string, edicao: string): Promise<Livro | null> {

        if(!autor || !editora || !edicao)throw new Error('Erro ao consultar repeticao de livro.');
        return await this.livroRepository.getLivroAEE(autor, editora, edicao);

    }

    async getLivros(autor?: string, editora?: string, categoriaId?: number): Promise<Livro[] | null> {
        return await this.livroRepository.getLivros(autor, editora, categoriaId);
    }

    async atualizarLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number): Promise<Livro | null> {

        const livro = await new Livro(titulo, autor, editora, edicao, isbn, categoriaId);

        // Verifica se existe categoria de livro
        const existeCategoria = await this.categoriaLivroService.getCategoriaLivroById(livro.categoriaId);
        if (!existeCategoria) throw new Error('Categoria de livro inválida.');

        return await this.livroRepository.atualizarLivro(livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoriaId);

    }

    async deletarLivro(isbn: string): Promise<boolean>{

        const livro = await this.getLivroByIsbn(isbn.trim());
        if(!livro) throw new Error(`Livro com o isbn ${isbn} nao encontrado`)
        return await this.livroRepository.deletarLivro(livro.isbn);

    }

}