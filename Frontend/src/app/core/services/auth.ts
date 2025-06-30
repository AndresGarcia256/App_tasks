import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private URL = 'http://localhost:3000/api/auth/Register';
  private tokenKey = 'token';
  
  constructor(private httpCliente: HttpClient) { }

  
  register(userData: { name: string; email: string; password: string }) {
    return this.httpCliente.post(this.URL, userData);
  }
  login(email: string, password: string) {
    return this.httpCliente.post(
      'http://localhost:3000/api/auth/Login',
      { email, password, redirect: false },
      {
        withCredentials: true,
        headers: { 'Accept': 'application/json' },
        responseType: 'text'
      }
    );
  }
  // En tu servicio Auth de Angular
 logout() {
  return this.httpCliente.post('http://localhost:3000/api/auth/signout', {}, {
    withCredentials: true,
    headers: { 'Accept': 'application/json' },
    responseType: 'text'
  }).pipe(
    // Limpiar cache después de la respuesta del backend
    tap(() => {
      localStorage.clear();
      sessionStorage.clear();

    })
  );
}
  checkSession() {
    return this.httpCliente.get('http://localhost:3000/api/auth/sesion', {
      withCredentials: true,
      headers: { 'Accept': 'application/json' },
      responseType: 'text'
    });
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey) || !!sessionStorage.getItem(this.tokenKey);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:4200",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Credentials": "true"
    }
  });
}