import { UsuarioRepository } from "../repository/UsuarioRepository";

export class Usuario {
    id: number;
    nome: string;
    cpf: string;
    ativo: boolean;
    categoriaId: number;
    cursoId: number;

    constructor(nome: string, cpf: string, categoriaId: number, cursoId: number) {

        let instance = UsuarioRepository.getInstance();     // Cria uma instância do repositório
        this.id = instance.getListaUsuarios().length + 1;   // Atribui um ID único baseado no tamanho da lista de usuários
        this.nome = nome;                                   // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.cpf = cpf;                                     // Espera receber uma string não vazia no formato correto (service)        
        this.ativo = true;                                  // Inicialmente, o usuário está ativo     
        this.categoriaId = categoriaId;                     // Validar se a categoria existe no sistema (service)
        this.cursoId = cursoId;                             // Validar se o curso existe no sistema (service)

        instance.addUsuario(this);                          // Adiciona o usuário ao repositório

    }
}