import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

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

  constructor(private auth: Auth) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.auth.register({
        name: formData.name ?? '',
        email: formData.email ?? '',
        password: formData.password ?? ''
      }).subscribe({
        next: res => {
          console.log('Registro exitoso', res);
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