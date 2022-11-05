import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';

import { TagCloudComponent } from '../../projects/angular-tag-cloud-module/src/public-api';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CloudConfiguratorComponent } from './cloud-configurator/cloud-configurator.component';

@NgModule({
  declarations: [AppComponent, CloudConfiguratorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ColorPickerModule,
    TagCloudComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
