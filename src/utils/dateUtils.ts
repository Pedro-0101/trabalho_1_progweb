export class DateUtils {

    formatarData(data: Date, formato: string): string{

        /*        Formatos suportados:
            * dd/mm/aaaa
            * dd/mm/aa
            * dd-mm-aaaa
            * dd-mm-aa
            * dd/mm/aaaa h:m:s
            * dd/mm/aa h:m:s
            * dd-mm-aaaa h:m:s
            * dd-mm-aa h:m:s
            * dd/mm/aaaa h:m:s
            * dd/mm/aa h:m:s
            * dd-mm-aaaa h:m:s
            * dd-mm-aa h:m:s
            */

        // Componentes da data
        const ano = data.getFullYear().toString();
        const mes = (data.getMonth()+1).toString().padStart(2, '0');
        const dia = data.getDate().toString().padStart(2, '0');

        // Componentes das horas
        const diaSemana = data.getDay().toString();
        const hora = data.getHours().toString().padStart(2, '0');
        const min = data.getMinutes().toString().padStart(2, '0');
        const sec = data.getSeconds().toString().padStart(2, '0');
        const ms = data.getMilliseconds().toString().padStart(2, '0');
        
        let retorno: string = formato;

        retorno = retorno.replace(/dd/g, dia);
        retorno = retorno.replace(/mm/g, mes);
        if(formato.includes('aaaa')) {
            retorno = retorno.replace(/aaaa/g, ano);
        }
        else {
            retorno = retorno.replace(/aa/g, ano.slice(2, 4));
        }

        retorno = retorno.replace(/h/g, hora);
        retorno = retorno.replace(/m/g, min);
        retorno = retorno.replace(/s/g, sec);

        return retorno;
    }

    public static diferencaDias(date1: Date, date2: Date | null): number {

        if(!date2){
            return 0;
        }

        const msPorDia = 1000 * 60 * 60 * 24;
        // Zera as horas para considerar apenas a data
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        const diffMs = Math.abs(d1.getTime() - d2.getTime());
        return Math.floor(diffMs / msPorDia);
    }

    public static somaData(date: Date, num: number): Date {
        const novaData = new Date(date);
        novaData.setDate(novaData.getDate() + num);
        return novaData;
    }

}