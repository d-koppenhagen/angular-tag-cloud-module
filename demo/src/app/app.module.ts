import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { TagCloudModule } from 'angular-tag-cloud-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatExpansionModule,
    TagCloudModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
