import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';

import { NotificacaoListComponent } from './components/notificacao/list/list.component';
import { NotificacaoItemComponent } from './components/notificacao/item/item.component';
import { IncidentesListComponent } from './components/incidentes/list/list.component';
import { IncidentesItemComponent } from './components/incidentes/item/item.component';
import { NormasListComponent } from './components/normas/list/list.component';
import { NormasItemComponent } from './components/normas/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    NotificacaoListComponent,
    NotificacaoItemComponent,
    IncidentesListComponent,
    IncidentesItemComponent,
    NormasListComponent,
    NormasItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
