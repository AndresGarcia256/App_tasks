import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Boards {
  private tokenKey = 'token';
  constructor(private httpCliente: HttpClient) { }


  Createboard(userData: { name: string; email: string; password: string }) {
    return this.httpCliente.post('http://localhost:3000/api/Getpersonalboards', userData);
  }

  Getboard(userId: string) {
    return this.httpCliente.get<any[]>(`http://localhost:3000/api/Tablero/Getpersonalboards?id=${userId}`);
  }
}
