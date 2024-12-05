import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../shared/services/favorites.service';
import { RouterLink } from '@angular/router';
import { Movie } from '../../shared/models/movie';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: Movie[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteMovies = this.favoritesService.getAllFavMovies();
  }

  removeFromFavorites(movie: Movie) {
    this.favoritesService.removeFromFavorites(movie.id);
    this.loadFavorites();
  }
}