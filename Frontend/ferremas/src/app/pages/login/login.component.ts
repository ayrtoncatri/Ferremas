import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        const userRole = this.authService.getRoleFromToken(response.token);
        if (userRole === 'admin') {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/auth']);
        }
      },
      (error) => {
        this.errorMessage = 'Credenciales inválidas';
        this.router.navigate(['/auth']);
      }
    );
  }
}
