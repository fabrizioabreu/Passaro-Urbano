import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { CarrinhoService } from 'app/carrinho.service';
import { OfertasService } from '../ofertas.services'
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta
  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
      
      this.ofertasService.getOfertaPorId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta
      });
    })

    console.log('Oferta - Exibir Itens: ', this.carrinhoService.exibirItens())

  }

  ngOnDestroy(): void {
  }

  public adicionarItemCarrinho():void {
    this.carrinhoService.incluirItem(this.oferta)
    console.log('exibir Itens: ',this.carrinhoService.exibirItens())
  }

}
