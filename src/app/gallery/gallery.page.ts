import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GalleryService } from '../gallery.service';
import { Timestamp } from '@angular/fire/firestore';

interface GalleryItem {
  active: boolean;
  createBy: string;
  createdAt: Timestamp;
  description: string;
  photo: string;
  placeName: string;
  uid: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class GalleryPage implements OnInit {
  galleries: GalleryItem[] = [];
  isLoading = true;

  constructor(private galleryService: GalleryService) {}

  async ngOnInit() {
    try {
      this.galleries = await this.galleryService.getGalleries();
    } catch (error) {
      console.error('Error al cargar las galerías:', error);
    } finally {
      this.isLoading = false;
    }
  }
}