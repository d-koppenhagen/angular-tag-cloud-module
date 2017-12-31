import { Component } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  options: CloudOptions = {
    width : 0.8,
    height : 400,
    overflow: false
  };

  data1: CloudData[] = this._randomData(30);
  data2: CloudData[] = this._randomData(40);

  newDateFromObservable() {
    const changedData$: Observable<CloudData[]> = Observable.of(this._randomData());
    changedData$.subscribe(res => this.data2 = res);
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
