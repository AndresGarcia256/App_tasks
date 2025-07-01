import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  errorMsg: string | null = null;

  constructor(private auth: Auth, private router: Router) {}
 // Cuando se le de click al boton tomara los datos del formulario y los enviara para consumir el servicio para registrar una cuenta nueva
  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.auth.register({
        name: formData.name ?? '',
        email: formData.email ?? '',
        password: formData.password ?? ''
      }).subscribe({
        next: res => {
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

          this.errorMsg = null;
        },
        error: err => {
          console.error('Error en registro', err);
          this.errorMsg = err.error.error || 'El correo ya esta registrado';
        }
      });
    }
  }
}