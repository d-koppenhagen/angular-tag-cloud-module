# angular-tag-cloud-module
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<a href="https://www.buymeacoffee.com/dkoppenhagen" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

[![npm](https://img.shields.io/npm/v/angular-tag-cloud-module.svg)](https://www.npmjs.com/package/angular-tag-cloud-module)
[![npm](https://img.shields.io/npm/l/angular-tag-cloud-module.svg)](https://www.npmjs.com/package/angular-tag-cloud-module)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Demo at GH-Pages](https://img.shields.io/badge/Demo-gh--pages-blueviolet.svg)](https://d-koppenhagen.github.io/angular-tag-cloud-module/)

[![npm](https://img.shields.io/npm/dw/angular-tag-cloud-module.svg)](https://www.npmjs.com/package/angular-tag-cloud-module)
[![npm](https://img.shields.io/npm/dm/angular-tag-cloud-module.svg)](https://www.npmjs.com/package/angular-tag-cloud-module)
[![npm](https://img.shields.io/npm/dy/angular-tag-cloud-module.svg)](https://www.npmjs.com/package/angular-tag-cloud-module)
[![npm](https://img.shields.io/npm/dt/angular-tag-cloud-module.svg)](https://www.npmjs.com/package/angular-tag-cloud-module)

With this module you can generate word clouds / tag clouds.
The module requires a peer dependency to angular/core >= Version 6.0.0.

The project is based on [angular-tag-cloud](https://github.com/zeeshanhyder/angular-tag-cloud) which provides a tag cloud for Angular 1.X.X applications.

![TagCloud][logo]

# Demo

Check out the demo page to play around with the options:
https://d-koppenhagen.github.io/angular-tag-cloud-module/

# Version and compability

| Version             | Angular Version Compability   |
| ------------------- | ----------------------------- |
| `2.6.0` and below   | between `^4.0.0` and `^5.X.X` |
| `3.8.2` and below   | between `^6.0.0` and `^8.X.X` |
| `4.2.0` and below   | `^9.0.0`                      |
| `5.0.0` and greater | `^10.0.0` and greater         |

# Install

To install the module just run the following command on your CLI:

```bash
npm install --save angular-tag-cloud-module
# or: npm install --save angular-tag-cloud-module
```

Or if you use yarn:

```bash
yarn add angular-tag-cloud-module
# or yarn add angular-tag-cloud-module
```

# Full Documentation
For having a look at the full documentation clone this repo to your local disk first.
Then navigate in the directory and run `npm run doc` via console (probably you have to install the nodejs dependencies before: `npm install`).
The documentation can be accessed in your browser: [localhost:8080](http://localhost:8080).

# Usage

1. Import the module into your Angular-NgModule:

```ts
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

```ts
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
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1000,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,
  };

  data: CloudData[] = [
    {text: 'Weight-8-link-color', weight: 8, link: 'https://google.com', color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip'},
    // ...
  ];
}
```

You can either pass configuration properties as an `Input` (As shown in the example above) or pass a an object described by the `CloudOptions`-Interface using the `config` property as shown below.

```html
<angular-tag-cloud [config]="options" [data]="data"></angular-tag-cloud>
```

You can use one of the following HTML-Tags for the tag cloud in your template:
* `<angular-tag-cloud ...></angular-tag-cloud>`
* `<ng-tag-cloud ...></ng-tag-cloud>`
* `<ngtc ...></ngtc>`

> Please keep this in mind, that the `weight` property defines the relative importance of the word (such as the number of occurrencies, etc.). The range of values is arbitrary, and they will be linearly mapped to a discrete scale from 1 to 10.
> In fact passing just one word to the array has the effect that this is relative to other elements. As there aren't any other elements in that case it's result is that the element becomes a container with the class `w5` - right in the middle of the discret scale.
> So the given value for `weight` is not directly mapped to the CSS-class. For example you can use also a value like `123` or `34` - it will always be mapped to a scale from 1 to 10 relativly to the other array elements.
> If you don't want that the tag cloud is calculating the values manually, set the `strict` property to `true` and use integer values `1` to `10` within the `weight` property.
> If you want the tag cloud to randomly generate an angle for each entry (when it is undefined), set `randomizeAngle` property to `true`.
> The `step` property defines the steps which will be added for the next cloud element to check during calculation. The calculation starts somewhere in the middle of the canvas. The steps will be increased by the given value like a spiral to the outer canvas area. When the algorithm detects that there is space for the current element, it will be added to the cloud. A lower value for the `step` attribute is more granular and precisely but needs also more time and processing power during the cloud creation.

Check out the `demo`-Folder for a complete example

## Example: Rotate some elements
If you want to rotate some CloudData elements, you can specify a numeric value for rotation within the `rotate`-Attribute:

```ts
import { Component } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';

@Component({
  selector: 'my-component',
  template: `
    <angular-tag-cloud [data]="data"></angular-tag-cloud>
  `
})
export class AppComponent {

  data: CloudData[] = [
    { text: 'weight-5-rotate(+10)', weight: 5, rotate: 10 }
    { text: 'weight-7-rotate(-20)', weight: 7, rotate: -20 }
    { text: 'weight-9-rotate(+35)', weight: 9, rotate: 35 }
    // ...
  ];
}
```

## Example: Zoom elements on hover
You can specify the `zoomOnHover` property with an object that defines the zoom level (`scale`) and optionally a time for the transition (`transitionTime`):

```ts
import { Component } from '@angular/core';
import { CloudData, ZoomOnHoverOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'my-component',
  template: `
    <angular-tag-cloud [data]="data" [zoomOnHover]="zoomOnHoverOptions"></angular-tag-cloud>
  `
})
export class AppComponent {
  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.8 // Zoom will take affect after 0.8 seconds
  };

  data: CloudData[] = [
    { text: 'weight-5', weight: 5 }
    { text: 'weight-7', weight: 7 }
    { text: 'weight-9', weight: 9 }
    // ...
  ];
}
```

## Example: Changing Data after initializing
If you want to change the data after initializing it (e.g. when fetching the data from a backend),  you have to pass a new `CloudData[]` into the component so that it can detect the changes:

```ts
import { Component } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';
import { Observable, of } from 'rxjs';

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
    const changedData$: Observable<CloudData[]> = of([
      { text: 'Weight-3', weight: 3 },
      // ...
    ]);
    changedData$.subscribe(res => this.data = res);
  }
}
```

## Example: Detect the clicked item
Angular-Tag-Cloud emits an event as soon as an item is clicked.

```ts
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

```ts
import { Component } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';

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

## Example: Redraw the cloud
You can trigger the tag cloud to be redrawn by running the method `reDraw()`.
This can be useful if e.g. the boundaries of the upper container are changing and you wanna re-order the words to fit into the container.

```ts
import { Component, ViewChild } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';
import { TagCloudComponent } from './tag-cloud-module/tag-cloud.component';

@Component({
  selector: 'my-component',
  template: `
    <angular-tag-cloud [data]="data"></angular-tag-cloud>
    <button (click)="reDraw()">Re-draw</button>
  `
})
export class AppComponent {
  @ViewChild(TagCloudComponent) tagCloudComponent: TagCloudComponent;

  data: CloudData[] = [
    { text: 'Weight-8', weight: 8 },
    // ...
  ];

  reDraw() {
    this.tagCloudComponent.reDraw();
  }
}
```


## Example: Place words on fixed position
You can force that words are placed on a specific position by defining the `position` property for a word.
The word won't be placed anymore randomly but at the defined position.
Keep in mind that the `x` and `y` values must be withing the proportions of the tag cloud.

```ts
import { Component, ViewChild } from '@angular/core';
import { CloudData } from 'angular-tag-cloud-module';
import { TagCloudComponent } from './tag-cloud-module/tag-cloud.component';

@Component({
  selector: 'my-component',
  template: `
    <angular-tag-cloud [data]="data"></angular-tag-cloud>
  `
})
export class AppComponent {
  @ViewChild(TagCloudComponent) tagCloudComponent: TagCloudComponent;

  data: CloudData[] = [
    { text: 'Weight-8-fixed', weight: 8, position: { left: 20, top: 30 } },
    { text: 'Weight-8-random', weight: 8 },
    // ...
  ];
}
```

## Using a custom Stylesheet
You can adjust the style for the component. Please read the [Wiki article](https://github.com/d-koppenhagen/angular-tag-cloud-module/wiki/Custom-CSS-Style) and follow the instructions.
![TagCloud with custom stylesheet][logo2]

## Place data on fixed positions

You can access the component property `cloudDataHtmlElements` to set / override the final placements for the HTML Elements inside the word cloud.

# Options
The HTML-selector `<angular-tag-cloud>` can/must have the following inputs:

| Input             | Type                                                                               | default value                                            | mandatory |
| ----------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------- | --------- |
| `config`          | CloudOptions                                                                       | See other default params                                 | no        |
| `data`            | CloudData[]                                                                        |                                                          | yes       |
| `width`           | number (*)                                                                         | `500`                                                    | no        |
| `height`          | number (*)                                                                         | `300`                                                    | no        |
| `step`            | number                                                                             | `2.0`                                                    | no        |
| `overflow`        | boolean                                                                            | `true`                                                   | no        |
| `strict`          | boolean                                                                            | `false`                                                  | no        |
| `delay`           | number                                                                             | `null`                                                   | no        |
| `zoomOnHover`     | ZoomOnHoverOptions                                                                 | `{ scale: 1, transitionTime: 0, delay: 0, color: null }` | no        |
| `realignOnResize` | boolean                                                                            | `false`                                                  | no        |
| `randomizeAngle`  | boolean                                                                            | `false`                                                  | no        |
| `font`            | string ([CSS font](https://www.w3schools.com/cssref/pr_font_font.asp))             |                                                          | no        |
| `background`      | string ([CSS background](https://www.w3schools.com/cssref/css3_pr_background.asp)) |                                                          | no        |
| `log`             | `'warn'` / `'debug'` / `false`                                                     | `false`                                                  | no        |

(*) if the value is between 0 and 1, it will be set to the size (width or height respectively) of the upper element multiplied by the value. Setting the value > 1 it will be set the size (width or height respectively) to the appropriate value in Pixel (px).

`data`-Array elements can/must have the following attributes:

| name       | Type                                                                               | default value                                | mandatory |
| ---------- | ---------------------------------------------------------------------------------- | -------------------------------------------- | --------- |
| `text`     | string                                                                             | null                                         |           | yes |
| `weight`   | number                                                                             | `5`                                          | no        |
| `link`     | string                                                                             |                                              | no        |
| `external` | boolean                                                                            | `false` (only has relevance if link was set) | no        |
| `color`    | string ([CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)) | (a shade of blue, depends on the weight)     | no        |
| `rotate`   | number                                                                             | `0`                                          | no        |
| `tooltip`  | string                                                                             |                                              | no        |
| `position` | { left: number, top: number }                                                      |                                              | no        |

 Also the element can have the following output:

| Input          | Event Return Type                      | default value | mandatory | Description                                                                                 |
| -------------- | -------------------------------------- | ------------- | --------- | ------------------------------------------------------------------------------------------- |
| `clicked`      | `CloudData`                            | -             | no        | Returns the clicked `CloudData`-Object                                                      |
| `dataChanges`  | `SimpleChanges` from `@angular/common` | -             | no        | Returns an `SimpleChanges`-Object which gives you access to the previous and current values |
| `afterInit`    | -                                      | -             | no        | Fires after the View was initilized                                                         |
| `afterChecked` | -                                      | -             | no        | Fires after the View was checked                                                            |

You can also call the method `reDraw()` to force the cloud data to be re-drawn:
```ts
@ViewChild(TagCloudComponent, { static: false }) child: TagCloudComponent;
...
child.redraw();
```

# Development
For development see [README.dev.md](https://github.com/d-koppenhagen/angular-tag-cloud-module/tree/main/README.dev.md)

[logo]: https://github.com/d-koppenhagen/angular-tag-cloud-module/raw/main/assets/tag-cloud.png "TagCloud"
[logo2]: https://github.com/d-koppenhagen/angular-tag-cloud-module/raw/main/assets/tag-cloud2.png "TagCloud with custom Style"

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/gaeljaffre"><img src="https://avatars2.githubusercontent.com/u/59866251?v=4" width="100px;" alt=""/><br /><sub><b>gaeljaffre</b></sub></a><br /><a href="https://github.com/d-koppenhagen/angular-tag-cloud-module/issues?q=author%3Agaeljaffre" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/sweinbach"><img src="https://avatars2.githubusercontent.com/u/18198364?v=4" width="100px;" alt=""/><br /><sub><b>sweinbach</b></sub></a><br /><a href="https://github.com/d-koppenhagen/angular-tag-cloud-module/commits?author=sweinbach" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/AndreasFroelich"><img src="https://avatars0.githubusercontent.com/u/7275448?v=4" width="100px;" alt=""/><br /><sub><b>AndreasFroelich</b></sub></a><br /><a href="https://github.com/d-koppenhagen/angular-tag-cloud-module/issues?q=author%3AAndreasFroelich" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://medium.com/@gregor.woiwode"><img src="https://avatars3.githubusercontent.com/u/444278?v=4" width="100px;" alt=""/><br /><sub><b>Gregor Woiwode</b></sub></a><br /><a href="https://github.com/d-koppenhagen/angular-tag-cloud-module/commits?author=GregOnNet" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/afm497"><img src="https://avatars3.githubusercontent.com/u/586053?v=4" width="100px;" alt=""/><br /><sub><b>Ray Soto</b></sub></a><br /><a href="https://github.com/d-koppenhagen/angular-tag-cloud-module/issues?q=author%3Aafm497" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.enhanceit.ai"><img src="https://avatars0.githubusercontent.com/u/17472224?v=4" width="100px;" alt=""/><br /><sub><b>Ignacio Peletier</b></sub></a><br /><a href="https://github.com/d-koppenhagen/angular-tag-cloud-module/issues?q=author%3ASorkanius" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/shrutibidada"><img src="https://avatars2.githubusercontent.com/u/21032444?v=4" width="100px;" alt=""/><br /><sub><b>Shruti Bidada</b></sub></a><br /><a href="https://github.com/d-koppenhagen/angular-tag-cloud-module/commits?author=shrutibidada" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://tuhinkarmakar.me"><img src="https://avatars0.githubusercontent.com/u/11135104?v=4" width="100px;" alt=""/><br /><sub><b>Tuhin Karmakar</b></sub></a><br /><a href="https://github.com/d-koppenhagen/angular-tag-cloud-module/commits?author=tuhinkarmakar" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lkirby1266"><img src="https://avatars0.githubusercontent.com/u/27423468?v=4" width="100px;" alt=""/><br /><sub><b>lkirby1266</b></sub></a><br /><a href="https://github.com/d-koppenhagen/angular-tag-cloud-module/commits?author=lkirby1266" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
