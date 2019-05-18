import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  cloudConfigForm: FormGroup;
  data: CloudData[] = randomData(30);

  defaultCloudOptions: CloudOptions = {
    width : 0.9,
    height : 600,
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
    rotate: true
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cloudConfigForm = this.fb.group({
      ...this.exampleDataOptions,
      ...this.defaultCloudOptions,
      zoomOnHover: this.fb.group(this.defaultCloudOptions.zoomOnHover)
    });

    console.log(this.cloudConfigForm.get('zoomOnHover').get('color'));
  }

  log(eventType: string, e?: CloudData) {
    console.log(eventType, e);
  }

  reDraw() {
    console.log('redraw');

    const changedData$: Observable<CloudData[]> = of(randomData(
      this.cloudConfigForm.value.amount,
      this.cloudConfigForm.value.rotate
    ));
    changedData$.subscribe(res => this.data = res);

    this.tagCloudComponent.reDraw();
  }

}
