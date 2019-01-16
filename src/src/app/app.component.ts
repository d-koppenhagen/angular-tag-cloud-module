import { Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CloudData, CloudOptions } from './tag-cloud-module/tag-cloud.interfaces';
import { TagCloudComponent } from './tag-cloud-module/tag-cloud.component';
import { staticExampleData, randomData } from './example-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(TagCloudComponent) child: TagCloudComponent;

  options: CloudOptions = {
    width : 1,
    height : 500,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.3,
      delay: .3,
      color: '#aaaaaa'
    },
    randomizeAngle: false,
    realignOnResize: true
  };

  data: CloudData[] = randomData(50);

  dataStrict: CloudData[] = [
    { text: 'Weight-10-link-color', weight: 10, link: 'https://google.com', color: '#ffaaee' }
  ];

  newDataFromObservable() {
    const changedData$: Observable<CloudData[]> = of(randomData(50));
    changedData$.subscribe(res => this.data = res);
  }

  log(eventType: string, e?: CloudData) {
    console.log(eventType, e);
  }

  reDraw() {
    this.child.reDraw();
  }

  getStaticData() {
    const changedData$: Observable<CloudData[]> = of(staticExampleData);
    changedData$.subscribe(res => this.data = res);
  }
}
