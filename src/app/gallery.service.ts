import { Injectable } from '@angular/core';
import { Firestore, collection, query, getDocs, Timestamp } from '@angular/fire/firestore';

interface GalleryItem {
  active: boolean;
  createBy: string;
  createdAt: Timestamp;
  description: string;
  photo: string;
  placeName: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private firestore: Firestore) {}

  async getGalleries(): Promise<GalleryItem[]> {
    try {
      const galleriesCollection = collection(this.firestore, 'galleries');
      const q = query(galleriesCollection); // Consulta simplificada
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data() as GalleryItem;
        return {
          ...data,
        };
      });
    } catch (error) {
      console.error('Error al obtener las galerías:', error);
      return [];
    }
  }
}