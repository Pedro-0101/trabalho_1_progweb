import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse, Query } from "tsoa";
import { LivroService } from "../service/LivroService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroDTO } from "../model/dto/LivroDto";

@Route('livro')
@Tags('Livro')
export class LivroController extends Controller {

    LivroService = new LivroService();

    @Get()
    async listarLivros(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Query() autor?: string,
        @Query() editora?: string,
        @Query() categoriaId?: number
    ): Promise<void> {
        try {
            const livros = await this.LivroService.getLivros(autor, editora, categoriaId);
            return success(200, new BasicResponseDto('Lista de livros', livros));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get('{isbn}')
    async getLivroById(
        @Path() isbn: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.LivroService.getLivroByIsbn(isbn);
            return success(200, new BasicResponseDto('Detalhes do livro', livro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Post()
    async addLivro(
        @Body() dto: LivroDTO,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoLivro = await this.LivroService.criarLivro(dto.titulo, dto.autor, dto.editora, dto.edicao, dto.isbn, dto.categoriaId);
            return success(201, new BasicResponseDto('Livro criado com sucesso', novoLivro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put('{isbn}')
    async atualizarLivro(
        @Path() isbn: string,
        @Body() dto: LivroDTO,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livroAtualizado = await this.LivroService.atualizarLivro(dto.titulo, dto.autor, dto.editora, dto.edicao, dto.isbn, dto.categoriaId);
            return success(200, new BasicResponseDto('Livro atualizado com sucesso', livroAtualizado));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete('{isbn}')
    async deletarLivro(
        @Path() isbn: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.LivroService.deletarLivro(isbn);
            return success(200, new BasicResponseDto('Livro deletado com sucesso', undefined));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}