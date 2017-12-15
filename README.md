# A Tag Cloud Module For Angular (>=5.0.0)
[![NPM version][npm-image]][npm-url]

This angular module contains a component which generates tag clouds.
he module requires a peer dependency to angular/core >= Version 5.0.0.
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

  data: CloudData[] = [
    {text: 'Weight-8-link-color', weight: 8, link: 'https://google.com', color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 10, link: 'https://google.com'},
    // ...
  ]
}
```

> Please keep this in mind, that the `weight` property defines the relative importance of the word (such as the number of occurrencies, etc.). The range of values is arbitrary, and they will be linearly mapped to a discrete scale from 1 to 10.
> In fact passing just one word to the array has the effect that this is relative to other elements. As there aren't any other elements in that case it's result is that the element becomes a container with the class `w5` - right in the middle of the discret scale.
> So the given value for `weight` is not directly mapped to the CSS-class. For example you can use also a value like `123` or `34` - it will always be mapped to a scale from 1 to 10 relativly to the other array elements.
> If you don't want that the tag cloud is calculating the values manually, set the `strict` property to `true` and use integer values `1` to `10` within the `weight` property.

Check out the `demo`-Folder for a complete example

## Example: Changing Data after initializing
If you want to change the data after initializing it (e.g. when fetching the data from a backend),  you have to pass a new `CloudData[]` into the component so that it can detect the changes:

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

  data: CloudData[] = [
    { text: 'Initial Data weight-10', weight: 10 }
    // ...
  ];

  newData(){
    const changedData$: Observable<CloudData[]> = Observable.of([
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

  data: CloudData[] = [
    { text: 'Initial Data weight-10', weight: 10 }
    // ...
  ];

  logClicked(clicked: CloudData){
    console.log(clicked);
  }
}
```

## Example: Using fixed weight values / strict binding of weigth through HTML class
The `weight` property defines by default the relative importance of the word (such as the number of occurrencies, etc.). The range of values is arbitrary, and they will be linearly mapped to a discrete scale from 1 to 10.
This cuases that e.g. passing just one word to the array has the effect that this is relative to other elements. As there aren't any other elements in that case it's result is that the element becomes a container with the class `w5` - right in the middle of the discret scale.
If you don't want that the tag cloud is calculating the values manually, set the `strict` property to `true` and use integer values `1` to `10` within the `weight` property.

```js
import { Component } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'my-component',
  template: `
    <angular-tag-cloud [data]="data" [strict]="true"></angular-tag-cloud>
  `
})
export class AppComponent {

  data: CloudData[] = [
    // HTML-Element will have class 8:
    { text: 'Weight-8', weight: 8 },
    // HTML-Element will have class 10 as 10 is the max. value in strict mode:
    { text: 'Weight-12 -> Weight-10', weight: 12 },
    // HTML-Element will have class 1 as 1 is the min. value in strict mode:
    { text: 'Weight-0 -> Weight-1', weight: 0 },
    // HTML-Element will have class 4 as floats are rounded to an int in strict mode:
    { text: 'Weight-4.3 -> Weight-4', weight: 4.3 },
    // ...
  ];
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

# Development
For development see [angular-tag-cloud-module/README.dev.md](https://github.com/d-koppenhagen/angular-tag-cloud-module/tree/master/angular-tag-cloud-module/README.dev.md)

[logo]: https://github.com/d-koppenhagen/angular-tag-cloud-module/raw/master/assets/tag-cloud.png "Tag Cloud Preview"
[npm-url]: https://npmjs.org/package/angular-tag-cloud-module
[npm-image]: https://badge.fury.io/js/angular-tag-cloud-module.svg
