import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViajerosComponent } from './pages/viajeros/viajeros.component';
import { ViajesComponent } from './pages/viajes/viajes.component';
import { OrigenComponent } from './pages/origen/origen.component';
import { DestinoComponent } from './pages/destino/destino.component';
import { ReferenciasComponent } from './pages/referencias/referencias.component';

const routes: Routes = [
  {
    path: '',
    component: ViajesComponent
  },
  {
    path: 'viajeros',
    component: ViajerosComponent
  },
  {
    path: 'viajes',
    component: ViajesComponent
  },
  {
    path: 'origen',
    component: OrigenComponent
  },
  {
    path: 'destino',
    component: DestinoComponent
  },
  {
    path: 'referencias',
    component: ReferenciasComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
