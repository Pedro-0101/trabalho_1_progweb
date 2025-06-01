"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
// Rota de teste para verificar se o servidor está funcionando
router.get('/', (req, res) => {
    res.send('Bem-vindo à Biblioteca!');
});
module.exports = router;
