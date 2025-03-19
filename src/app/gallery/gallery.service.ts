import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, orderBy, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private firestore: Firestore) {}

  getGalleries(): Observable<any[]> {
    const galleriesCollection = collection(this.firestore, 'galleries');
    const q = query(
      galleriesCollection,
      where('active', '==', true),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
}