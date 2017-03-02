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

# Example

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

```ts
import { Component } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'my-component',
  template: `
    <angular-tag-cloud
      [data]="data"
      [width]="options.width"
      [height]="options.height"
      [overflow]="options.overflow">
    </angular-tag-cloud>
  `
})
export class AppComponent {
  options: CloudOptions = {
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

# Options
 The HTML-selector `<angular-tag-cloud>` can/must have the following inputs:

| Input            | Type               | default value  | mandatory
| ---------------- | ------------------ | -------------- | ---------
| `data`           | Array of cloudData |                | yes
| `width`          | number             | 500            | no
| `height`         | number             | 300            | no
| `overflow`       | boolean            | true           | no

`data`-Array elements can/must have the following attributes:

| name       | Type            | default value                              | mandatory
| ---------- | --------------- | ------------------------------------------ | ---------
| `text`     | string | null   |                                            | yes
| `weight`   | number          | 5                                          | no
| `link`     | string          |                                            | no
| `external` | boolean         | false (only has relevance if link was set) | no
| `color`    | valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) | (a shade of blue, depends on the weight)   | no



[logo]: https://github.com/d-koppenhagen/angular-tag-cloud-module/raw/master/assets/tag-cloud.png "Tag Cloud Preview"
[npm-url]: https://npmjs.org/package/angular-tag-cloud-module
[npm-image]: https://badge.fury.io/js/angular-tag-cloud-module.svg
