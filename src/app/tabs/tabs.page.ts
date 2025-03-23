import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule], // Agrega IonicModule y CommonModule a imports
})
export class TabsPage {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/tabs/home']);
  }

  navigateToGallery() {
    this.router.navigate(['/tabs/gallery']);
  }

  navigateToProfile() {
    this.router.navigate(['/tabs/profile']);
  }
}