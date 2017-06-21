## 1.4.0
## Fixes
* Simplify the Sorting Algorithm ([d788ab0](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/d788ab0934d6bce4c931f7e88a0b25ee2e7804f2)), fixes [#15]

## Features
* Adding changes to update the DOM ([436ce82](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/d788ab0934d6bce4c931f7e88a0b25ee2e7804f2)), fixes [#16]

## 1.3.2
## Fixes
* Null pointer error when options change but data does not, ([63066f7](https://github.com/d-koppenhagen/angular-tag-cloud-module/commit/c54a9b8f8732b508ef88da714af63b81570e57ec)), fixes [#13]

## 1.3.1
## Fixes
* Adds events `afterInit` and `afterChecked`, fixes [#7]
* Adds a link to a wiki page which explains how to change the stlyesheet, fixes [#6]
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
## Fixes
* Setting a color without providing a link

## Features
* adds an event which returns the clicked tag-cloud-item, related to [#5]

## 1.1.1
## Fixes
* updates version, fixes package.json

## 1.1.0
## Features
* Uses `ngOnChanges`-Lifecycle Hook to refresh data when new `Array<CloudData>` is passed into component, closes [#4]

## 1.0.0
## Features
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
