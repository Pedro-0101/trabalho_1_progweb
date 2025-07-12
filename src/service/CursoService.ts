import { Curso } from "../model/Curso";
import { CursoRepository } from "../repository/CursoRepository";

export class CursoService {
    private cursoRepository: CursoRepository;

    constructor() {
        this.cursoRepository = CursoRepository.getInstance();
    }

    async criarCurso(nome: string): Promise<Curso> {
        // Cria instância temporária apenas para validar e padronizar o nome
        const cursoTemp = new Curso(nome);

        // Persiste e obtém o ID gerado
        const id = await this.cursoRepository.insertCurso(cursoTemp);

        // Retorna nova instância com o ID preenchido
        return new Curso(nome, id);
    }

    /*public listarCursos(): Curso[] {
        // Retorna a lista de cursos
        return this.cursoRepository.getListaCursos();
    }*/

}