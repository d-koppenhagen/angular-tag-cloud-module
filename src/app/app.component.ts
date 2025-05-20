import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CloudConfiguratorComponent } from './cloud-configurator/cloud-configurator.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        CloudConfiguratorComponent,
    ]
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/github-circle-white-transparent.svg',
      ),
    );
  }
}
