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
exports.UsuarioController = void 0;
const tsoa_1 = require("tsoa");
const UsuarioService_1 = require("../service/UsuarioService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const UsuarioDto_1 = require("../model/dto/UsuarioDto");
let UsuarioController = class UsuarioController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.UsuarioService = new UsuarioService_1.UsuarioService();
    }
    listarUsuarios(fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield this.UsuarioService.getUsuarios();
                return success(200, new BasicResponseDto_1.BasicResponseDto('Lista de usuarios', usuarios));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    getUsuarioByCpf(cpf, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.UsuarioService.getUsuarioByCpf(cpf);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Detalhes do usuario', usuario));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    addUsuario(dto, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoUsuario = yield this.UsuarioService.criarUsuario(dto.nome, dto.cpf, dto.ativo, dto.categoriaId, dto.cursoId);
                return success(201, new BasicResponseDto_1.BasicResponseDto('Usuario criado com sucesso', novoUsuario));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    } // <-- Add this closing brace for addUsuario
    atualizarUsuario(cpf, dto, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioAtualizado = yield this.UsuarioService.atualizarUsuario(dto.nome, cpf, dto.ativo, dto.categoriaId, dto.cursoId);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Usuario atualizado com sucesso', usuarioAtualizado));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    deletarUsuario(cpf, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletarUsuario = yield this.UsuarioService.deletarUsuario(cpf);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Usuario atualizado com sucesso', deletarUsuario));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listarUsuarios", null);
__decorate([
    (0, tsoa_1.Get)('{cpf}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getUsuarioByCpf", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "addUsuario", null);
__decorate([
    (0, tsoa_1.Put)('{cpf}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UsuarioDto_1.UsuarioDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizarUsuario", null);
__decorate([
    (0, tsoa_1.Delete)('{cpf}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "deletarUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, tsoa_1.Route)('usuario'),
    (0, tsoa_1.Tags)('Usuario')
], UsuarioController);
