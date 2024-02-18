import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, of } from 'rxjs';
import { Participante } from '../model/participante';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  private readonly API = 'http://localhost:8080/api/participante';

  constructor(private httpCliente: HttpClient) { }

  list() {
    return this.httpCliente.get<Participante[]>(this.API)
      .pipe(
        first(),
        catchError(error => {
          return of([]);
        })
      );
  }

  remove(id: number){
    return this.httpCliente.delete(this.API + `/${id}`);
  }

  retrieveById(id: number){
    return this.httpCliente.get<Participante>(this.API + `/${id}`);
  }

  create(payload: Participante){
    return this.httpCliente.post<Participante>(this.API, payload);
  }

  update(id: number, payload: Participante){
    return this.httpCliente.put<Participante>(this.API + `/${id}`, payload);
  }
}
