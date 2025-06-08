import { UsuarioController } from '../controller/UsuarioController';
import express, { Request, Response } from 'express';
let router = express.Router();

/*
* POST / - Cadastra novo usuário
    * Campos obrigatórios: nome, CPF, email, categoria, curso. Considere que o cliente da API sempre enviará um CPF numérico (sem traços ou ponto).
* GET / - Lista todos os usuários (com filtros opcionais).
* GET /:cpf - Retorna detalhes de um usuário específico.
* PUT /:cpf - Atualiza dados do usuário.
* DELETE /:cpf - Remove usuário (se não tiver empréstimos)
*/

// Rota para cadastrar novo usuario
router.post('/', async (req: Request, res: Response) => {
    
    try{

        const usuarioController = new UsuarioController();
        const novoUsuario = await usuarioController.cadastrarUsuario(req);
        res.status(200).json(novoUsuario);

    }catch(error){
        throw new Error("Erro ao cadastrar novo usuario")
    }
});

// Rota para listar usuarios, com filtro
router.get('/', async (req: Request, res: Response) => {

    try{

        const usuarioController = new UsuarioController();
        const listaUsuarios = await usuarioController.listaUsuariosFiltro(req);
        res.status(200).json(listaUsuarios);

    }catch(error){
        throw new Error("Erro ao listar funcionarios")
    }
});

// Rota para retornar detalhes de um usuario
router.get('/:cpf', async (req: Request, res: Response) => {

    try{

        const usuarioController = new UsuarioController();
        const usuario = await usuarioController.getUsuario(req.body.cpf);
        res.status(200).json(usuario);

    }catch(error){
        throw new Error("Erro ao retornar detalhes do funcionario")
    }

});

// Rota para atualizar detalhes de um usuario
router.put('/:cpf', async (req: Request, res: Response) => {

    try{

        const usuarioController = new UsuarioController();
        const usuarioAtualizado = await usuarioController.atualizaUsuario(req);
        res.status(200).json(usuarioAtualizado);

    }catch(error){
        throw new Error("Erro ao atualizar funcionario")
    }

});

// Rota para remover usuario
router.delete('/:cpf', async (req: Request, res: Response) => {

    try{

        const usuarioController = new UsuarioController();
        await usuarioController.removeFuncionario(req.body.cpf);
        res.status(200)

    }catch(error){
        throw new Error("Erro ao remover detalhes do funcionario")
    }

});



module.exports = router;