import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  user = { username: '', password: '', name: '', rut: '', role: '' };
  credentials = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user.username, this.user.password, this.user.name, this.user.rut, this.user.role).subscribe(
      response => {
        console.log('Usuario registrado', response);
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = 'Error al registrar usuario';
        console.error('Error al registrar usuario', error);
      }
    );
  }

  login() {
    this.authService.login(this.credentials.username, this.credentials.password).subscribe(
      response => {
        console.log('Inicio de sesión exitoso', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = 'Credenciales inválidas';
        console.error('Error al iniciar sesión', error);
      }
    );
  }

}
