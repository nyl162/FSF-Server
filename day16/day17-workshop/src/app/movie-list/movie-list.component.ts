import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movieList=[{"title":"ACADEMY DINOSAUR","url":"/film/1"},{"title":"ACE GOLDFINGER","url":"/film/2"},{"title":"ADAPTATION HOLES","url":"/film/3"},{"title":"AFFAIR PREJUDICE","url":"/film/4"},{"title":"AFRICAN EGG","url":"/film/5"},{"title":"AGENT TRUMAN","url":"/film/6"},{"title":"AIRPLANE SIERRA","url":"/film/7"},{"title":"AIRPORT POLLOCK","url":"/film/8"},{"title":"ALABAMA DEVIL","url":"/film/9"},{"title":"ALADDIN CALENDAR","url":"/film/10"},{"title":"ALAMO VIDEOTAPE","url":"/film/11"},{"title":"ALASKA PHANTOM","url":"/film/12"},{"title":"ALI FOREVER","url":"/film/13"},{"title":"ALICE FANTASIA","url":"/film/14"},{"title":"ALIEN CENTER","url":"/film/15"},{"title":"ALLEY EVOLUTION","url":"/film/16"},{"title":"ALONE TRIP","url":"/film/17"},{"title":"ALTER VICTORY","url":"/film/18"}]
  
  constructor(private movieSvc:MovieService) { }

  ngOnInit() {
    this.movieSvc.getAllMovies({limit:3, offset: 0}).subscribe((results)=>{
      console.log(results);
      this.movieList = results;
    });
  }

  urlClick(x:string){
    console.log(x);
  }

  prev(){

  }

  next(){

  }

}
