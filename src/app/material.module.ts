import { NgModule } from '@angular/core';
import {
  MatExpansionModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports: [
    MatExpansionModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
