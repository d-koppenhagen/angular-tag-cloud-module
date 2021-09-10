import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CloudConfiguratorComponent } from './cloud-configurator.component';

describe('CloudConfiguratorComponent', () => {
  let component: CloudConfiguratorComponent;
  let fixture: ComponentFixture<CloudConfiguratorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CloudConfiguratorComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
