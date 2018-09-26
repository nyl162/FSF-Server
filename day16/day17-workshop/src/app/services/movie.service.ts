import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  finalSearchCriteria:string;
  criteria = {limit: 50,offset:0}

  constructor(private http:HttpClient) { }

  getAllMovies() : Observable<any>{
    let qs = {params: new HttpParams().set('limit', ""+this.criteria.limit).set('offset', ""+this.criteria.offset)};

    //return this.http.get('/api/cart', qs);
    //this.finalSearchCriteria = `/books?offset=${criteria.offset}&limit=${criteria.limit}&keyword=${criteria.keyword}&selectionType=${criteria.selectionType}`;
    //console.log(this.finalSearchCriteria);
    return this.http
      .get(`${environment.api_url}/films`,qs)
      .pipe(
        catchError(this.handleError('getAllBooks', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
