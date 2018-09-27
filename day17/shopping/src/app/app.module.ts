import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importModule } from './import.module';
import { SearchListComponent } from './search-list/search-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchListComponent,
    AddItemComponent,
    EditItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    importModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
