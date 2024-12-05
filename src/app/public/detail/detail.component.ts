import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { Movie } from '../../shared/models/movie';
import { FavoritesService } from '../../shared/services/favorites.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    this.movieService.getMovieDetails(movieId).subscribe((data) => {
      this.movie = data;
      this.IsFavorite();
    });
  }

  IsFavorite() {
    if (this.movie) {
      const favorites = this.favoriteService.getAllFavMovies();
      this.movie.is_favorite = favorites.some(fav => fav.id === this.movie?.id);
    }
  }
  
// Like
  toggleFavorite(movie: Movie) {
    if (movie.is_favorite) {
      this.favoriteService.removeFromFavorites(movie.id);
      movie.is_favorite = false;
    } else {
      this.favoriteService.saveFavMovie(movie);
      this.movie.is_favorite = true;
    }
  }
}
