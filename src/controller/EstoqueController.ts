import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse, Query } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EstoqueService } from "../service/EstoqueService";
import { EstoqueDTO } from "../model/dto/EstoqueDto";

@Route('estoque')
@Tags('Estoque')
export class EstoqueController extends Controller {

	estoqueService = new EstoqueService();

	@Get()
	async listarEstoqueDisponivel(
		@Res() fail: TsoaResponse<400, BasicResponseDto>,
		@Res() success: TsoaResponse<200, BasicResponseDto>,
		@Query() disponivel: boolean,
		@Query() livroId?: number
	): Promise<void> {
		try {
			const estoqueDisponivel = await this.estoqueService.getEstoqueDisponivel(disponivel, livroId);
			return success(200, new BasicResponseDto('Lista de exemplares', estoqueDisponivel));
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
			const novoUsuario = await this.estoqueService.registrarEstoque(dto.livroId, dto.quantidade);
			return success(201, new BasicResponseDto('Usuario criado com sucesso', novoUsuario));
		} catch (error: any) {
			return fail(400, new BasicResponseDto(error.message, undefined));
		}
	}
}