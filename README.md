# A Tag Cloud Module For Angular (>2.X.X)
[![NPM version][npm-image]][npm-url]

This is a module for Angular (>=Version 2.X.X) applications.
The project is based on [angular-tag-cloud](https://github.com/zeeshanhyder/angular-tag-cloud) which provides a tag cloud for Angular 1.X.X applications.

![alt text][logo]

# Install

To install the module just run the following command on your CLI:

```
npm install --save angular-tag-cloud-module
```

Or if you use yarn:

```
yarn add angular-tag-cloud-module
```

# Usage

1. Import the module into your Angular-NgModule:

```js
// app.module.ts
import { TagCloudModule } from 'angular-tag-cloud-module';

@NgModule({
  imports: [
    TagCloudModule
  ]
})
export class AppModule { }
```

2. Setup the cloud:

```js
import { Component } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'my-component',
  template: `
    <div>
      <angular-tag-cloud
        [data]="data"
        [width]="options.width"
        [height]="options.height"
        [overflow]="options.overflow">
      </angular-tag-cloud>
    </div>
  `
})
export class AppComponent {
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width : 1000,
    height : 400,
    overflow: false,
  }

  data: Array<CloudData> = [
    {text: 'Weight-10-link-color', weight: 10, link: 'https://google.com', color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 10, link: 'https://google.com'},
    // ...
  ]
}
```

Check out the `demo`-Folder for a complete example

## Example: Changing Data after initializing
If you want to change the data after initializing it (e.g. when fetching the data from a backend),  you have to pass a new `Array<CloudData>` into the component so that it can detect the changes:

```js
import { Component } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'my-component',
  template: `
    <angular-tag-cloud [data]="data"></angular-tag-cloud>
    <button (click)="newData()">Get new Data from Observable</button>
  `
})
export class AppComponent {

  data: Array<CloudData> = [
    { text: 'Initial Data weight-10', weight: 10 }
    // ...
  ]

  newData(){
    const changedData$: Observable<Array<CloudData>> = Observable.of([
      { text: 'Weight-3', weight: 3 },
      // ...
    ]);
    changedData$.subscribe(res => this.data = res);
  }
}
```

## Example: Detect the clicked item
Angular-Tag-Cloud emits an event as soon as an item is clicked.

```js
import { Component } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';

@Component({
  selector: 'my-component',
  template: `
    <angular-tag-cloud 
      [data]="data" 
      (clicked)="logClicked($event)">
    </angular-tag-cloud>
  `
})
export class AppComponent {

  data: Array<CloudData> = [
    { text: 'Initial Data weight-10', weight: 10 }
    // ...
  ]

  logClicked(clicked: CloudData){
    console.log(clicked);
  }
}
```

## Using a custom Stylesheet
You can adjust the style for the component. Please read the [Wiki article](https://github.com/d-koppenhagen/angular-tag-cloud-module/wiki/Custom-CSS-Style) and follow the instructions.

# Options
The HTML-selector `<angular-tag-cloud>` can/must have the following inputs:

| Input            | Type               | default value  | mandatory
| ---------------- | ------------------ | -------------- | ---------
| `data`           | Array of cloudData |                | yes
| `width`          | number (*)         | 500            | no
| `height`         | number             | 300            | no
| `overflow`       | boolean            | true           | no

(*) if the value is between 0 and 1, it will be set to the size of the upper element multiplied by the value. Setting the value > 1 it will be set the width to the appropriate value in Pixel (px).

`data`-Array elements can/must have the following attributes:

| name       | Type            | default value                              | mandatory
| ---------- | --------------- | ------------------------------------------ | ---------
| `text`     | string | null   |                                            | yes
| `weight`   | number          | 5                                          | no
| `link`     | string          |                                            | no
| `external` | boolean         | false (only has relevance if link was set) | no
| `color`    | valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) | (a shade of blue, depends on the weight)   | no

 Also the element can have the following output:

| Input           | Event Return Type  | default value  | mandatory | Description
| --------------- | ------------------ | -------------- | ----------| ------------
| `clicked`       | `CloudData`        | -              | no        | Returns the clicked `CloudData`-Object
| `afterInit`     | -                  | -              | no        | Fires after the View was initilized
| `afterChecked`  | -                  | -              | no        | Fires after the View was checked


[logo]: https://github.com/d-koppenhagen/angular-tag-cloud-module/raw/master/assets/tag-cloud.png "Tag Cloud Preview"
[npm-url]: https://npmjs.org/package/angular-tag-cloud-module
[npm-image]: https://badge.fury.io/js/angular-tag-cloud-module.svg
