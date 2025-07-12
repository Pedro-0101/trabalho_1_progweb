import { Curso } from "../model/Curso";
import { CursoRepository } from "../repository/CursoRepository";

export class CursoService {
    private cursoRepository: CursoRepository;

    constructor() {
        this.cursoRepository = CursoRepository.getInstance();
    }

    async criarCurso(nome: string): Promise<Curso>{
        
        // Instancia o novo curso
        let curso = new Curso(nome);

        // Adiciona o curso ao repositório e retorna
        curso = await this.cursoRepository.insertCurso(curso);
        return curso;
    }

    /*public listarCursos(): Curso[] {
        // Retorna a lista de cursos
        return this.cursoRepository.getListaCursos();
    }*/

}