/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudComponent } from './tag-cloud.component';
import { CloudData, CloudOptions } from './tag-cloud.interfaces';

@Component({
  selector: 'tag-cloud-dummy',
  template: `
    <angular-tag-cloud
      [data]="data"
      [strict]="options.strict"
      [config]="configObject"
    ></angular-tag-cloud>
  `,
})
class TestHostComponent {
  options: CloudOptions = {};
  configObject: CloudOptions = {};
  data: CloudData[];
}

describe('TagCloudComponent', () => {
  let testHostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let tagCloudEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TagCloudComponent],
    }).compileComponents();
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

  it('should render CloudData', () => {
    testHostComponent.data = [{ text: 'A' }, { text: 'B' }];

    hostFixture.detectChanges();

    expect(tagCloudEl.textContent).toContain('A');
    expect(tagCloudEl.textContent).toContain('B');
    expect(tagCloudEl.childElementCount).toBe(2);
    expect(tagCloudEl.getElementsByClassName('w5').length).toBe(2);
  });

  it('should correctly assign the weight property', () => {
    testHostComponent.data = [
      { text: 'A', weight: 1 },
      { text: 'B', weight: 2 },
      { text: 'C', weight: 3 },
      { text: 'D', weight: 4 },
      { text: 'E', weight: 5 },
      { text: 'F', weight: 6 },
      { text: 'G', weight: 7 },
      { text: 'H', weight: 8 },
      { text: 'I', weight: 9 },
      { text: 'J', weight: 10 },
    ];

    hostFixture.detectChanges();

    expect(tagCloudEl.textContent).toContain('A');
    expect(tagCloudEl.textContent).toContain('B');
    expect(tagCloudEl.textContent).toContain('C');
    expect(tagCloudEl.textContent).toContain('D');
    expect(tagCloudEl.textContent).toContain('E');
    expect(tagCloudEl.textContent).toContain('F');
    expect(tagCloudEl.textContent).toContain('G');
    expect(tagCloudEl.textContent).toContain('H');
    expect(tagCloudEl.textContent).toContain('I');
    expect(tagCloudEl.textContent).toContain('J');

    expect(tagCloudEl.childElementCount).toBe(10);

    expect(tagCloudEl.getElementsByClassName('w1').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w2').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w3').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w4').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w5').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w6').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w7').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w8').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w9').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w10').length).toBe(1);
  });

  it('should correctly calculate the weight if scale raange is smaller than 10', () => {
    testHostComponent.data = [
      { text: 'A', weight: 3 },
      { text: 'B', weight: 3 },
      { text: 'C', weight: 6 },
      { text: 'D', weight: 7 },
      { text: 'E', weight: 7 },
    ];
    // check if the config object will be explicitely overridden by the separate input property
    testHostComponent.configObject.strict = true;
    testHostComponent.options.strict = false;

    hostFixture.detectChanges();

    expect(tagCloudEl.textContent).toContain('A');
    expect(tagCloudEl.textContent).toContain('B');
    expect(tagCloudEl.textContent).toContain('C');
    expect(tagCloudEl.textContent).toContain('D');
    expect(tagCloudEl.textContent).toContain('E');

    expect(tagCloudEl.childElementCount).toBe(5);

    expect(tagCloudEl.getElementsByClassName('w1').length).toBe(2);
    expect(tagCloudEl.getElementsByClassName('w8').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w10').length).toBe(2);
  });

  it('should not calculate the weight if strict property has been set', () => {
    testHostComponent.data = [
      { text: 'A', weight: 3 },
      { text: 'B', weight: 3 },
      { text: 'C', weight: 6 },
      { text: 'D', weight: 7 },
      { text: 'E', weight: 7 },
    ];
    // check if the config object will be explicitely overridden by the separate input property
    testHostComponent.configObject.strict = false;
    testHostComponent.options.strict = true;

    hostFixture.detectChanges();

    expect(tagCloudEl.textContent).toContain('A');
    expect(tagCloudEl.textContent).toContain('B');
    expect(tagCloudEl.textContent).toContain('C');
    expect(tagCloudEl.textContent).toContain('D');
    expect(tagCloudEl.textContent).toContain('E');

    expect(tagCloudEl.childElementCount).toBe(5);

    expect(tagCloudEl.getElementsByClassName('w3').length).toBe(2);
    expect(tagCloudEl.getElementsByClassName('w6').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w7').length).toBe(2);
  });

  it('should correctly calculate the weight if it is out of scale 1-10', () => {
    testHostComponent.data = [
      { text: 'A', weight: -20 },
      { text: 'B', weight: 0 },
      { text: 'C', weight: 30 },
      { text: 'D', weight: 90 },
    ];

    hostFixture.detectChanges();

    expect(tagCloudEl.textContent).toContain('A');
    expect(tagCloudEl.textContent).toContain('B');
    expect(tagCloudEl.textContent).toContain('C');
    expect(tagCloudEl.textContent).toContain('D');

    expect(tagCloudEl.childElementCount).toBe(4);

    expect(tagCloudEl.getElementsByClassName('w1').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w3').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w5').length).toBe(1);
    expect(tagCloudEl.getElementsByClassName('w10').length).toBe(1);
  });

  it('should add hyperlinked words', () => {
    testHostComponent.data = [
      { text: 'A', link: 'http://google.de' },
      { text: 'B', link: 'http://google.de', external: true },
      { text: 'C', link: 'http://google.de', external: false },
      { text: 'D', link: 'http://google.de', external: null },
      { text: 'E', link: '' },
      { text: 'F', link: null },
      { text: 'G', link: null, external: false },
      { text: 'H', link: null, external: true },
      { text: 'I', link: '', external: false },
      { text: 'J', link: '', external: true },
    ];

    hostFixture.detectChanges();

    expect(tagCloudEl.childElementCount).toBe(10);
    expect(tagCloudEl.getElementsByTagName('a').length).toBe(4);
    // TODO: check for externals if 'target' attr has been set
  });
});
