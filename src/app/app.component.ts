import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'threads-app';
  userService = inject(UserService);
  constructor() {
    const user = this.userService.getUserFromStorage();
    if (!user) {
      const randomNumber = Math.ceil(Math.random() * 5000 + 1000);
      const randomName = `user_${randomNumber}`;
      this.userService.createUser(randomName).subscribe((user) => {
        console.log('user created', user);
        this.userService.saveUserToStorage(user as User)
      });
    }
  }
}
