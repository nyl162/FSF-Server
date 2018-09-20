import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private http: HttpClient) { }

  loadCartService(load:string):Observable<any>{
   // const options = term ?
   //{ params: new HttpParams().set('name', term) } : {};
    //HttpParams = new HttpParams().set("name", load);

    const qs = {params: new HttpParams().set('name', load)};

    return this.http.get('/api/cart', qs);
  };

  saveCartService(save){
    return this.http.post('/api/cart',save);
  };
}
