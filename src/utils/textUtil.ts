export class textUtils {

    public static capitalizarTexto(texto: string): string {
        // Verifica se o texto é vazio ou nulo
        if (!texto || texto.trim() === "") {
            throw new Error("Texto inválido. Deve conter pelo menos um caractere.");
        }

        // Remove espaços extras e capitaliza o primeiro caractere
        texto = texto.trim();         
        texto = texto.replace(/\s+/g, ' ');
        texto = texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

        // Capitaliza a primeira letra de cada palavra
        texto.split(' ').forEach((palavra) => {
            texto = texto.replace(palavra, palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase());
        });
        return texto;
    }
}
