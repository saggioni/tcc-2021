import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Notificacao } from '../model/notificacao';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  endpoint: string = environment.apiBaseUrl + '/notificacoes';
  headers: HttpHeaders = new HttpHeaders(
    {
      "X-Api-Key": environment.apiKey,
      "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token"
    });

  getAll(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(this.endpoint, { headers: this.headers });
  }

  get(id: any): Observable<Notificacao> {
    return this.http.get<Notificacao>(this.endpoint + '/' + id, { headers: this.headers });
  }

  delete(id: any): Observable<object> {
    return this.http.delete(this.endpoint + '/' + id, { headers: this.headers });
  }

  post(notificacao: Notificacao | undefined) {
    if (notificacao !== undefined && notificacao?.notificacao_id === undefined) {
      notificacao.notificacao_id = uuidv4();
    }
    return this.http.post<Notificacao>(this.endpoint, JSON.stringify(notificacao),{ headers: this.headers });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('NotificacoesService: ${message}');
  }
}
