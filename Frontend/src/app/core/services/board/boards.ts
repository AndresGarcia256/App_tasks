import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Boards {
  private tokenKey = 'token';
  constructor(private httpCliente: HttpClient) { }
  DeleteBoard(idboard: string) {
    return this.httpCliente.delete(`http://localhost:3000/api/Tablero/borrartablero?id=${idboard}`);
  }

  Createboard(userData: { name: string, description: string, ownerId: string, }) {
    return this.httpCliente.post('http://localhost:3000/api/Tablero/CreateBoard', userData);
  }

  Getboard(userId: string) {
    return this.httpCliente.get<any[]>(`http://localhost:3000/api/Tablero/Getpersonalboards?id=${userId}`);
  }

}
