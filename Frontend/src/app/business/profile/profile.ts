import { Component, OnInit } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  nombre: string = '';
  email: string = '';

  constructor(private auth: Auth) {}
  // Esto tomara la informacion del usuario para mostrarla cuando haga click en el perfil
  ngOnInit() {
    this.auth.checkSession().subscribe({
      next: (res) => {
        const user = typeof res === 'string' ? JSON.parse(res).user : "";
        this.nombre = user?.name || '';
        this.email = user?.email || '';
      },
      error: (err) => {
        this.nombre = '';
        this.email = '';
      }
    });
  }

}
