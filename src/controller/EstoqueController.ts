import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse, Query } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EstoqueService } from "../service/EstoqueService";
import { EstoqueDTO } from "../model/dto/EstoqueDto";

@Route('estoque')
@Tags('Estoque')
export class EstoqueController extends Controller {

	estoqueService = new EstoqueService();

	@Get()
	async listarEstoque(
		@Res() fail: TsoaResponse<400, BasicResponseDto>,
		@Res() success: TsoaResponse<200, BasicResponseDto>,
		@Query() disponivel: boolean,
		@Query() livroId?: number
	): Promise<void> {
		try {
			const estoqueDisponivel = await this.estoqueService.getListaEstoque(disponivel, livroId);
			return success(200, new BasicResponseDto('Lista de exemplares', estoqueDisponivel));
		} catch (error: any) {
			return fail(400, new BasicResponseDto(error.message, undefined));
		}
	}

	@Get('{id}')
	async getEstoqueById(
		@Path() id: number,
		@Res() fail: TsoaResponse<400, BasicResponseDto>,
		@Res() success: TsoaResponse<200, BasicResponseDto>
	): Promise<void> {
		try {
			const estoque = await this.estoqueService.getEstoqueById(id);
			return success(200, new BasicResponseDto('Detalhes do estoque', estoque));
		} catch (error: any) {
			return fail(400, new BasicResponseDto(error.message, undefined));
		}
	}

	@Post()
	async addUsuario(
		@Body() dto: EstoqueDTO,
		@Res() fail: TsoaResponse<400, BasicResponseDto>,
		@Res() success: TsoaResponse<201, BasicResponseDto>
	): Promise< | void> {
		try {
			const novoEsxemplar = await this.estoqueService.registrarEstoque(dto.livroId, dto.quantidade);
			return success(201, new BasicResponseDto('Exemplar inserido com sucesso', novoEsxemplar));
		} catch (error: any) {
			return fail(400, new BasicResponseDto(error.message, undefined));
		}
	}

	@Put()
	async atualizaDisponibilidade(
		@Path() id: number,
		@Res() fail: TsoaResponse<400, BasicResponseDto>,
		@Res() success: TsoaResponse<200, BasicResponseDto>
	): Promise<void> {
		try {
			const exemplarAtualizado = await this.estoqueService.atualizarDisponibilidade(id);
			return success(200, new BasicResponseDto('Disponibilidade do exemplar atualizada com sucesso', exemplarAtualizado));
		} catch (error: any) {
			return fail(400, new BasicResponseDto(error.message, undefined));
		}
	}

	@Delete('{id}')
    async deletarUsuario(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.estoqueService.deletarEstoque(id);
            return success(200, new BasicResponseDto('Estoque deletado com sucesso com sucesso', undefined));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}