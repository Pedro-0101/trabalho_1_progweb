import { UsuarioService } from "../service/UsuarioService";
import { Usuario } from "../model/Usuario";
import { Request, Response } from "express";

export class UsuarioController{
    private UsuarioController : UsuarioController;

    constructor(){
        this.UsuarioController = new UsuarioController();
    }

    public async cadastrarUsuario(req: Request): Promise<Usuario | null>{

        try{
            
            const usuarioService = new UsuarioService();
            const nome = req.body.nome;
            const cpf = req.body.cpf;
            const categoria = Number(req.body.categoria);
            const curso = Number(req.body.curso);

            const usuarioCadastrado = usuarioService.criarUsuario(nome, cpf, categoria, curso);
            if(usuarioCadastrado){
                return usuarioCadastrado;
            }else{
                throw new Error("Erro ao cadastrar novo usuario");
            }

        }catch(error){
            throw new Error("Erro ao cadastrar novo usuario");
        }

    }

    public async listaUsuariosFiltro(req: Request): Promise<Usuario[] | null>{

        try{
            
            const usuarioService = new UsuarioService();
            const categoria = req.body.categoria;
            const curso = req.body.curso;

            const listaUsuarios = usuarioService.listaUsuariosFiltro(categoria, curso);
            if(listaUsuarios){
                return listaUsuarios;
            }else{
                throw new Error("Erro ao listar usuarios")
            }

        }catch(error){
            throw new Error("Erro ao listar usuarios");
        }

    }

    public async getUsuario(cpf: string): Promise<Usuario | null>{
        
        try{
            
            const usuarioService = new UsuarioService();
            const usuario = usuarioService.getUsuarioByCpf(cpf);
            if(usuario){
                return usuario;
            }else{
                throw new Error("Usuario nao encontrado");
            }
        }catch(error){
            throw new Error("Erro ao requisitar usuario");
        }
        
    }

    public async atualizaUsuario(req: Request): Promise<Usuario | null>{
        try{
            
            const usuarioService = new UsuarioService();
            const nome = req.body.nome;
            const cpf = req.body.cpf;
            const categoria = Number(req.body.categoria);
            const curso = Number(req.body.curso);

            const usuarioAtualizado = usuarioService.atualizaUsuario(nome, cpf, categoria, curso);
            return usuarioAtualizado;

        }catch(error){
            throw new Error("Erro ao cadastrar novo usuario");
        }
    }
    
    
    public async removeFuncionario(cpf: string): Promise<void>{
        try{
            
            const usuarioService = new UsuarioService();
            usuarioService.removeUsuario(cpf);

        }catch(error){
            throw new Error("Erro ao remover usuario");
        }
    }
    
}