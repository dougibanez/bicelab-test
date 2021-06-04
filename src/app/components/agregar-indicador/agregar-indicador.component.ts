import { Component, OnInit } from '@angular/core';
import { Indicador } from 'src/app/models/indicador.model';
import { IndicadoresService } from 'src/app/services/indicadores.service';
import * as _ from "lodash";

@Component({
  selector: 'app-agregar-indicador',
  templateUrl: './agregar-indicador.component.html',
  styleUrls: ['./agregar-indicador.component.css']
})
export class AgregarIndicadorComponent implements OnInit {


  indicador: Indicador = {
    key: '',
    name: '',
    unit: '',
    value: ''
  };
  submitted = false;
  formError = false;
  formErrorExiste = false;
  formErrorNumero = false;

  constructor(private indicadoresService: IndicadoresService) { }

  ngOnInit(): void {
    if (!this.indicadoresService.cargaOK) {
      this.indicadoresService.getAll()
        .subscribe(
          data => {
            this.indicadoresService.localBD = _.values(data);
            this.indicadoresService.cargaOK = true;
          },
          error => {
            //console.log(error);
          });
    }
  }

  agregarIndicador(): void {
    if (!this.indicadorNoExiste()) {
      this.formErrorExiste = true;
    } else if (!this.esNumeroCL(this.indicador.value)){
      this.formErrorNumero = true;
    } else {
      this.formError = !this.validarFormulario(this.indicador);
      if (!this.formError && this.indicador.value !== undefined) {
        this.indicador.value = this.indicador.value.replace(/,/g, '.')
        this.indicadoresService.localBD.push(this.indicador)
        this.submitted = true;
      }
    }
  }

  limpiarIndicador(): void {
    this.submitted = false;
    this.formError = false;
    this.formErrorExiste = false;
    this.formErrorNumero = false;
    this.indicador = {
      key: '',
      name: '',
      unit: '',
      value: ''
    };
  }

  validarFormulario(indicador: any) {
    return _.every([
      indicador.key.length > 0,
      indicador.name.length > 0,
      indicador.unit.length > 0,
      indicador.value.length > 0
    ], Boolean);
  }

  indicadorNoExiste() {
    return _.isEmpty(_.find(this.indicadoresService.localBD, ['key', this.indicador.key]));
  }

  esNumeroCL(val: any) {
    let re = /^(?:\d{1,3}(?:\d{3})*|\d+)(?:\,\d+)?$/;
    console.log("num?:"+val);
    console.log(re.test(val));
    return re.test(val);
  }

}