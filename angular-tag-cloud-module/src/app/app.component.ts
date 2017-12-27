import { Component } from '@angular/core';
import { CloudData, CloudOptions } from './tag-cloud-module/tag-cloud.interfaces';
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

  data: CloudData[] = this._randomData(50);

  dataStrict: CloudData[] = [
    { text: 'Weight-10-link-color', weight: 10, link: 'https://google.com', color: '#ffaaee' }
  ];

  newDataFromObservable() {
    const changedData$: Observable<CloudData[]> = Observable.of(this._randomData(50));
    changedData$.subscribe(res => this.data = res);
  }

  log(eventType: string, e?: CloudData) {
    console.log(eventType, e);
  }

  private _randomData(cnt?: number): CloudData[] {
    if (!cnt) { cnt = 20; }

    const cd: CloudData[] = [];

    for (let i = 0; i < cnt; i++) {
      let link: string;
      let color: string;
      let external: boolean;
      let weight = 5;
      let text = '';

      // randomly set link attribute and external
      if (Math.random() >= 0.5) {
        link = 'http://example.org';
        if (Math.random() >= 0.5) { external = true; }
      }

      // randomly set color attribute
      if (Math.random() >= 0.5) {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      }

      // set random weight
      weight = Math.floor((Math.random() * 10) + 1);

      text = `weight-${weight}`;
      if (color) { text += '-color'; }
      if (link) { text += '-link'; }
      if (external) { text += '-external'; }

      const el: CloudData = {
        text: text,
        weight: weight,
        color: color,
        link: link,
        external: external
      };

      cd.push(el);
    }

    return cd;
  }
}

