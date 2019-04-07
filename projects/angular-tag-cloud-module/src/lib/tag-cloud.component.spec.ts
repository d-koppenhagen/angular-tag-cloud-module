/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudComponent } from './tag-cloud.component';
import { CloudData, CloudOptions } from './/tag-cloud.interfaces';

const testData: CloudData[] = [
  {text: 'A', weight: 8, link: 'https://link1.com', color: '#ffaaee'},
  {text: 'B', weight: 10, link: 'https://link2.com', tooltip: 'display a tooltip'}
];

@Component({
  selector: 'bm-book-list',
  template: `
    <angular-tag-cloud
      [data]="data"
      [width]="options.width"
      [height]="options.height"
      [randomizeAngle]="options.randomizeAngle"
      [overflow]="options.overflow"
      [zoomOnHover]="options.zoomOnHover"
      [realignOnResize]="options.realignOnResize"
      (clicked)="log('clicked', $event)"
      (dataChanges)="log('dataChanges', $event)"
      (afterInit)="log('After Init', $event)"
      (afterChecked)="log('After Checked', $event)">
    </angular-tag-cloud>
  `
})
class TestHostComponent {
  options: CloudOptions = {
    width : 1,
    height : 1000,
    overflow: false,
    zoomOnHover: null,
    randomizeAngle: false,
    realignOnResize: true
  };

  data: CloudData[] = testData;
}


describe('TagCloudComponent', () => {
  let testHostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let tagCloudEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        TagCloudComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    tagCloudEl = hostFixture.nativeElement.querySelector('angular-tag-cloud');
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('Render CloudData', () => {
    expect(tagCloudEl.textContent).toContain(testData[0].text);
    expect(tagCloudEl.textContent).toContain(testData[1].text);
  });
});
