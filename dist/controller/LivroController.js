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
exports.LivroController = void 0;
const tsoa_1 = require("tsoa");
const LivroService_1 = require("../service/LivroService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const LivroDto_1 = require("../model/dto/LivroDto");
let LivroController = class LivroController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.LivroService = new LivroService_1.LivroService();
    }
    listarLivros(fail, success, autor, editora, categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livros = yield this.LivroService.getLivros(autor, editora, categoriaId);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Lista de livros', livros));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    getLivroById(isbn, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield this.LivroService.getLivroByIsbn(isbn);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Detalhes do livro', livro));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    addLivro(dto, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoLivro = yield this.LivroService.criarLivro(dto.titulo, dto.autor, dto.editora, dto.edicao, dto.isbn, dto.categoriaId);
                return success(201, new BasicResponseDto_1.BasicResponseDto('Livro criado com sucesso', novoLivro));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    atualizarLivro(isbn, dto, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livroAtualizado = yield this.LivroService.atualizarLivro(dto.titulo, dto.autor, dto.editora, dto.edicao, dto.isbn, dto.categoriaId);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Livro atualizado com sucesso', livroAtualizado));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    deletarLivro(isbn, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.LivroService.deletarLivro(isbn);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Livro deletado com sucesso', undefined));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.LivroController = LivroController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String, String, Number]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "listarLivros", null);
__decorate([
    (0, tsoa_1.Get)('{isbn}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "getLivroById", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroDto_1.LivroDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "addLivro", null);
__decorate([
    (0, tsoa_1.Put)('{isbn}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, LivroDto_1.LivroDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "atualizarLivro", null);
__decorate([
    (0, tsoa_1.Delete)('{isbn}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "deletarLivro", null);
exports.LivroController = LivroController = __decorate([
    (0, tsoa_1.Route)('livro'),
    (0, tsoa_1.Tags)('Livro')
], LivroController);
