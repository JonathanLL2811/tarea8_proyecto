import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos la interfaz CharacterDto
interface CharacterDto {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  // Función para obtener los personajes de la API
  getCharacters(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
