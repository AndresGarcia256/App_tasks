import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Boards {
  constructor(private httpCliente: HttpClient) { }
  // Esta funcion permite borrar el tablero generando una peticion al servidor
  DeleteBoard(idboard: string) {
    return this.httpCliente.delete(`http://localhost:3000/api/Tablero/borrartablero?id=${idboard}`);
  }

  // Esta funcion permite crear un tablero generando una peticion al servidor
  Createboard(userData: { name: string, description: string, ownerId: string, }) {
    return this.httpCliente.post('http://localhost:3000/api/Tablero/CreateBoard', userData);
  }
  // Esta funcion permite obtener todos los tableros a los que este asociado el usuario corresondiente
  Getboard(userId: string) {
    return this.httpCliente.get<any[]>(`http://localhost:3000/api/Tablero/Getpersonalboards?id=${userId}`);
  }

}
