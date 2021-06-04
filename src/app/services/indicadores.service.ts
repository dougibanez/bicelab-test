import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Indicador } from '../models/indicador.model';

const baseUrl = '/last';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  localBD: any[];
  cargaOK = false;

  constructor(private http: HttpClient) {
    this.localBD = []
  }

  getAll(): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(baseUrl);
  }

}