import { Oferta } from './../shared/oferta.model';
import { Observable, Subject } from 'rxjs';
import { OfertasService } from './../ofertas.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public subjectPesquisa: Subject<string> = new Subject<string>()

  campoDigitado: string = '';

  constructor(
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    
    this.ofertas = this.subjectPesquisa // returno Oferta[]
    .debounceTime(500) // Executa ação após 0,5 segundos, caso tenha parado de digitar
    .distinctUntilChanged() // Verifica se a pesquisa não é igual a última realizada, caso seja, ele não refaz
    .switchMap((termo: string) => {
      // console.log('requisição http para api')

      if(termo.trim() === '') {
        // retorna um observable de array de ofertas vazio
        return Observable.of<Oferta[]>([])
      }

      this.limpaPesquisa()
      
      return this.ofertasService.pesquisaOferta(termo)
    })
    .catch((err: any) => {
      // Caso  ocorra um erro, retorna um array vazio 
      console.log (err)
      return Observable.of<Oferta[]>([])
    })

  }

  pesquisa(valorDigitado: string): void{
    console.log('keyup caracter: ', valorDigitado)
    this.subjectPesquisa.next(valorDigitado)
  }

  /**
   * Limpa apesquisa da busca
   */
  limpaPesquisa(): void {
    this.subjectPesquisa.next('') 
    this.campoDigitado = '';
  }

}
