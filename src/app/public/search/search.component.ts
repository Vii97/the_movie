import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie, MovieResponse } from '../../shared/models/movie';
import { FavoritesService } from '../../shared/services/favorites.service';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  
  query='';
  movies:Movie[]=[];
  noMovie='';
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private activatedRoute:ActivatedRoute, 
              private movieService: MovieService,
              private favoriteService: FavoritesService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.query = params['title'];
      this.searchMovies();
    });
  }

  searchMovies() {
    if (this.query.trim()) {
      this.movieService.searchMovies(this.query, this.currentPage).subscribe({
        next: (response) => {
          this.movies = response.results || [];
          if (this.movies.length === 0) {
            this.noMovie = 'Movies not found.';
          } else {
            this.noMovie = '';
          }
          this.totalPages = response.total_pages || 0;
        },
        error: (error) => {
          console.error('Error searching movies:', error);
          this.noMovie = 'Error searching movies:';
        }
      });
    }
  }

  toggleFavorite(movie: Movie) {
    movie.is_favorite = !movie.is_favorite;
    if (movie.is_favorite) {
      this.favoriteService.saveFavMovie(movie);
    } else {
      this.favoriteService.removeFromFavorites(movie.id);
    }
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.searchMovies();
    window.scrollTo(0, 0);
  }
}
