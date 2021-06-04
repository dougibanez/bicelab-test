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
    // esta variable será la que guardará la respuesta de la API para que luego los datos puedan ser manipulados por los controller
    this.localBD = []
  }

  /*
  * getAll():
  * consume api rest para obtener indicadres
  */
  getAll(): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(baseUrl);
  }

}