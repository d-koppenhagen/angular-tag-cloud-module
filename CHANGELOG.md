## 19.0.0

### BREAKING CHANGES
- dropped support for Angular < 19.x.x. You need to have a peer dependency of Angular 19.0.0 or greater.

## 17.0.1

### Performance
- improve rendering performance (#82), closes #81

## 17.0.0

### BREAKING CHANGES
- dropped support for Angular < 17.x.x. You need to have a peer dependency of Angular 17.0.0 or greater.

## 16.0.0

### BREAKING CHANGES
- dropped support for Angular < 16.x.x. You need to have a peer dependency of Angular 16.0.0 or greater.

## 15.0.0

### BREAKING CHANGES
- dropped support for Angular < 15.x.x. You need to have a peer dependency of Angular 15.0.0 or greater.

## 14.0.0
### Refactoring
* mark `TagCloudComponent` as `standalone: true`
* Remove `TagCloudModule`

### BREAKING CHANGES
- dropped support for Angular < 14.x.x. You need to have a peer dependency of Angular 14.0.0 or greater.
- `TagCloudModule` is no longer exported. Please use the standalone component `TagCloudComponent` instead.

**OLD:**
```ts
import { TagCloudModule } from 'angular-tag-cloud-module';
// ...

@NgModule({
  // ...
  imports: [TagCloudModule],
})
```
**NEW:**
```ts
import { TagCloudComponent } from 'angular-tag-cloud-module';
// ...

@NgModule({
  // ...
  imports: [TagCloudComponent],
})
```

## 13.0.0
### Features
* add support for Angular 13, drop support for older Angular versions
* align version with angular version

### BREAKING CHANGES
- dropped support for Angular 11.x.x
- you need to have a peer dependency of Angular 12.0.0 or greater

## 6.0.1

### Refactoring
* update workspace to Angular12 defaults
* use strict mode everywhere
### Fixes
* remove optional event emitter typing [ #66 ]
## 6.0.0
### Features
* add support for Angular 12, drop support for older Angular versions

### BREAKING CHANGES
- support for Angular 10.x.x has been dropped for future versions
- you need to have a peer dependency of Angular 11.0.0 or greater
## 5.3.0
### Features
* allow to access `cloudDataHtmlElements` component property for manual element placements [ #64 ]([7885e58](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/7885e585232e918773eea2787bb1cb1a0dd083ca))

## 5.2.2
### Fixes
* Don't run into an infinite loop when the word cloud has a width or height of `0px` [ #45 ]([02ae49](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/3c005eeada362f1caeef5467423c6672fb02ae49))

## 5.2.1
### Fixes
* Don't run into an infinite loop when the word cloud has a width or height of `0px` [ #45 ]([54c717](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/5124e4b83a7544858a1581cde4617194d054c717))
## 5.2.0
### Features
* Add support for Angular 11

## 5.1.0
### Features
* add configuration option `delay`: Delay the appearance for each cloud element by defining a value in milliseconds [ #8 ](https://github.com/d-koppenhagen/angular-tag-cloud-module/issues/8)

## 5.0.1
### Fixes
* tooltips were displayed behind other words [ #51 ]([7d25ff](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/7d25ffaac64084c8169678aa18987a296584c709)), Thanks to @gaeljaffre

## 5.0.0
### Features
* add support for Angular 10, drop support for older Angular versions

### BREAKING CHANGES
- support for Angular 9.x.x has been dropped for future versions
- you need to have a peer dependency of Angular 10.0.0 and `tslib` 2.0.0 or greater

## 4.2.0
### Features
* allow responsive height [ #44 ]

## 4.1.0
### Features
* allow to specify a fixed position for a word [ #49 ]

## 4.0.0
### BREAKING CHANGES
* add Angular 9 version as `peerDependency`.
* to use Angular 8 or lower, install the module by running:
  ```bash
  npm install --save angular-tag-cloud-module@3
  ```

## 3.8.2
### Fixes
* remove `colorStyle` only when `zoomOnHover.color` is set [ #43 ]([ef65e9f](https://github.com/d-koppenhagen/angular-tag-cloud-module/pull/43/commits/e1436f2568812d76896265ac5636e77e9ef65e9f)), Thanks to @andreasIBM

## 3.8.1
### Fixes
* Input property `log` caused an error ([9b374ea](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/9b374ea097e822308664a17d6a4257493b129e1b#diff-0190ffbcbcf4e5176955d2f8e4cd5da7R435))

## 3.8.0
### Features
* Adds the property `background` for setting a CSS background color / picture ([de7cd4c](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/de7cd4c21db98d12c335b4d07dd424b3387c4e28))
* Adds the property `font` for setting a CSS font style ([de7cd4c](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/de7cd4c21db98d12c335b4d07dd424b3387c4e28))

## 3.7.0
### Features
* Do not place the first word always right in the middle ([ad4d5a4](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/ad4d5a43ac2fa5183c8dbc399c801b5078ff1a30))
* Adds input for logging (`[log]="'warn'"`). Possible values: `warn`, `debug`, `false` ([874cda3](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/874cda31258361164cddbf789122c7538246152f))

## 3.6.0
### Features
* Adds an `id` attribute to each word ([a4ce14c](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/a4ce14c3cece4844a035e79e9e2ce942bd6c7a57))
* Ability to pass an object width `CloudOptions` as input ([96cb5f7](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/96cb5f72de8b9b320ce34e8a4d5bb688f0a51751))
* Allow peer dependencies of Angular 9 preview versions

## 3.5.1
### Fixes
* Adds missing option `strict` to exported interface CloudOptions ([b96f2bf](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/b96f2bf2bb26e1159139c40764ee664367a22703))

## 3.5.0
### Features
* Allow a peer dependency of Angular 8

## 3.4.2
### Fixes
* Set minimal angular version to 6.0.0

## 3.4.1
### Fixes
* Fixes some descriptions
* Includes LICENSE file int NPM package

## 3.4.0
### Features
* restructured project - This will provide the module as an Angular CLI's library. A lots of duplicate code is killed :)

## 3.3.0
### Features
* Adds support for color change within ZoomOnHoverOptions (related to [ #32 ])

## 3.2.0
### Features
* Adds support for Angular 7 (related to [ #38 ])

## 3.1.0
### Features
* Tooltips can be added now. (related to [ #23 ])
* Support for non radomization of angles when undefined in cloud data entries and added an alphabetical sort of data before sorting by weight to allow for uniform placement of words in the cloud. This can ensure that if a word cloud is updated with the same data the placement of words will not change. Previously, because only sorting by weight, there was some randomness to the word ordering when rendering. (related to [ #31 ]). Thanks @afm497!
### Fixes
* Removed check for empty data array that would exit out of drawing tag cloud. (related to [ #36 ]). Thanks @afm497!

## 3.0.0
### Features
* TagCloudModule is now ready for usage with Angular6 :tada:

## 2.6.0
### Features
* auto realign words on resize (`realignOnResize` property)  (related to [ #26 ])

## 2.5.0
### Features
* Adds the option to zoom with a delay
* New Method `reDraw` (related to [ #26 ])
### Fixes
* The browser lags after several data updates (related to [ #28 ])

## 2.4.0
### Features
* Adds the option to zoom with a delay
* New Event `dataChanges`

### Fixes
* keep word rotation if set and zoom is activated

## 2.3.1
### Fixes
* rotate words not just on hover

## 2.3.0
### Features
* Adds a feature for zoom CloudData elements on hover [ #10 ]

## 2.2.0
### Features
* Add attribute for rotating CloudData elements [ #11 ]

## 2.1.6
### Fixes
* fixes bug within default values ([a5aac48](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/a5aac4858b6bd4770c9b99073d0018b4418430b8))

## 2.1.5-prod-fix.1
* updates `ng-packagr` (related to [ #21 ])

### Fixes
* fixes deployed version [ #20 ]

## 2.1.2
### Fixes
* updates peerDependencies
* removes unnecessary dependencies

## 2.1.1
### Fixes
* fixes Package

## 2.1.0
### Features
* Adds strict mode for setting static weights ([0938798](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/093879808ba5e4ba0c81656ffc971e0195043c00)), fixes [ #18 ]

## 2.0.2
### Fixes
* fixes README.md

## 2.0.1
### Fixes
* fixes README.md

## 2.0.0
### Features
* Upgrade to Angular 5, fixes [ #18 ]
* Package application using [ng-packagr](https://www.npmjs.com/package/ng-packagr)

## 1.4.0
### Fixes
* Simplify the Sorting Algorithm ([d788ab0](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/d788ab0934d6bce4c931f7e88a0b25ee2e7804f2)), fixes [ #15 ]

### Features
* Adding changes to update the DOM ([436ce82](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/d788ab0934d6bce4c931f7e88a0b25ee2e7804f2)), fixes [ #16 ]

## 1.3.2
### Fixes
* Null pointer error when options change but data does not, ([63066f7](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/c54a9b8f8732b508ef88da714af63b81570e57ec)), fixes [ #13 ]

## 1.3.1
### Fixes
* Adds events `afterInit` and `afterChecked`, fixes [ #7 ]
* Adds a link to a wiki page which explains how to change the stlyesheet, fixes [ #6 ]
* Supports now a relative width to the parents element, fixes [#1]:

__Fixed width (in px):__

The width of the cloud in this example will be 1000px.
```js
@Component({
  selector: 'my-component',
  template: `
    <angular-tag-cloud
      [data]="data"
      [width]="1000px">
    </angular-tag-cloud>
  `
})
// ...
```

__Example usage of relative width:__

If the parent container is e.g. `1000px` wide, the width of the cloud in this example will be `1000px * 0.8 = 800px`.
```js
@Component({
  selector: 'my-component',
  template: `
    <div>
      <angular-tag-cloud
        [data]="data"
        [width]="0.8">
      </angular-tag-cloud>
    </div>
  `
})
// ...
```

## 1.2.0
### Fixes
* Setting a color without providing a link

### Features
* adds an event which returns the clicked tag-cloud-item, related to [ #5 ]

## 1.1.1
### Fixes
* updates version, fixes package.json

## 1.1.0
### Features
* Uses `ngOnChanges`-Lifecycle Hook to refresh data when new `CloudData[]` is passed into component, closes [ #4 ]

## 1.0.0
### Features
* Exports `CloudOptions` and `CloudData` interfaces

### Fixes
* fixes some typos
* be sure that default values are set if passing wrong data through inputs

### Breaking changes
* cahnged input `removeOverflow` to `overflow`.
Before:
```
<angular-tag-cloud
    [data]="data"
    [removeOverflow]="true">
</angular-tag-cloud>
```

After:
```
<angular-tag-cloud
    [data]="data"
    [overflow]="false">
</angular-tag-cloud>
```

## 0.0.1 - 0.0.4
* initial versions
