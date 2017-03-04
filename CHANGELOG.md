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