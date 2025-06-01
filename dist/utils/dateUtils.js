"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
class DateUtils {
    formatarData(data, formato) {
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
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const dia = data.getDate().toString().padStart(2, '0');
        // Componentes das horas
        const diaSemana = data.getDay().toString();
        const hora = data.getHours().toString().padStart(2, '0');
        const min = data.getMinutes().toString().padStart(2, '0');
        const sec = data.getSeconds().toString().padStart(2, '0');
        const ms = data.getMilliseconds().toString().padStart(2, '0');
        let retorno = formato;
        retorno = retorno.replace(/dd/g, dia);
        retorno = retorno.replace(/mm/g, mes);
        if (formato.includes('aaaa')) {
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
}
exports.DateUtils = DateUtils;
