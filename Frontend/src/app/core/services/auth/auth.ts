import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private httpCliente: HttpClient) { }

  //Esta funcion permite hacer el registro en la apliacion
  register(userData: { name: string; email: string; password: string }) {
    return this.httpCliente.post('http://localhost:3000/api/auth/Register', userData);
  }

  // Esta funcion permite hacer login haciendo un llamado al backend
  login(email: string, password: string) {
    return this.httpCliente.post(
      'http://localhost:3000/api/auth/Login',
      { email, password, redirect: false },
      {
        withCredentials: true,
        headers: { 'Accept': 'application/json' }
      }
    );
  }
  // Este funcion permite borrar la informacion de lacockie al cerrar la cuenta borrando asi la sesion 
 logout() {
  return this.httpCliente.post('http://localhost:3000/api/auth/signout', {}, {
    withCredentials: true,
    headers: { 'Accept': 'application/json' },
    responseType: 'text'
  }).pipe(
    tap(() => {
      localStorage.clear();
      sessionStorage.clear();

    })
  );
}
  //esta funcion permite revisar si la sesion sigue iniciada
  checkSession() {
    return this.httpCliente.get('http://localhost:3000/api/auth/sesion', {
      withCredentials: true,
      headers: { 'Accept': 'application/json' },
      responseType: 'text'
    });
  }
}
