import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarIndicadorComponent } from './components/agregar-indicador/agregar-indicador.component';
import { ListarIndicadoresComponent } from './components/listar-indicadores/listar-indicadores.component';
import { TildesPipe } from "./pipes/tildes.pipe";

registerLocaleData(localeEsCl, 'es-CL');


@NgModule({
  declarations: [
    AppComponent,
    AgregarIndicadorComponent,
    ListarIndicadoresComponent,
    TildesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "es-CL"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
