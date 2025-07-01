import { Component } from '@angular/core';
import { Boards } from '../../core/services/board/boards';
import { Auth } from '../../core/services/auth/auth';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  id: string = '';
  email: string = '';
  boards: any[] = [];
  showAddForm = false;

  boardForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private auth: Auth,
    private boardsService: Boards,
    private fb: FormBuilder
  ) {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  //Metodo que se tomara cuando se inicie la pantalla
  ngOnInit() {
    this.auth.checkSession().subscribe({
      next: (res) => {
        const user = typeof res === 'string' ? JSON.parse(res).user : '';
        this.id = user?.id || '';
        if (this.id) {
          this.getBoards();
        }
        this.email = user?.email || '';
        if (this.email) {
          this.getBoards();
        }
        
      },
      error: (err) => {
        this.id = '';
      },
    });
  }
  //metodo que tomara los tableros de la base de datos
  getBoards() {
    this.boardsService.Getboard(this.id).subscribe({
      next: (boards) => {
        this.boards = boards;
        console.log('Boards fetched successfully:', boards);
      },
      error: (err) => {
        console.log('Error fetching boards:', err);
        this.boards = [];
      },
    });
  }
  //metodo que mostrar el formulario para crear un nuevo tablero
  showAddFormToggle() {
    this.showAddForm = true;
    this.boardForm.reset();
  }

  onSubmit() {
    if (this.boardForm.valid) {
      const newBoard = {
        ...this.boardForm.value,
        ownerId: this.id,
      };
      this.boardsService.Createboard(newBoard as any).subscribe({
        next: (res) => {
          console.log('Tablero Creado:', res);
          this.showAddForm = false;
          this.getBoards();
        },
        error: (err) => {
          this.showAddForm = false;
          console.error('Error al eliminar:', err);
          this.getBoards();
        },
      });
    }
  }
  //Metodo para borrar tableros que ya no se usaran
  DeleteBoard(id: string) {
    this.boardsService.DeleteBoard(id).subscribe({
      next: (res) => {
        console.log('Tablero eliminado:', res);
        this.getBoards();
      },
      error: (err) => {
        this.getBoards();
        console.error('Error al eliminar:', err);
      },
    });
  }
}
