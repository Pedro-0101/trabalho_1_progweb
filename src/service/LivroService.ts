import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { EmprestimoService } from "./EmprestimoService";
import { EstoqueService } from "./EstoqueService";
import { textUtils } from "../utils/textUtil";

export class LivroService {
    private livroRepository: LivroRepository;

    constructor() {
        this.livroRepository = LivroRepository.getInstance();
    }

    public criarLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number): Livro {

        
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
        let livro = new Livro(id, titulo, autor, editora, edicao, isbn, categoriaId);

        // Verifica se o livro foi criado corretamente
        if (!livro) {
            throw new Error("Erro ao criar o livro.");
        }

        // Adiciona o livro ao repositório
        this.livroRepository.addLivro(livro);

        // Retorna o livro criado
        return livro;

    }

    public ListarLivrosFiltro(filtroAutor: string, filtroEditora: string, filtroCategoria: number): Livro[] | null{

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

}