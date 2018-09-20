import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CartApiService } from '../services/cart-api.service';
//import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {

  ngCartContent : string[] = ['Apple','Orange','Pear','Grapes'];

  constructor(private cartSW:CartApiService) { }

  ngOnInit() {
  }

  cartForm = new FormGroup({
    name: new FormControl(''),
    item: new FormControl(''),
  });

  //string[0].toUpperCase() + string.substring(1)
  cartAdd(){
    console.log(this.cartForm);
    if(!(this.ngCartContent.find(x => x.toUpperCase() === this.cartForm.value.item.toUpperCase()))){
      this.ngCartContent.push(this.cartForm.value.item);
      this.cartForm.setValue({name:this.cartForm.value.name,item:''});
    }

  };

  cartLoad(){
    this.cartSW.loadCartService(this.cartForm.value.name)
      .subscribe((result)=>{
        console.log(result);
        if(result){
          this.ngCartContent = result.content;
        }else{
          this.ngCartContent = []
        }
      });
  };

  cartSave(){
    this.cartSW.saveCartService({name : this.cartForm.value.name , content: this.ngCartContent})
    .subscribe((result)=>{
      console.log(result);
    })
    this.ngCartContent = [];
    
    this.cartForm.setValue({name:'',item:''});
    //this.cartForm.setValue({name:''});
  };

}
