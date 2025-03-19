import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GalleryService } from './gallery.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class GalleryPage implements OnInit {
  galleries: Observable<any[]> | null = null; // Inicializar con null

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.galleries = this.galleryService.getGalleries();
  }
}