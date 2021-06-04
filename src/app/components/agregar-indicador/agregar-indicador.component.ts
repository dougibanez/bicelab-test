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
  errorServicio = false;
  cargando = true;

  constructor(private indicadoresService: IndicadoresService) { }
  /*
  * ngOnInit():
  * inicia la actividad del controller, consumiento la api para obtener los datos y seteando su resultado en un objeto service
  */
  ngOnInit(): void {
    this.errorServicio = false;
    this.cargando = true;
    if (!this.indicadoresService.cargaOK) {
      this.indicadoresService.getAll()
        .subscribe(
          data => {
            this.indicadoresService.localBD = _.values(data);
            this.indicadoresService.cargaOK = true;
            this.cargando = false;
          },
          error => {
            this.errorServicio = true;
            this.cargando = false;
          });
    } else {
      this.cargando = false;
    }
  }

  /*
  * agregarIndicador():
  * permite agregar un nuevo elemento a la lista de indicadores, siempre y cuando el valor KEY no esté repetido
  * muestra mensajes de error en formulario según la condición que se presente
  */
  agregarIndicador(): void {
    this.limpiarErrores();
    if (!this.indicadorNoExiste()) {
      this.formErrorExiste = true;
    } else if (this.indicador.value?.length && !this.esNumeroCL(this.indicador.value)) {
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

  /*
  * limpiarIndicador():
  * limpia los valores del formulario y quita los mensajes de error que estén desplegados
  */
  limpiarIndicador(): void {
    this.limpiarErrores();
    this.submitted = false;
    this.indicador = {
      key: '',
      name: '',
      unit: '',
      value: ''
    };
  }

  /*
  * validarFormulario():
  * valida que todos los datos del formulario tengan contenido
  */
  validarFormulario(indicador: any) {
    return _.every([
      indicador.key.length > 0,
      indicador.name.length > 0,
      indicador.unit.length > 0,
      indicador.value.length > 0
    ], Boolean);
  }

  /*
  * indicadorNoExiste():
  * valida que el valor KEY del indicador que se está intentando agregar no exista, para evitar duplicidad de KEY
  */
  indicadorNoExiste() {
    return _.isEmpty(_.find(this.indicadoresService.localBD, ['key', this.indicador.key]));
  }

  /*
  * esNumeroCL():
  * expresión regular que permite validar que sea un número entero o decimal. Exige que el separador decimal esté separado por coma
  */
  esNumeroCL(val: any) {
    let re = /^(?:\d{1,3}(?:\d{3})*|\d+)(?:\,\d+)?$/;
    return re.test(val);
  }

  /*
  * limpiarErrores():
  * limpia todos los mensajes de error
  */
  limpiarErrores() {
    this.formError = false;
    this.formErrorExiste = false;
    this.formErrorNumero = false;
    this.errorServicio = false;
  }

}