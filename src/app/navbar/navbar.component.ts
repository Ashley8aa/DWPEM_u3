import { Component } from '@angular/core';
import { LandingComponent } from '../landing/landing.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LandingComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
