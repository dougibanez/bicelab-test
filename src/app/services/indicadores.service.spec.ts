import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { IndicadoresService } from 'src/app/services/indicadores.service';
import { throwError } from 'rxjs';

describe("IndicadoresService", () => {
  let httpTestingController: HttpTestingController;
  let indicadoresService: IndicadoresService;
  let baseUrl = "/last";
  let indicador: {};
  let error404: number = 404;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    indicador = {
      date: 1584489600,
      key: "cobre",
      name: "Precio del Cobre, dólares por libra",
      unit: "dolar",
      value: 2.39
    };
  });

  beforeEach(inject([IndicadoresService], (service: IndicadoresService) => {
    indicadoresService = service;
  }));

  it("se debe generar IndicadoresService", () => {
    expect(IndicadoresService).toBeTruthy();
  });

  it("llamada a api /last debe retornar datos", () => {
    let result: any = {};
    indicadoresService.getAll().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl
    });
    req.flush([indicador]);
    expect(result[0]).toEqual(indicador);
  });

  it("llamada a api /last debe responder un error", () => {
    let error: any;
    indicadoresService.getAll().subscribe(null, e => { error = e; });
    let req = httpTestingController.expectOne("/last");
    req.flush("ocurrió un error", {
      status: 404,
      statusText: "error de red"
    });
    expect(error.status).toEqual(error404);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});