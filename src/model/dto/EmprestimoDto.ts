export class EmprestimoDTO {
  cpf: string;
  codigoExemplar: number;

  constructor(cpf: string, codigoExemplar: number) {
    this.cpf = cpf;
    this.codigoExemplar = codigoExemplar;
  }
}
