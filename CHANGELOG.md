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
