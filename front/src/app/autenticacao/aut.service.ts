import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap, BehaviorSubject, map, catchError, of } from 'rxjs';
import { User } from '../shared/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AutService {

  private readonly url = 'http://localhost:3000/aut';
  private subjUser$: BehaviorSubject<any> = new BehaviorSubject(null);
  private logado$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  registro(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/registro`, user);
  }

  login(credenciais: { email: string, senha: string }): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credenciais)
      .pipe(
        tap((u: User) => {
          localStorage.setItem('token', u.token);
          this.logado$.next(true);
        })
      )
  }

  estaAutenticado(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token && !this.logado$.value) {
      return this.checkToken()
    }
    return this.logado$.asObservable();
  }

  checkToken(): Observable<boolean> {
    return this.http.get<User>(`${this.url}/user`)
      .pipe(
        tap((u: User) => {
          if (u) {
            localStorage.setItem('token', u.token);
            this.logado$.next(true);
            this.subjUser$.next(u);
          }
        }),
        map((u: User) => (u) ? true : false),
        catchError((err) => {
          this.logout();

          return of(false);
        })
      )
  }

  getUser(): Observable<User> {
    return this.subjUser$;
  }

  logout() {
    localStorage.removeItem('token');
    this.logado$.next(false);
    this.subjUser$.next(null);
  }
}
