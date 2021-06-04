import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

/*
* TildesPipe:
* Permite reemplazar palabras en una cadena de texto. 
* Sirve corregir faltas de ortografía de la API, ya que no hay acceso para modificarla.
*/  
@Pipe({
  name: 'tildes'
})

export class TildesPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const original = ["dolar", "indice"];
    const corregido = ["dólar", "índice"];
    let posicion: number;
    let splitted = value.split(" ");
    let newSplitted: string[] = [];
    _.forEach(splitted, function(val) {
      posicion = _.indexOf(original, val.toLowerCase());
      posicion >= 0 ? newSplitted.push(corregido[posicion]) : newSplitted.push(val);
    });
    var response = newSplitted.join(" "); 
    return response;
  }
}