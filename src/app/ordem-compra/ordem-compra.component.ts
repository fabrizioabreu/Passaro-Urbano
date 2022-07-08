import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CarrinhoService } from 'app/carrinho.service';
import { OrdemCompraService } from 'app/ordem-compra-service';
import { ItemCarrinho } from 'app/shared/item-carrinho.model';
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: [ './ordem-compra.component.css' ],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {
  
  public idPedidoCompra: number;
  public itensCarrinho: ItemCarrinho[] = [] 

  public formulario: FormGroup = new FormGroup({
    'endereco'      : new FormControl(null, [ 
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(120) 
    ]),
    'numero'        : new FormControl(null, [
      Validators.required, 
      Validators.minLength(1), 
      Validators.maxLength(10)
    ]),
    'complemento'   : new FormControl(null),
    'formaPagamento': new FormControl(null, [
      Validators.required
    ])
  });
  
  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }
    
    
  ngOnInit() {

    this.itensCarrinho = this.carrinhoService.exibirItens()
    console.log('Itens Carrinho: ', this.itensCarrinho)
  }

  public confirmarCompra(): void {
    if (this.formulario.status === 'INVALID'){

      this.formulario.get('endereco'      ).markAsTouched();
      this.formulario.get('numero'        ).markAsTouched();
      this.formulario.get('complemento'   ).markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();

    } else {

      if(this.carrinhoService.exibirItens().length === 0) {
        alert('Você não selecionou nenhum item!')

      } else {

        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoService.exibirItens()
        );

        this.ordemCompraService.efetivarComra(pedido)
          .subscribe((idPedido: number) => {
            this.idPedidoCompra = idPedido
            this.carrinhoService.limparCarrinho();
          });

      }
    }
  }

  
  adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item);
  }

  diminuir(item: ItemCarrinho): void {
    this.carrinhoService.diminuirQuantidade(item);
  }
}