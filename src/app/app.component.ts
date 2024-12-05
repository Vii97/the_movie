import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private router:Router){}
  title = 'themovie';
  movie: any;
  ngOnInit(): void {
    
  }

  OnSearch(query:string){
    query = query.trim();
    if(query.length === 0){
      return;
    }
    this.router.navigate(['/search', query]);
  }


}
