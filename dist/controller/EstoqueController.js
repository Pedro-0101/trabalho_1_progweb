"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EstoqueService_1 = require("../service/EstoqueService");
const EstoqueDto_1 = require("../model/dto/EstoqueDto");
let EstoqueController = class EstoqueController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.estoqueService = new EstoqueService_1.EstoqueService();
    }
    listarEstoqueDisponivel(fail, success, disponivel, livroId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estoqueDisponivel = yield this.estoqueService.getEstoqueDisponivel(disponivel, livroId);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Lista de exemplares', estoqueDisponivel));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    addUsuario(dto, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoUsuario = yield this.estoqueService.registrarEstoque(dto.livroId, dto.quantidade);
                return success(201, new BasicResponseDto_1.BasicResponseDto('Usuario criado com sucesso', novoUsuario));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, Boolean, Number]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "listarEstoqueDisponivel", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EstoqueDto_1.EstoqueDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "addUsuario", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, tsoa_1.Route)('estoque'),
    (0, tsoa_1.Tags)('Estoque')
], EstoqueController);
