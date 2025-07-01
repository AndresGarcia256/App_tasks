import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Tasks {
  private tokenKey = 'token';
  constructor(private httpCliente: HttpClient) { }
  Deletetask(idboard: string) {
    return this.httpCliente.delete(`http://localhost:3000/api/Tablero/borrartablero?id=${idboard}`);
  }

  Createtask(userData: { name: string, description: string, ownerId: string }) {
    return this.httpCliente.post('http://localhost:3000/api/Tarea/CreateTask', userData);
  }

  Gettask(boardId: string) {
    return this.httpCliente.get<any[]>(`http://localhost:3000/api/Tarea/Gettasks?id=${boardId}`);
  }

}
