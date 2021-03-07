import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';
import { Incidentes } from '../model/incidentes';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  endpoint: string = environment.apiBaseUrl + '/incidentes';
  headers: HttpHeaders = new HttpHeaders(
    {
      "X-Api-Key": environment.apiKey,
      "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token"
    });

  getAll(): Observable<Incidentes[]> {
    return this.http.get<Incidentes[]>(this.endpoint, { headers: this.headers });
  }

  get(id: any): Observable<Incidentes> {
    return this.http.get<Incidentes>(this.endpoint + '/' + id, { headers: this.headers });
  }

  delete(id: any): Observable<object> {
    return this.http.delete(this.endpoint + '/' + id, { headers: this.headers });
  }

  post(incidente: Incidentes | undefined) {
    if (incidente !== undefined && incidente?.incidente_id === undefined) {
      incidente.incidente_id = uuidv4();
    }
    return this.http.post<Incidentes>(this.endpoint, JSON.stringify(incidente),{ headers: this.headers });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('IncidentesService: ${message}');
  }
}
