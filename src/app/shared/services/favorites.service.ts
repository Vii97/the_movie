import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  // LocalStorage
  private favoritesMovies: Movie[] = this.getAllFavMovies();

  _KEYMOVIE = "favorites"

  constructor() { }

  // Guardar
  saveFavMovie(movie: Movie) { 
    const exists = this.favoritesMovies.some(fav => fav.id === movie.id);

    if (!exists) {
       movie.is_favorite = true;
    this.favoritesMovies.push(movie);
    localStorage.setItem(
      this._KEYMOVIE,
      JSON.stringify(this.favoritesMovies)
    );
    }
  }

  // Obtener todas
  getAllFavMovies(): Movie[] { 
    return JSON.parse(localStorage.getItem(this._KEYMOVIE) || '[]');
  }
  // Borrar de favoritos
  removeFromFavorites(id: number | undefined): void {
    this.favoritesMovies = this.favoritesMovies.filter(
      (movie) => movie.id !== id
    );
    localStorage.setItem(
      this._KEYMOVIE,
      JSON.stringify(this.favoritesMovies)
    );
  }


}
