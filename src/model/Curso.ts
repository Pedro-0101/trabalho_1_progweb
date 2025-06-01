import { CursoRepository } from "../repository/CursoRepository";

export class Curso {
    id: number;
    nome: string;

    constructor(nome: string) {

        let instance = CursoRepository.getInstance();   // Cria uma instância do repositório
        this.id = instance.getListaCursos().length + 1; // Atribui um ID único baseado no tamanho da lista de cursos
        this.nome = nome;                               // Espera receber uma string não vazia maior que 3 caracteres (service)
        
        instance.addCurso(this);                        // Adiciona o curso ao repositório

    }
}