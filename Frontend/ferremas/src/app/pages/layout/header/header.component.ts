import { Component } from '@angular/core';
import { NavigationService } from 'src/services/navigation.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',


  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private navigationService: NavigationService, private authService: AuthService, private router: Router) {}

  goToPayment() {


    this.navigationService.goToPayment();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}

