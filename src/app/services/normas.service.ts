import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Notificacao } from '../model/notificacao';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';
import { Norma } from '../model/norma';

@Injectable({
  providedIn: 'root'
})
export class NormasService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  endpoint:string = environment.apiBaseUrl + '/normas';
  normas: Norma[] | undefined;

  getAll(): Observable<Norma[]> {
    return this.http.get<Norma[]>(this.endpoint);
  }

  get(id: any): Observable<Norma> {
    return this.http.get<Norma>(this.endpoint + '/' + id);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('NormasService: ${message}');
  }
}
