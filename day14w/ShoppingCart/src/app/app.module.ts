import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importModule } from './import.module';
import { FormInputComponent } from './form-input/form-input.component';
import { ListContentComponent } from './list-content/list-content.component';

@NgModule({
  declarations: [
    AppComponent,
    FormInputComponent,
    ListContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    importModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
