import { Body , Controller , Delete , Get , Path , Post , Put , Query , Res , Route , SuccessResponse, Tags ,
TsoaResponse } from "tsoa";
import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { CategoriaLivroDTO } from "../model/dto/CategoriaLivroDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaLivro } from "../model/entity/CategoriaLivro";

@Route('categoriaLivro')
@Tags('CategoriaLivro')

export class CategoriaLivroController extends Controller{

    categoriaLivroService = new CategoriaLivroService();
    
    @Get()
    async listarCategoriasLivro(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoriasLivro = await this.categoriaLivroService.getCategoriasLivro();
            return success(200, new BasicResponseDto('Lista de categorias de livros', categoriasLivro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

}