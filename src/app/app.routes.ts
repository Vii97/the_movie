import { Routes } from '@angular/router'
import { HomeComponent } from './public/home/home.component';
import { DetailComponent } from './public/detail/detail.component';
import { FavoritesComponent } from './public/favorites/favorites.component';
import { SearchComponent } from './public/search/search.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movie/:id', component: DetailComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'search/:title', component: SearchComponent}
];
