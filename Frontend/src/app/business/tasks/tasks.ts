import { Component } from '@angular/core';
import { Tasks } from '../../core/services/tasks/tasks';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../core/services/auth/auth';
import { ConstantPool } from '@angular/compiler';

interface Tarea {
  _id: string;
  title: string;
  status: string;
  assignedTo: string;
  boardId: string;
  createdBy: string;
}
@Component({
  selector: 'app-tasks',
  imports: [CommonModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})

export class Taskss {
  id: string = '';
  tasks: any = [];
  tareasPorHacer: Tarea[] = [];
  tareasEnProgreso: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];

  boardId: string | null = null;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private taskService: Tasks
  ) {
    this.boardId = this.route.snapshot.paramMap.get('id');
    console.log('Board ID:', this.boardId);
  }
  //Metodo para borrar tareas
  Deletetasks(id: string) {
    this.taskService.Deletetask(id).subscribe({
      next: (res) => {
        console.log('Tablero eliminado:', res);
        this.gettask();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
      },
    });
  }
  //metodo para crear tareas
  createtask(
    title: string,
    status: string,
    assignedTo: string,
    boardId: string,
    createdBy: string
  ) {
    const userData = { title, status, assignedTo, boardId, createdBy };
    this.taskService.Createtask(userData).subscribe({
      next: (res) => {
        console.log('Tarea editada:', res);
        this.gettask();
      },
      error: (err) => {
        console.error('Error al editar:', err);
        this.gettask();
      },
    });
  }

  createTaskFormVisible: boolean = false;
  newTaskTitle: string = '';
  newTaskStatus: string = '';
  newTaskAssignedTo: string = '';
  newTaskBoardId: string = '';
  newTaskCreatedBy: string = '';

  showCreateTaskForm(status: string) {
    this.createTaskFormVisible = true;
    this.newTaskTitle = '';
    this.newTaskStatus = status;
    this.newTaskAssignedTo = this.id;
    this.newTaskBoardId = this.boardId ?? '';
    this.newTaskCreatedBy = this.id;
  }

  cancelCreateTask() {
    this.createTaskFormVisible = false;
  }

  saveCreateTask() {
    this.createtask(
      this.newTaskTitle,
      this.newTaskStatus,
      this.newTaskAssignedTo,
      this.newTaskBoardId,
      this.newTaskCreatedBy
    );
    this.createTaskFormVisible = false;
  }
  //Editar tareas

  editID: string = "";
  editStatus: string = '';
  editValue: string = '';
  showEditForm: boolean = false;

  cancelarEdicion() {
    this.showEditForm = false;
    this.editValue = '';
  }
  editTask(title:string, status:string,id:string) {
    this.editID = id;
    this.showEditForm = true;
    this.editValue = title;
    this.editStatus = status ;
    console.log(this.editID , this.editValue, this.editStatus);
  }

  Savetask() {
  this.taskService.editTask2( this.editID,this.editValue, this.editStatus)
    .subscribe({
      next: (response) => {
        this.gettask();
        this.showEditForm = false;
      },
      error: (err) => {
        this.gettask();
        alert("Error al actualizar la tarea");
      }
    });
  }

  //Metodo para recuperar las tareas de la base de datos
  gettask() {
    if (!this.boardId) {
      console.error('No task found');
      return;
    }
    this.taskService.Gettask(this.boardId).subscribe({
      next: (response) => {
        const tasks = response.data;
        this.tasks = tasks;
        this.tareasPorHacer = tasks.filter(
          (t: Tarea) => t.status === 'por_hacer'
        );
        this.tareasEnProgreso = tasks.filter(
          (t: Tarea) => t.status === 'en_progreso'
        );
        this.tareasCompletadas = tasks.filter(
          (t: Tarea) => t.status === 'completada'
        );
        console.log('Tasks fetched and classified:', {
          por_hacer: this.tareasPorHacer,
          enCurso: this.tareasEnProgreso,
          finalizadas: this.tareasCompletadas,
        });
      },
      error: (err) => {
        console.log('Error fetching tasks:', err);
        this.tasks = [];
        this.tareasPorHacer = [];
        this.tareasEnProgreso = [];
        this.tareasCompletadas = [];
      },
    });
  }

  //Metodo que se iniciar al abrir la pantalla
  ngOnInit() {
    this.auth.checkSession().subscribe({
      next: (res) => {
        const user = typeof res === 'string' ? JSON.parse(res).user : '';
        this.id = user?.id || '';
        if (this.id) {
          this.gettask();
        }
      },
      error: (err) => {
        this.id = '';
      },
    });
    this.gettask();
  }
}
