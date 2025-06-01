import { EstoqueRepository } from "../repository/EstoqueRepository";

export class Estoque {
    id: number;
    livroId: number;
    quantidade: number;
    quantidadeEmprestada: number;
    disponivel: boolean;
    

    private constructor(livroId: number) {

        let instance = EstoqueRepository.getInstance();     // Cria uma instância do repositório
        let listaEstoque = instance.getListaEstoques();     // Obtém a lista de estoques do repositório

        // Verifica se já existe um estoque para o livro
        if(listaEstoque.find(estoque => estoque.livroId === livroId)) {
            instance.addEstoqueExistente(livroId); 
            instance.atualizarDisponibilidade(livroId); // Atualiza a disponibilidade do estoque
            return; 
        }

        this.id = instance.getListaEstoques().length + 1;   // Atribui um ID único baseado no tamanho da lista de estoques
        this.livroId = livroId;                             // Espera receber um ID de livro válido (service)
        this.quantidade = 1;                                // Inicializa a quantidade com 1 
        this.quantidadeEmprestada = 0;                     // Inicializa a quantidade emprestada com 0
        this.disponivel = true;                             // Inicializa a disponibilidade como true
        instance.addEstoqueNovo(this);                      // Adiciona o estoque ao repositório

    }



}