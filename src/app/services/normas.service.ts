import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Notificacao } from '../model/notificacao';
import { MessageService } from './message.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Norma } from '../model/norma';

@Injectable({
  providedIn: 'root'
})
export class NormasService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private url = environment.apiBaseUrl + '/normas';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get(): Observable<Norma[]> {
    console.log(this.url);
    return this.http.get<Norma[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched normas')),
        catchError(this.handleError<Norma[]>('getNormas', []))
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
