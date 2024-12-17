import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { Movie, MovieResponse } from '../../shared/models/movie';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../shared/services/favorites.service';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  searchQuery: string = '';
  selectedGenre: number | null = null;
  currentPage = 1;  
  totalPages = 0;  

  constructor(
    private movieService: MovieService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadPopularMovies();
  }

  loadPopularMovies() {
    this.movieService.getPopularMovies(this.currentPage).subscribe({
      next: (response: MovieResponse) => {
        const favoriteMovies = this.favoriteService.getAllFavMovies();

        this.movies = response.results?.map((movie) => ({
          ...movie,
          is_favorite: favoriteMovies.some((favMovie) => favMovie.id === movie.id),
        })) || [];
        
        this.totalPages = response.total_pages || 1;
      },
      error: (error) => {
        console.error('Error fetching popular movies:', error);
      },
    });
  }

  toggleFavorite(movie: Movie) {
    if (movie.is_favorite) {
      this.favoriteService.removeFromFavorites(movie.id);
      movie.is_favorite = false;
    } else {
      this.favoriteService.saveFavMovie(movie);
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPopularMovies();
    window.scrollTo(0, 0);
  }
}
