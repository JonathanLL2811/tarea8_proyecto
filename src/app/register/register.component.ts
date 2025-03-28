import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta al servicio AuthService sea correcta
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IonicModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      identityNumber: ['', [Validators.required, Validators.minLength(13), Validators.pattern(/^[0-9]+$/)]], // Validación de 13 dígitos
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]+$/)]],     // Validación de 8 dígitos
    });
  }

  async register() {
    if (this.registerForm.valid) {
      try {
        const { email, password, firstName, lastName, identityNumber, phoneNumber } = this.registerForm.value;
        // Llama al servicio de autenticación con todos los datos
        await this.authService.register(email, password, firstName, lastName, identityNumber, phoneNumber);
        this.router.navigate(['/login']); // Redirige a la página de inicio después del registro
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }

  // Getters para acceder fácilmente a los controles del formulario
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get identityNumber() { return this.registerForm.get('identityNumber'); }
  get phoneNumber() { return this.registerForm.get('phoneNumber'); }
}
