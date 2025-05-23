import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  CloudData,
  CloudOptions,
  TagCloudComponent,
} from '../../../projects/angular-tag-cloud-module/src/public-api';

import { randomData } from '../helpers';
import { Observable, of } from 'rxjs';
import { TagCloudComponent as TagCloudComponent_1 } from '../../../projects/angular-tag-cloud-module/src/lib/tag-cloud.component';
import { MatSliderModule } from '@angular/material/slider';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-cloud-configurator',
    templateUrl: './cloud-configurator.component.html',
    styleUrls: ['./cloud-configurator.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonModule,
        ColorPickerModule,
        MatSliderModule,
        TagCloudComponent_1,
    ]
})
export class CloudConfiguratorComponent implements OnInit {
  @ViewChild(TagCloudComponent, { static: true })
  tagCloudComponent!: TagCloudComponent;
  cloudDataForm!: FormGroup;
  cloudConfigForm!: FormGroup;
  data: CloudData[] = [];

  defaultCloudOptions: CloudOptions = {
    width: 0.98,
    height: 500,
    overflow: false,
    strict: false,
    realignOnResize: true,
    randomizeAngle: true,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.6,
      delay: 0.1,
      color: '#33bb33',
    },
    step: 5,
    log: 'debug',
    delay: 50,
  };

  exampleDataOptions = {
    amount: 40,
    rotate: true,
    data: JSON.stringify(this.data, null, 2),
  };

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.cloudDataForm = this.fb.group({
      ...this.exampleDataOptions,
    });

    this.cloudConfigForm = this.fb.group({
      ...this.defaultCloudOptions,
      zoomOnHover: this.fb.group(this.defaultCloudOptions.zoomOnHover || {}),
      customStyle: true,
      background: '#2C2C2C url("../../assets/blackboard.jpg") no-repeat center',
      font: 'italic bold 14px "Indie Flower", cursive',
    });

    this.getNewExampleData();
  }

  log(eventType: string, e?: any) {
    console.log(eventType, e);
  }

  getNewExampleData() {
    this.setData(
      randomData(
        this.cloudDataForm.value.amount,
        this.cloudDataForm.value.rotate,
      ),
    );
  }

  renderJsonData() {
    try {
      this.data = JSON.parse(this.cloudDataForm.value.data);
    } catch (error) {
      this.snackBar.open(error as string, 'Ok, got it!', {
        duration: 2500,
      });
    }
  }

  reDraw() {
    let data: CloudData[] = [];
    try {
      data = JSON.parse(this.cloudDataForm.value.data);
    } catch (error) {
      this.snackBar.open(
        'Error parsing JSON. Fall back to random data.' + error,
        'Ok, got it!',
        {
          duration: 3000,
        },
      );
      data = randomData(30);
    }

    const changedData$: Observable<CloudData[]> = of(data);
    changedData$.subscribe((res) => this.setData(res));
    this.tagCloudComponent.reDraw();
  }

  private setData(data: CloudData[]) {
    this.data = data;
    this.cloudDataForm
      .get('data')
      ?.setValue(JSON.stringify(this.data, null, 2));
  }
}
