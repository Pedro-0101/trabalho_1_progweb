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

    async criarLivro(
        titulo: string,
        autor: string,
        editora: string,
        edicao: string,
        isbn: string,
        categoriaId: number
    ): Promise<Livro> {
        // Instância temporária só para validação e formatação
        const livroTemp = new Livro(titulo, autor, editora, edicao, isbn, categoriaId);

        // Verifica se existe livro com mesmo isbn
        const livroReptidoIsbn = await this.getLivroByIsbn(livroTemp.isbn);
        if(livroReptidoIsbn)throw new Error(`O livro ${livroTemp.titulo} ja foi incluido.`);
        
        // Verifica se existe livro com mesma combinacao de autor, edicao e editora
        const livroRepetidoAEE = await this.getLivroAEE(livroTemp.autor, livroTemp.editora, livroTemp.edicao);
        if(livroRepetidoAEE)throw new Error(`O livro ${livroTemp.titulo} ja foi incluido.`);
        
        // Verifica se existe categoria de livro
        const existeCategoria = await this.categoriaLivroService.getCategoriaLivroById(livroTemp.categoriaId);
        if(!existeCategoria)throw new Error('Categoria de livro invalida');
        
        // Persiste e obtém o ID gerado
        const id = await this.livroRepository.insertLivro(livroTemp);

        // Retorna nova instância com ID preenchido
        return new Livro(titulo, autor, editora, edicao, isbn, categoriaId, id);
    }

    async getLivroByIsbn(isbn: string): Promise<Livro> {
        
        const livro = await this.livroRepository.getLivroByIsbn(isbn);
        if (!livro) throw new Error(`Livro com ISBN ${isbn} não encontrado.`);
        return livro;

    }

    async getLivroById(livroId: number): Promise<Livro | null> {

        if(!livroId)throw new Error('Id do livro invalido.');
        return this.livroRepository.getLivroById(livroId);

    }

    async getLivroAEE(autor: string, editora: string, edicao: string): Promise<Livro | null> {

        if(!autor || !editora || !edicao)throw new Error('Erro ao consultar repeticao de livro.');
        return await this.livroRepository.getLivroAEE(autor, editora, edicao);

    }

    /*public ListarLivrosFiltro(filtroAutor: string, filtroEditora: string, filtroCategoria: number): Livro[] | null{

        try{
            
            let listaLivros: Livro[];
            listaLivros = this.livroRepository.getListaLivros();

            if(filtroAutor){
                listaLivros.filter(livro => {livro.autor === filtroAutor});
            }

            if(filtroEditora){
                listaLivros.filter(livro => {livro.editora === filtroEditora});
            }

            if(filtroCategoria){
                listaLivros.filter(livro => {livro.categoriaId === filtroCategoria});
            }

            return listaLivros;

        }catch(error){
            throw new Error('Erro ao listar livros com filtro');
        }

    }

    public detalhesLivro(isbn: string): Livro | null{
        try{

            if(!isbn){
                throw new Error("Erro ao requisitar detalhes do livro: ISBN invalido: "+isbn);
            }

            const livro = this.livroRepository.getLivroByIsbn(isbn);
            return livro;

        }catch(error){
            throw new Error("Erro ao requisitar detalhes do livro")
        }

    }

    public atualizarLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number): Livro | null{

        try{

            const livroAtualizado = this.livroRepository.atualizarLivro(titulo, autor, editora, edicao, isbn, categoriaId);
            return livroAtualizado;
            
        }catch(error){
            throw new Error("Erro ao atualizar informacoes do livro")
        }
    }

    public deletarLivro(isbn: string): void{

        try{

            const emprestimoService = new EmprestimoService();
            const estoqueService = new EstoqueService();
            const estoqueId = estoqueService.getEstoqueId(null, isbn);
            let qtdeEmprestada = emprestimoService.qtdeEmprestada(estoqueId);

            if(qtdeEmprestada === 0){

            estoqueService.deletarEstoque(estoqueId);
            this.livroRepository.deletarLivro(isbn);
                
            }else{
                throw new Error("Erro ao deletar livro, possui empresimos em andamento");
            }

        }catch(error){
            throw new Error("Erro ao deletar livro");
        }

    }
*/
}