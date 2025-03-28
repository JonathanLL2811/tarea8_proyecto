import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { home, images, person } from 'ionicons/icons'; // Importa los íconos
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class TabsPage {
  homeIcon = home;
  imagesIcon = images;
  personIcon = person;

  constructor(private router: Router) {
     addIcons({
      home: home,
      images: images,
      person: person,
    });
  }

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
