import { Component } from '@angular/core';
import { Boards } from '../../core/services/boards';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  id: string = '';
  boards: any[] = [];

  constructor(private auth: Auth, private boardsService: Boards) {}

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
  onAddBoard() {
    
    // Aquí abres un modal, navegas o ejecutas la lógica para crear un tablero
}
}
