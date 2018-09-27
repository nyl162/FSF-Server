import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {GroceryServiceService} from '../services/grocery-service.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  tempResult: any;

  constructor(private grocerySvc:GroceryServiceService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.id){
      this.grocerySvc.searchGrosery2(this.activatedRoute.snapshot.params.id).subscribe((results)=>{
        this.tempResult = results.map(x=>{
          let y = {
            ...x,
            URL: `http://www.barcodes4.me/barcode/c128a/${x.upc12}.png?IsTextDrawn=1`
          }
          return y;
        });
        //console.log(this.tempResult);
      });
    }else{
      this.refreshData();
    }
  }

  refreshData(){
    //console.log(this.activatedRoute.snapshot.params);
    this.grocerySvc.searchGrosery().subscribe((results)=>{
      this.tempResult = results.map(x=>{
        let y = {
          ...x,
          URL: `http://www.barcodes4.me/barcode/c128a/${x.upc12}.png?IsTextDrawn=1`
        }
        return y;
      });
      //console.log(this.tempResult);
    });
  }

  searchDB(input:NgForm){
    console.log(input.value);
    this.grocerySvc.criteria.name=input.value.name;
    this.grocerySvc.criteria.brand=input.value.brand;
    this.refreshData();
  }

  sortName(){
    if(this.grocerySvc.criteria.order === 0){
      this.grocerySvc.criteria.order = 1;
    }else{
      this.grocerySvc.criteria.order = 0;
    }
    this.refreshData();
  }

  sortBrand(){
    if(this.grocerySvc.criteria.order === 2){
      this.grocerySvc.criteria.order = 3;
    }else{
      this.grocerySvc.criteria.order = 2;
    }
    this.refreshData();
  }

  addClick(){
    console.log('add');
    this.router.navigate([`/add`])
  }

  editClick(n){
    console.log(n);
    console.log(this.tempResult);
    let ind :number = this.tempResult.findIndex((x)=>{
      console.log(x.id,n);
      return x.id === +n
    })
    console.log(this.tempResult[ind]);
    this.router.navigate([`/edit`,n])
  }

}
