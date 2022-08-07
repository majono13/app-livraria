import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Livro } from './models/livros.models';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private readonly url: string = 'http://localhost:3000'
  categorias: string[] = [
    'Terror', 'Ação', 'Comédia', 'Didático', 'Autoconhecimento', 'Fantasia', 'Romance', 'Infantil', 'Fábulas', 'Contos', 'Drama', 'Clássicos'
  ]

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  get(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.url}/livros`)
  }

  delete(livro: Livro): Observable<any> {
    return this.http.delete(`${this.url}/livros/${livro._id}`)

  }

  add(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.url}/livros`, livro)

  }

  edit(livro: Livro): Observable<Livro> {
    return this.http.patch<Livro>(`${this.url}/livros/${livro._id}`, livro)
  }

  notificacao(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 })
  }


}
