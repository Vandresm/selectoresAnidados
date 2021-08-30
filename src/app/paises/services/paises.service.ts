import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of , combineLatest} from 'rxjs';

import { PaisC, Paises } from '../interfaces/paises';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  
  private _regiones : string[] = ['Africa','Americas', 'Asia', 'Europe', 'Oceania']
  private baseUrl: string = ('https://restcountries.eu/rest/v2/')
  private filtro: string = ('?fields=name;alpha3Code');

  get regiones() :string[]{
    return [...this._regiones]
  }

  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<Paises[]>{
    //console.log(`==> URL: ${this.baseUrl}region/${region}${this.filtro}`)
    return this.http.get<Paises[]>(`${this.baseUrl}region/${region}${this.filtro}`);
  }

  getPaisPorCodigo(codigo: string): Observable <PaisC | null>{
    if (!codigo) {
      return of(null);
    }
      return this.http.get<PaisC>(`${this.baseUrl}alpha/${codigo}`);
  }

  getPaisPorCodigoSF(codigo: string): Observable <Paises>{
    if (!codigo) {
      return of();
    }
      return this.http.get<Paises>(`${this.baseUrl}alpha/${codigo}${this.filtro}`);
  }

  getPaisesPorCodigos(border : string[]): Observable<Paises[]> {
    if (!border) {
        return of([]);
    }

    const peticiones: Observable<Paises>[] = [];

    border.forEach ( 
      codigo => {
            const  peticion = this.getPaisPorCodigoSF(codigo); 
            peticiones.push(peticion);
      }
    );

    return combineLatest( peticiones );

  }



}
