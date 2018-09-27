import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {AddCriteria,QueryCriteria} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class GroceryServiceService {
  criteria : QueryCriteria = {
    name:"bp",
    brand:"",
    order:0,
    limit: environment.svcLimit,
    offset:0
  }
  //name=&brand=&order=&limit=b&offset=a

  constructor(private http:HttpClient) { }

  searchGrosery() : Observable<any>{

    console.log(this.criteria);
    //let qs = {params: new HttpParams()};

    //return this.http.get('/api/cart', qs);
    //this.finalSearchCriteria = `/books?offset=${criteria.offset}&limit=${criteria.limit}&keyword=${criteria.keyword}&selectionType=${criteria.selectionType}`;
    //console.log(this.finalSearchCriteria);
    return this.http.post(`${environment.api_url}/grocery`,this.criteria)
      .pipe(
        catchError(this.handleError('searchGrosery', []))
      );
  }

  
  searchGrosery2(n:number) : Observable<any>{

    console.log(this.criteria);
    //let qs = {params: new HttpParams()};

    //return this.http.get('/api/cart', qs);
    //this.finalSearchCriteria = `/books?offset=${criteria.offset}&limit=${criteria.limit}&keyword=${criteria.keyword}&selectionType=${criteria.selectionType}`;
    //console.log(this.finalSearchCriteria);
    return this.http.post(`${environment.api_url}/grocery2`,{id : n})
      .pipe(
        catchError(this.handleError('searchGrosery2', []))
      );
  }

  addNew(n:AddCriteria) : Observable<any>{

    console.log(n);
    //let qs = {params: new HttpParams()};

    //return this.http.get('/api/cart', qs);
    //this.finalSearchCriteria = `/books?offset=${criteria.offset}&limit=${criteria.limit}&keyword=${criteria.keyword}&selectionType=${criteria.selectionType}`;
    //console.log(this.finalSearchCriteria);
    return this.http.post(`${environment.api_url}/add`,n)
      .pipe(
        catchError(this.handleError('searchUsed', []))
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
