import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  
  errorMsg: string | null = null;

  constructor(private auth: Auth, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.auth.login(
        formData.email ?? '',
        formData.password ?? ''
      ).subscribe({
        next: res => {
          console.log('Login exitoso', res);
          this.router.navigate(['/dashboard']); 
          this.errorMsg = null;
        },
        error: err => {
          console.error('Error en login', err);
          this.errorMsg = err.error.error || 'El correo o la contraseña son incorrectos';
        }
      });
    }
  }
}