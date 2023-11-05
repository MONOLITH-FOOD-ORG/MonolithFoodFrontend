import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { circle } from './navbar.animations';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.scss'],
  animations: [circle],
})
export class PrivateNavbarComponent {
  title?: string;
  titleSub?: Subscription;
  isMenuVisible: boolean = false;
  darkMode: boolean = true;
  notifications: boolean = false;

  constructor(private globalService: GlobalService) {
    this.titleSub = this.globalService.currentTitle$.subscribe(
      (title) => (this.title = title)
    );
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }

  toggleNotifications(): void {
    this.notifications = !this.notifications;
  }

  logout(): void {}
}
