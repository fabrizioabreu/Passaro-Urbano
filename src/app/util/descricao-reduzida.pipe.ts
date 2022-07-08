import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {

    /**
     * Truncar a string na posição X e concatenar com "..."
     * 
     * @param texto Texto para fazer a alteração
     * @param truncar Posição para truncar a string
     */
    transform(texto: string, truncar: number): string {

        if(texto.length > truncar) {
            return texto.substring(0, truncar) + '...';
        }

        return texto;
    }
    
}