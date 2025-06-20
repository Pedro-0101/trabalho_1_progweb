import { Estoque } from '../model/Estoque';
import { EstoqueService } from '../service/EstoqueService';
import { Request, Response } from 'express';

export class EstoqueController {
  private estoqueService: EstoqueService;

  constructor() {
    this.estoqueService = new EstoqueService();
  }

  public async registrarEstoque(req: Request, res: Response): Promise<void> {
    try {
      const novoExemplar = await this.estoqueService.registrarEstoque(req.body.isbn, 1);
      res.status(201).json(novoExemplar);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar exemplar', error });
    }
  }

  public async listarEstoque(req: Request, res: Response): Promise<void> {
    try {
      const estoques = this.estoqueService.getListaEstoques();
      res.status(200).json(estoques);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar exemplares', error });
    }
  }

  public async getByCodigo(codigo: number): Promise<any> {
    try {
      const estoque = this.estoqueService.getByCodigo(codigo);
      return estoque;
    } catch (error) {
      throw new Error('Erro ao buscar exemplar');
    }
  }

  public async atualizaDisponibilidade(codigo: number): Promise<Estoque | null> {
    try {
      const estoqueAtualizado = this.estoqueService.atualizaDisponibilidade(codigo);
      return estoqueAtualizado;
    }
    catch (error) {
      throw new Error('Erro ao atualizar exemplar');
    }
  }

  public async deletarEstoque(codigo: number, res: Response): Promise<void> {
    try {
      const estoque = this.estoqueService.getByCodigo(codigo);
      if (!estoque) {
        throw new Error('Exemplar não encontrado');
      }
      this.estoqueService.deletarEstoque(codigo);
      res.status(204).send(); // No content response
    } catch (error) {
      console.error('Erro ao remover exemplar:', error);
      res.status(500).json({ message: 'Erro ao remover exemplar', error });
    }
  }
}