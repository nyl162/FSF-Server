import { BrowserModule } from "@angular/platform-browser";
import {RouterModule, Routes} from '@angular/router'
import { NgModule } from "@angular/core";
import { SearchListComponent } from "./search-list/search-list.component";
import { AddItemComponent } from "./add-item/add-item.component";
import { EditItemComponent } from "./edit-item/edit-item.component";


const appRoutes :Routes = [

    {path: '' , component: SearchListComponent},
    {path: 'search/:id' , component: SearchListComponent},
    {path: 'add' , component: AddItemComponent},
    {path: 'edit/:id' , component: EditItemComponent},
    {path: '**' , redirectTo: '/', pathMatch: 'full'}

];



@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
  })

export class RoutingModule {}