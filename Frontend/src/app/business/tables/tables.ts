import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tasks } from '../../core/services/tasks/tasks';
import { response } from 'express';
import { Auth } from '../../core/services/auth/auth';
import { RouterLink, Router } from '@angular/router';

interface Tarea {
  _id: string;
  title: string;
  status: string;
  assignedTo: string;
  boardId: string;
  createdBy: string;
}

@Component({
  selector: 'app-tables',
  imports: [FormsModule, CommonModule],
  templateUrl: './tables.html',
  styleUrls: ['./tables.css'],
})
export class Tables {
  id: string = '';
  searchText: string = '';
  tareas: Tarea[] = [];
  ngOnInit() {
    this.auth.checkSession().subscribe({
      next: (res) => {
        const user = typeof res === 'string' ? JSON.parse(res).user : '';
        this.id = user?.id || '';
        if (this.id) {
          this.buscarTareas();
        }
      },
      error: (err) => {
        this.id = '';
      },
    });
  }
  constructor(private tasksService: Tasks, private auth: Auth,private router: Router) {}

  buscarTareas() {
  this.tasksService.Gettasklist(this.searchText, this.id).subscribe({
    next: (Response) => {
    this.tareas = (Response.response || []).map((t: Tarea) => t);
    },
    error: (err) => {
      this.tareas = [];
    },
  });
}
goToTask(boardId: string | number) {
    this.router.navigate(['/tasks', boardId]);
  }
}
