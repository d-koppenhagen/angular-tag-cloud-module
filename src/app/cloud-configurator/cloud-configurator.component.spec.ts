import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudConfiguratorComponent } from './cloud-configurator.component';

describe('CloudConfiguratorComponent', () => {
  let component: CloudConfiguratorComponent;
  let fixture: ComponentFixture<CloudConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CloudConfiguratorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
