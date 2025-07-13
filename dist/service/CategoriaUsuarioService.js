"use strict";
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
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuario_1 = require("../model/entity/CategoriaUsuario");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    constructor() {
        this.categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    }
    criarCategoriaUsuario(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            // Instância temporária só para validar e preparar o nome
            const categoriaTemp = new CategoriaUsuario_1.CategoriaUsuario(nome);
            // Persiste e obtém o ID gerado
            const id = yield this.categoriaUsuarioRepository.insertCategoriaUsuario(categoriaTemp);
            // Retorna uma nova instância com o ID preenchido
            return new CategoriaUsuario_1.CategoriaUsuario(nome, id);
        });
    }
    getCategoriaUsuarioById(categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!categoriaId)
                throw new Error('Categoria invalida.');
            return yield this.categoriaUsuarioRepository.getCategoriaUsuarioById(categoriaId);
        });
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
