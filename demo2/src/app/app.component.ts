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
    width : 1,
    height : 700,
    overflow: false,
  };

  data: Array<CloudData> = [
    { text: 'TagCloudModule', weight: 10, color: '#65CA27' },
    { text: 'Angular', weight: 9 },
    { text: 'NodeJS', weight: 9 },
    { text: 'Mongo DB', weight: 5 },
    { text: 'MySQL', weight: 4 },
    { text: 'JavaScript', weight: 8 },
    { text: 'TypeScript', weight: 9 },
    { text: 'REST Services', weight: 8 },
    { text: 'WebRTC', weight: 6 },
    { text: 'Webpack', weight: 4 },
    { text: 'Gulp', weight: 4 },
    { text: 'Monitoring', weight: 6 },
    { text: 'LaTeX', weight: 7 },
    { text: 'PHP', weight: 4 },
    { text: 'Shell Scripting', weight: 4 },
    { text: 'RxJS', weight: 7 },
    { text: 'Wireshark', weight: 7 },
    { text: 'Customizing', weight: 6 },
    { text: 'CSS', weight: 7 },
    { text: 'jQuery', weight: 4 },
    { text: 'Apple', weight: 7 },
    { text: 'Microsoft', weight: 5 },
    { text: 'Ubuntu', weight: 7 },
    { text: 'Debian', weight: 6 },
    { text: 'Linux', weight: 7 },
    { text: 'Minifizierung', weight: 5 },
    { text: 'Netzwerkmanagement', weight: 6 },
    { text: 'Lua', weight: 4 },
    { text: 'HTML', weight: 8 },
  ];

  newDateFromObservable() {
    const changedData$: Observable<Array<CloudData>> = Observable.of([
      { text: 'Weight-3', weight: 3 },
      { text: 'Weight-2', weight: 2 },
      { text: 'Weight-1', weight: 1 }
    ]);
    changedData$.subscribe(res => this.data = res);
  }

  log(eventType: string, e?: CloudData) {
    console.log(eventType, e);
  }
}
