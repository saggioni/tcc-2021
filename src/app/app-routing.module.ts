import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotificacaoListComponent } from './components/notificacao/list/list.component';
import { IncidentesListComponent } from './components/incidentes/list/list.component';
import { NormasListComponent } from './components/normas/list/list.component';

const routes: Routes = [  
  {path: '', component: HomeComponent},
  {path: 'notificacoes', component: NotificacaoListComponent },
  {path: 'incidentes', component: IncidentesListComponent },
  {path: 'normas', component: NormasListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
