import { Component } from '@angular/core';
import { CloudData, CloudOptions } from './tag-cloud-module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options: CloudOptions = {
    width : 1,
    height : 400,
    overflow: false,
  };

  data: CloudData[] = [
    { text: 'Weight-10-link-color', weight: 10, link: 'https://google.com', color: '#ffaaee' },
    { text: 'Weight-10-link', weight: 10, link: 'https://google.com' },
    { text: 'Weight-10', weight: 10 },
    { text: 'Weight-9-link-color', weight: 9, link: 'https://google.com', color: 'red' },
    { text: 'Weight-9-link', weight: 9, link: 'https://google.com' },
    { text: 'Weight-9', weight: 9 },
    { text: 'Weight-8-link-color', weight: 8, link: 'https://google.com', color: 'green' },
    { text: 'Weight-8-link', weight: 8, link: 'https://google.com' },
    { text: 'Weight-8', weight: 8 },
    { text: 'Weight-7-link-color', weight: 7, link: 'https://google.com', color: '#aaa' },
    { text: 'Weight-7-link-external', weight: 7, link: 'https://google.com', external: true },
    { text: 'Weight-7', weight: 7 },
    { text: 'Weight-6-link-color', weight: 6, link: 'https://google.com', color: '#ddd' },
    { text: 'Weight-6-link', weight: 6, link: 'https://google.com' },
    { text: 'Weight-6', weight: 6.4 },
    { text: 'Weight-5-link-color', weight: 5, link: 'https://google.com', color: 'yellow' },
    { text: 'Weight-5-link', weight: 5, link: 'https://google.com' },
    { text: 'Weight-5', weight: 5 },
    { text: 'Weight-4-link-color-external', weight: 4, link: 'https://google.com', color: '#ddd', external: true },
    { text: 'Weight-4-link', weight: 4, link: 'https://google.com' },
    { text: 'Weight-4', weight: 4 },
    { text: 'Weight-3-link-color', weight: 3, link: 'https://google.com', color: '#0f0' },
    { text: 'Weight-3-link', weight: 3, link: 'https://google.com' },
    { text: 'Weight-3', weight: 3 },
    { text: 'Weight-2-link-color', weight: 2, link: 'https://google.com', color: 'olive' },
    { text: 'Weight-2-link', weight: 2, link: 'https://google.com' },
    { text: 'Weight-2', weight: 2 },
    { text: 'Weight-1-link-color', weight: 1, link: 'https://google.com', color: 'purple' },
    { text: 'Weight-1-link', weight: 1, link: 'https://google.com' },
    { text: 'Weight-1', weight: 1 }
  ];

  dataStrict: CloudData[] = [
    { text: 'Weight-10-link-color', weight: 10, link: 'https://google.com', color: '#ffaaee' }
  ];

  newDateFromObservable() {
    const changedData$: Observable<CloudData[]> = Observable.of([
      { text: 'Weight-10-link-color', weight: 8, link: 'https://google.com', color: '#ffaaee' },
      { text: 'Weight-10-link', weight: 10, link: 'https://google.com' }
    ]);
    changedData$.subscribe(res => this.data = res);
  }

  log(eventType: string, e?: CloudData) {
    console.log(eventType, e);
  }
}

