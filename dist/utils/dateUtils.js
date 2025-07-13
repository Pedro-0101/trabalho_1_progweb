"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
class DateUtils {
    static formatarData(data, formato) {
        // Componentes da data
        const anoCompleto = data.getFullYear().toString();
        const anoCurto = anoCompleto.slice(2, 4);
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const dia = data.getDate().toString().padStart(2, '0');
        // Componentes das horas
        const hora = data.getHours().toString().padStart(2, '0');
        const min = data.getMinutes().toString().padStart(2, '0');
        const sec = data.getSeconds().toString().padStart(2, '0');
        let retorno = formato;
        // Substituição segura para "aaaa" e "aa"
        if (formato.includes('aaaa')) {
            retorno = retorno.replace(/aaaa/g, anoCompleto);
        }
        else {
            retorno = retorno.replace(/aa/g, anoCurto);
        }
        // Substituir dia e mes
        retorno = retorno.replace(/dd/g, dia);
        retorno = retorno.replace(/mm/g, mes);
        // Substituir hora:min:sec, se houver
        retorno = retorno.replace(/h/g, hora);
        retorno = retorno.replace(/m/g, min);
        retorno = retorno.replace(/s/g, sec);
        return retorno;
    }
    static diferencaDias(date1, date2) {
        if (!date2) {
            return 0;
        }
        const msPorDia = 1000 * 60 * 60 * 24;
        // Zera as horas para considerar apenas a data
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        const diffMs = Math.abs(d1.getTime() - d2.getTime());
        return Math.floor(diffMs / msPorDia);
    }
    static somaData(date, num) {
        const novaData = new Date(date);
        novaData.setDate(novaData.getDate() + num);
        return novaData;
    }
    static parseDataFromString(dateString) {
        // Validação básica
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            throw new Error(`Formato inválido de data: ${dateString}. Esperado aaaa-mm-dd.`);
        }
        const [ano, mes, dia] = dateString.split('-').map(Number);
        // Mês começa em 0 (janeiro)
        return new Date(ano, mes - 1, dia);
    }
}
exports.DateUtils = DateUtils;
