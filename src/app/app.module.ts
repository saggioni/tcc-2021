import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ModalComponent } from './components/modal/modal.component';
import { HttpRequestInterceptor } from './httpRequestInterceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    NormasItemComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
