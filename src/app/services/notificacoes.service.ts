import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Notificacao } from '../model/notificacao';
import { MessageService } from './message.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificacoesService {
  constructor(private http: HttpClient, private messageService: MessageService) { }

  private url = environment.apiBaseUrl + '/notificacoes';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getNotificacoes(): Observable<Notificacao[]> {  
    console.log(this.url);
    return this.http.get<Notificacao[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched notificacoes')),
        catchError(this.handleError<Notificacao[]>('getNotificacoes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('NotificacaoService: ${message}');
  }
}
