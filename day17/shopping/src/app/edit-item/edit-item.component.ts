import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  DBid: number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const DBid = this.activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.url[0].path);
  }

}
