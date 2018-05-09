import { Component, ViewChild } from '@angular/core';
import { CloudData, CloudOptions, TagCloudComponent } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  @ViewChild(TagCloudComponent) tagCloudComponent: TagCloudComponent;

  options: CloudOptions = {
    width : 0.8,
    height : 400,
    overflow: false,
    zoomOnHover: {
      scale: 1.3,
      transitionTime: 1.2
    }
  };

  data1: CloudData[] = this._randomData(30);
  data2: CloudData[] = this._randomData(40);
  dataRotate: CloudData[] = this._randomData(20, true);

  newDateFromObservable() {
    const changedData$: Observable<CloudData[]> = Observable.of(this._randomData());
    changedData$.subscribe(res => this.data2 = res);
  }

  log(eventType: string, e?: CloudData) {
    console.log(eventType, e);
  }

  reDraw() {
    this.tagCloudComponent.reDraw();
  }

  private _randomData(cnt?: number, rotate?: boolean): CloudData[] {
    if (!cnt) { cnt = 20; }

    const cd: CloudData[] = [];

    for (let i = 0; i < cnt; i++) {
      let link: string;
      let color: string;
      let external: boolean;
      let weight = 5;
      let text = '';
      let r = 0;

      // randomly set link attribute and external
      if (Math.random() >= 0.5) {
        link = 'http://example.org';
        if (Math.random() >= 0.5) { external = true; }
      }

      // randomly set color attribute
      if (Math.random() >= 0.5) {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      }

      // randomly rotate some elements (less probability)
      if ((Math.random() >= 0.7) && rotate) {
        const plusMinus = Math.random() >= 0.5 ? '' : '-';
        r = Math.floor(Math.random() * Number(`${plusMinus}20`) + 1);
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
        external: external,
        rotate: r
      };

      cd.push(el);
    }

    return cd;
  }
}
