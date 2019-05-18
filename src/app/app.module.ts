import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';

import { TagCloudModule } from '../../projects/angular-tag-cloud-module/src/public-api';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CloudConfiguratorComponent } from './cloud-configurator/cloud-configurator.component';

@NgModule({
  declarations: [
    AppComponent,
    CloudConfiguratorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ColorPickerModule,
    TagCloudModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
