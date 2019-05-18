import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { CloudData, CloudOptions, TagCloudComponent } from '../../../projects/angular-tag-cloud-module/src/public-api';

import { randomData } from '../helpers';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cloud-configurator',
  templateUrl: './cloud-configurator.component.html',
  styleUrls: ['./cloud-configurator.component.css']
})
export class CloudConfiguratorComponent implements OnInit {
  @ViewChild(TagCloudComponent) tagCloudComponent: TagCloudComponent;
  cloudDataForm: FormGroup;
  cloudConfigForm: FormGroup;
  data: CloudData[] = [];

  defaultCloudOptions: CloudOptions = {
    width : 0.9,
    height : 500,
    overflow: false,
    strict: false,
    realignOnResize: true,
    randomizeAngle: true,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.6,
      delay: 0.1,
      color: '#33bb33'
    }
  };

  exampleDataOptions = {
    amount: 20,
    rotate: true,
    data: JSON.stringify(this.data, null, 2)
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cloudDataForm = this.fb.group({
      ...this.exampleDataOptions
    });

    this.cloudConfigForm = this.fb.group({
      ...this.defaultCloudOptions,
      zoomOnHover: this.fb.group(this.defaultCloudOptions.zoomOnHover)
    });

    console.log(this.cloudConfigForm.get('zoomOnHover').get('color'));
  }

  log(eventType: string, e?: CloudData) {
    console.log(eventType, e);
  }

  getNewExampleData() {
    this.data = randomData(
      this.cloudDataForm.value.amount,
      this.cloudDataForm.value.rotate
    );

    this.cloudDataForm.get('data').setValue(JSON.stringify(this.data, null, 2));
  }

  renderJsonData() {
    try {
      this.data = JSON.parse(this.cloudDataForm.value.data);
    } catch (error) {
      this.snackBar.open(error, 'Ok, got it!', {
        duration: 2500,
      });
    }
  }

  reDraw() {
    const changedData$: Observable<CloudData[]> = of(randomData(
      this.cloudDataForm.value.amount,
      this.cloudDataForm.value.rotate
    ));
    changedData$.subscribe(res => {
      this.data = res;
      this.cloudDataForm.get('data').setValue(JSON.stringify(this.data, null, 2));
    });
    this.tagCloudComponent.reDraw();
  }

}
