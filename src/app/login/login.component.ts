import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule],
})
export class LoginComponent {
  email = '';
  password = '';
  resetEmail = '';
  showResetPassword = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async resetPassword() {
    try {
      await this.authService.resetPassword(this.resetEmail);
      alert('Se ha enviado un correo electrónico para restablecer la contraseña.');
      this.showResetPassword = false;
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  toggleResetPassword() {
    this.showResetPassword = !this.showResetPassword;
    this.errorMessage = '';
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}