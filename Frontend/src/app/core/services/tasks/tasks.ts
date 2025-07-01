import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private tokenKey = 'token';
  constructor(private httpCliente: HttpClient) {}
  Deletetask(idboard: string) {
    return this.httpCliente.delete(
      `http://localhost:3000/api/Tarea/borrartarea?id=${idboard}`
    );
  }

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

  Gettask(boardId: string) {
    return this.httpCliente.get<any>(
      `http://localhost:3000/api/Tarea/Gettasks?id=${boardId}`,
      {
        responseType: 'json',
      }
    );
  }
  Gettasklist(search: string, ownerId: string) {
    return this.httpCliente.post<any>(
      'http://localhost:3000/api/Tarea/FindTasks',
      { search, ownerId }
    );
  }
  editTask2(id: string, title: string, status: string) {
    console.log(id,title,status);
  return this.httpCliente.put<any>(
    `http://localhost:3000/api/Tarea/edittask`,
    { _id: id, title: title, status: status }
  );
}
}
