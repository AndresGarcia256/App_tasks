import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';

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

}