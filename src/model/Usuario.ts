export class Usuario {
    id: number;
    nome: string;
    cpf: string;
    ativo: boolean;
    categoriaId: number;
    cursoId: number;

    constructor(id: number, nome: string, cpf: string, categoriaId: number, cursoId: number) {

        this.id = id;                                       // Espera receber um número inteiro maior que 0 (service)
        this.nome = nome;                                   // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.cpf = cpf;                                     // Espera receber uma string não vazia no formato correto (service)        
        this.ativo = true;                                  // Inicialmente, o usuário está ativo     
        this.categoriaId = categoriaId;                     // Validar se a categoria existe no sistema (service)
        this.cursoId = cursoId;                             // Validar se o curso existe no sistema (service)

    }
}