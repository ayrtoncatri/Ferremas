import { Component } from '@angular/core';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private navigationService: NavigationService) {}

  goToPayment() {
    this.navigationService.goToPayment();
  }

}
