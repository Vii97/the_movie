import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Movie, MovieResponse } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiKey: string = environment.API_KEY;
  apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  // Pelis populares para la Home
  getPopularMovies(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }
  // Búsqueda de pelis (Search)
  searchMovies(query: string, page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=${page}`);
  }
  // Detalles de la película (Detail)
  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }
}
