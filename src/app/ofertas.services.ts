import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/retry'

import { Oferta } from './shared/oferta.model'
import { URL_API_OFERTAS } from './app.api'
import { URL_API_COMO_USAR } from './app.api'
import { URL_API_ONDE_FICA } from './app.api'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class OfertasService {
    // private url_api = "http://localhost:3000/ofertas"
    constructor(private http: Http) { }

    public getOfertas(): Promise<Oferta[]> {
        //efetuar uma requisição http
        return this.http.get(`${URL_API_OFERTAS}?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json())

        //retornar uma promise Oferta
    }
    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API_OFERTAS}?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }
    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API_OFERTAS}?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json()[0])
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API_COMO_USAR}?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao;
            });
    }

    public getOndeFicaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API_ONDE_FICA}?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao;
            });
    }

    /**
     * Função que faz a pesquisa de ofertas
     * 
     * @param termo valor digitado pelo usuario
     * @returns objeto da pesquisa
     */
    public pesquisaOferta(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API_OFERTAS}?descricao_oferta_like=${termo}`)
        .retry(5)
        .pipe(map((resposta: Response) => resposta.json()))

    }
}
