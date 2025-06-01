import { Curso } from "../model/Curso";

export class CursoRepository {
    private static instance: CursoRepository;
    private listaCursos: Curso[] = [];

    private constructor() {}

    public static getInstance(): CursoRepository {
        if (!CursoRepository.instance) {
            CursoRepository.instance = new CursoRepository();
        }
        return CursoRepository.instance;
    }
    
    public getListaCursos(): Curso[] {
        return this.listaCursos;
    }
    
    public addCurso(curso: Curso): void {
        this.listaCursos.push(curso);
    }

    public getCursoById(id: number): Curso | undefined {
        return this.listaCursos.find(curso => curso.id === id);
    }
}