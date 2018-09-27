import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {GroceryServiceService} from '../services/grocery-service.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {AddCriteria} from '../models/models';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  //addItem : AddCriteria;
  disStr : string;

  constructor(private grocerySvc:GroceryServiceService, private router: Router) { }

  ngOnInit() {
    this.disStr = ""
  }
  addDB(input:NgForm){
    console.log(input.value);
    //this.addItem.upc12=+input.value.upc12;
    //this.addItem.name=input.value.name;
    //this.addItem.brand=input.value.brand;

    this.grocerySvc.addNew({...input.value}).subscribe((res)=>{
      //console.log(res);
      if (res.result==="success"){
        this.disStr = ""
        //console.log(res.results.insertId);
        this.router.navigate([`/search`,res.results.insertId]);

      }else{
        this.disStr=res.result;
      }
    });
  }
}
