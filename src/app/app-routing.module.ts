import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarIndicadoresComponent } from './components/listar-indicadores/listar-indicadores.component';
import { AgregarIndicadorComponent } from './components/agregar-indicador/agregar-indicador.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar-indicadores', pathMatch: 'full' },
  { path: 'listar-indicadores', component: ListarIndicadoresComponent },
  { path: 'agregar-indicador', component: AgregarIndicadorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }