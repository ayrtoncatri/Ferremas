import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = { username: '', password: '', name: '', rut: '', role: '' };
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register(user: any) {
    this.authService.register(user.username, user.password, user.name, user.rut, user.role).subscribe(response => {
      console.log('Usuario registrado', response);
      // Aquí puedes agregar lógica adicional, como redirigir al usuario o mostrar un mensaje de éxito
      this.router.navigate(['/login']);
    });
  }

  login(credentials: any) {
    this.authService.login(credentials.username, credentials.password).subscribe(response => {
      console.log('Inicio de sesión exitoso', response);
      // Aquí puedes agregar lógica adicional, como almacenar el token y redirigir al usuario
      localStorage.setItem('token', response.token);
    });
  }
  // constructor(private authService: AuthService) {}

  // register(user: any) {
  //   this.authService.register(user.username, user.password, user.name, user.rut, user.role).subscribe(response => {
  //     console.log('Usuario registrado', response);
  //   });
  // }

  // login(credentials: any) {
  //   this.authService.login(credentials.username, credentials.password).subscribe(response => {
  //     console.log('Inicio de sesión exitoso', response);
  //   });
  // }

}
