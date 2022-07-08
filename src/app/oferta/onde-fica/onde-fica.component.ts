import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OfertasService } from './../../ofertas.services';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = '';

  constructor(
    private route: ActivatedRoute, 
    private ofertaService: OfertasService
  ) { }

  ngOnInit() {
    
    this.route.parent.params.subscribe((parametros: Params) => {

      // this.ofertaService.getOndeFicaPorId(this.route.parent.snapshot.params['id'])
      this.ofertaService.getOndeFicaPorId(parametros.id)
      .then((resposta: string) => {
        this.ondeFica = resposta;
      });

    })
    
  }

}
