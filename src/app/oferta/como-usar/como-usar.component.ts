import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { OfertasService } from './../../ofertas.services';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = '';

  constructor (
    private route: ActivatedRoute, 
    private ofertaService: OfertasService
  ) { }

  ngOnInit() {
    // parent-> Pega valor da rota pai
    this.route.parent.params.subscribe((parametros: Params) =>{
      
      // this.ofertaService.getComoUsarOfertaPorId(this.route.parent.snapshot.params['id'])
      this.ofertaService.getComoUsarOfertaPorId(parametros.id)
      .then((resp: string) => {
        this.comoUsar = resp;
      });
    
    })
    
    
  }

}
