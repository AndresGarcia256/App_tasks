import { Component } from '@angular/core';
import { Boards } from '../../core/services/board/boards';
import { Auth } from '../../core/services/auth/auth';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  id: string = '';
  boards: any[] = [];
  showAddForm = false;

  boardForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });
  constructor(private auth: Auth, private boardsService: Boards, private fb: FormBuilder) {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.auth.checkSession().subscribe({
      next: (res) => {
        const user = typeof res === 'string' ? JSON.parse(res).user : "";
        this.id = user?.id || '';
        if (this.id) {
          this.getBoards();
        }
      },
      error: (err) => {
        this.id = '';
      }
    });
  }

  getBoards() {
    this.boardsService.Getboard(this.id).subscribe({
      next: (boards) => {
        
        this.boards = boards;
        console.log('Boards fetched successfully:', boards);
      },
      error: (err) => {
        console.log('Error fetching boards:', err);
        this.boards = [];
      }
    });
  }

showAddFormToggle() {
  this.showAddForm = true;
  this.boardForm.reset();
}

onSubmit() {
  if (this.boardForm.valid) {
    const newBoard = {
      ...this.boardForm.value,
      ownerId: this.id
    };
    this.boardsService.Createboard(newBoard as any).subscribe(() => {
      this.showAddForm = false;
      this.boardForm.reset();
      this.getBoards();
    });
  }
  this.getBoards();
  }
  DeleteBoard(id: string) {
    this.boardsService.DeleteBoard(id).subscribe({
      next: (res) => {
        console.log('Tablero eliminado:', res);
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
      }
    });
  }
}

