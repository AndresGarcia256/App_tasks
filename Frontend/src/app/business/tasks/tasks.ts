import { Component } from '@angular/core';
import { Tasks } from '../../core/services/tasks/tasks';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, ReactiveFormsModule,   CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Taskss {
    ngOnInit() {
    this.gettask();
  }
  tasks: any[] = [];
   tareasPorHacer: any[]  = [];
   tareasEnProgreso: any[]  = [];
   tareasCompletadas: any[]  = [];
  gettask() {
    if (!this.boardId) {
      console.error('No task found');
      return;
    }
    this.taskService.Gettask(this.boardId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
           this.tareasPorHacer = tasks.filter(t => t.status === 'por_hacer');
           this.tareasEnProgreso = tasks.filter(t => t.status === 'en_progreso');
           this.tareasCompletadas = tasks.filter(t => t.status === 'completada');
        console.log('Tasks fetched successfully:', tasks);
      },
      error: (err) => {
        console.log('Error fetching tasks:', err);
        this.tasks = [];
      }
    });
    }
  boardId: string | null = null;



  editIndex: number | null = null;
  editColumna: string = '';
  editValue: string = '';
  showEditForm: boolean = false;

  editarTarea(index: number, columna: string) {
  this.editIndex = index;
  this.editColumna = columna;
  if (columna === 'porHacer') this.editValue = this.tareasPorHacer[index].title;
  if (columna === 'enCurso') this.editValue = this.tareasEnProgreso[index].title;
  if (columna === 'finalizadas') this.editValue = this.tareasCompletadas[index].title;
  this.showEditForm = true;
}

  guardarEdicion() {
    if (this.editIndex !== null && this.editValue.trim() !== '') {
      if (this.editColumna === 'porHacer') this.tareasPorHacer[this.editIndex].title = this.editValue;
      if (this.editColumna === 'enCurso') this.tareasEnProgreso[this.editIndex].title = this.editValue;
      if (this.editColumna === 'finalizadas') this.tareasCompletadas[this.editIndex].title = this.editValue;
    }
    this.cancelarEdicion();
  }
  cancelarEdicion() {
    this.showEditForm = false;
    this.editIndex = null;
    this.editColumna = '';
    this.editValue = '';
  }

  eliminarTarea(index: number, columna: string) {
    if (columna === 'porHacer') this.tareasPorHacer.splice(index, 1);
    if (columna === 'enCurso') this.tareasEnProgreso.splice(index, 1);
    if (columna === 'finalizadas') this.tareasCompletadas.splice(index, 1);
  }

  agregarTarea(columna: string) {
    const nuevaTarea = prompt('Nueva tarea:');
    if (nuevaTarea && nuevaTarea.trim() !== '') {
      if (columna === 'porHacer') this.tareasPorHacer.push(nuevaTarea);
      if (columna === 'enCurso') this.tareasEnProgreso.push(nuevaTarea);
      if (columna === 'finalizadas') this.tareasCompletadas.push(nuevaTarea);
    }
  }
  
  constructor(private route: ActivatedRoute, private taskService: Tasks) {
    this.boardId = this.route.snapshot.paramMap.get('id');
    console.log('Board ID:', this.boardId);
  }



    Deletetasks(id: string) {
    this.taskService.Deletetask(id).subscribe({
      next: (res) => {
        console.log('Tablero eliminado:', res);
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
      }
    });
  }
}



