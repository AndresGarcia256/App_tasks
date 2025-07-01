import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  nombre: string = '';
  email: string = '';

  constructor(private auth: Auth) {}
  //Cada vez que se inia el componente carga la informacion del nombre del usuario para ser motrado en el componente
  ngOnInit() {
    this.auth.checkSession().subscribe({
      next: (res) => {
        const user = typeof res === 'string' ? JSON.parse(res).user : "";
        this.nombre = user?.name || '';
      },
      error: (err) => {
        this.nombre = '';
      }
    });
  }
  
}


