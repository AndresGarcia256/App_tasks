import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  constructor(private httpCliente: HttpClient) {}

  //Esta funcion permite borrar tareas recibiendo el id de la tarea
  Deletetask(idtask: string) {
    return this.httpCliente.delete(
      `http://localhost:3000/api/Tarea/borrartarea?id=${idtask}`
    );
  }
  // Esta funcion permite crear una tarea envviando toda la informacion necesaria para crear la tarea
  Createtask(taskData: {
    title: string;
    status: string;
    assignedTo: string;
    boardId: string;
    createdBy: string;
  }) {
    return this.httpCliente.post(
      'http://localhost:3000/api/Tarea/CreateTask',
      taskData
    );
  }
  // Esta funcion permite obtener todas las tareas asociadas a un tablero
  Gettask(boardId: string) {
    return this.httpCliente.get<any>(
      `http://localhost:3000/api/Tarea/Gettasks?id=${boardId}`,
      {
        responseType: 'json',
      }
    );
  }
  // Esta funcion permite obtener obtener toda la lista de tareas asociadas a una cuenta por owner id, ademas busca entre un arreglo de ellas
  Gettasklist(search: string, ownerId: string) {
    return this.httpCliente.post<any>(
      'http://localhost:3000/api/Tarea/FindTasks',
      { search, ownerId }
    );
  }
  // Esta funcion permite editar componentes claves de las tareas
  editTask2(id: string, title: string, status: string) {
    console.log(id,title,status);
  return this.httpCliente.put<any>(
    `http://localhost:3000/api/Tarea/edittask`,
    { _id: id, title: title, status: status }
  );
}
}
