import { ItemCarrinho } from 'app/shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = [];


    exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    incluirItem(oferta: Oferta): void {

        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo, 
            oferta.descricao_oferta, 
            oferta.valor,
            1
        );

        // Verificar se o item já não existe dentro de this.itens
        let itemCarrinhoEncontrado =  this.itens.find((item) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade ++
        } else {
            this.itens.push(itemCarrinho);
        }

    }

    public totalCarrinhoCompras(): number {
        
        let total: number = 0;

        this.itens.map((item: ItemCarrinho) => {
            total += item.valor * item.quantidade
        })

        return total
    }

    /**
     * Adiciona + 1 item
     * @param itemCarrinho 
     */
    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        // item.quantidade ++   <-- Fazer simples assim, ou...

        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if(itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade ++
        }
    }

    /**
     * Subtrai - 1 item
     * @param itemCarrinho 
     */
    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {

        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if(itemCarrinhoEncontrado.quantidade) {
            itemCarrinhoEncontrado.quantidade --

            // Remove o item se o valor for negativo.
            if(itemCarrinhoEncontrado.quantidade === 0) {
                // .splice = com base em um índice[], ele recorta o item encontrado e devolve para a variável. e informar a quantidade de itens que serão removidos
                // indexOf = retorna a posição de determinado item
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)

            }

        }

    }

    /**
     * Limpa todos os itens do carrinho
     */
    public limparCarrinho():void {
        this.itens = [];
    }
}

export { CarrinhoService }