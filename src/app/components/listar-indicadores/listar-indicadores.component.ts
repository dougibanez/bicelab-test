import { Component, OnInit } from '@angular/core';
import { Indicador } from 'src/app/models/indicador.model';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import * as _ from "lodash";

@Component({
  selector: 'listar-indicadores',
  templateUrl: 'listar-indicadores.component.html',
  styleUrls: ['listar-indicadores.component.css']
})
export class ListarIndicadoresComponent implements OnInit {

  indicadores?: Indicador[];
  indicadorActual: Indicador = {};
  indice = -1;
  name = '';
  errorServicio = false;
  cargando = true;

  constructor(private indicadoresService: IndicadoresService) { }

  ngOnInit(): void {
    this.obtenerIndicadores();
  }

  obtenerIndicadores(): void {
    this.errorServicio = false;
    this.cargando = true;
    if (!this.indicadoresService.cargaOK) {
      this.indicadoresService.getAll()
        .subscribe(
          data => {
            this.indicadoresService.localBD = _.values(data);
            this.indicadores = this.indicadoresService.localBD;
            this.indicadoresService.cargaOK = true;
            // pintar primera selección
            this.indicadorActual = this.indicadores[0];
            this.indice = 0;
            this.cargando = false;
          },
          error => {
            this.errorServicio = true;
            this.cargando = false;
          });
    } else {
      this.indicadores = this.indicadoresService.localBD;
      this.cargando = false;
    }
  }

  setearIndicadorActivo(indicador: Indicador, index: number): void {
    this.indicadorActual = indicador;
    this.indice = index;
  }

  removerTodosIndicadores(): void {
    this.indicadores = this.indicadoresService.localBD = [];
    this.indicadorActual = {};
    this.indice = -1;
  }

  eliminarIndicador(keyToDelete: any): void {
    _.remove(this.indicadoresService.localBD, {
      key: keyToDelete
    });
    this.indicadores = this.indicadoresService.localBD;
    this.indicadorActual = {};
    this.indice = -1;
  }

}