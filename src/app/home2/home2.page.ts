import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule], // Import HttpClientModule
})
export class HomePage implements OnInit {
  characters$: Observable<any> | undefined;
  characters: Character[] = [];
  loading: boolean = true;
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.loading = true;
     this.homeService.getCharacters().subscribe({
      next: (data: any) => {
        this.characters = data.results;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error fetching characters:', error);
        this.loading = false;
      }
    });
  }
}
