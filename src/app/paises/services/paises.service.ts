import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paises } from '../interfaces/paises';

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

}
