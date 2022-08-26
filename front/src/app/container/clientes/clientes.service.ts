import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Cliente } from 'src/app/shared/models/clientes.models';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly url: string = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  get(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  };

  add(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente)
  };

  edit(cliente: Cliente): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.url}/${cliente._id}`, cliente);
  };

  delete(cliente: Cliente): Observable<any> {
    return this.http.delete(`${this.url}/${cliente._id}`)
  };

  notificacao(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 })
  };


}
