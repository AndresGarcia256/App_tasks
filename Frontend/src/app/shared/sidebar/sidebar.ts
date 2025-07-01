import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Auth } from '../../core/services/auth/auth.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  constructor(private auth: Auth, private router: Router) {}

  logout() {
    this.auth.logout().subscribe({
      next: res => {
        console.log('Sesión cerrada', res);
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Error al cerrar sesión', err);
      }
    });
  }
}
