import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createCustomElement } from '@angular/elements';
import { FieldComponent } from './field/field.component';
import { FormControl, FormsModule } from '@angular/forms';
import { RollableComponent } from './rollable/rollable.component';
import { RollablefieldComponent } from './rollablefield/rollablefield.component';
import { TableComponent } from './table/table.component';
import { DiceTowerService } from './dice-tower.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FieldComponent, FormsModule, CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'charsheet';
  control = new FormControl('<app-alert>This is neat</app-alert>');
  dstatus = false;

  constructor(private injector: Injector, private dt: DiceTowerService) {
    dt.rolling.subscribe(status=>{
      this.dstatus = status;
    })
  }
  ngOnInit() {

    const csfield = createCustomElement(FieldComponent, { injector: this.injector });
    customElements.define('charsheet-field', csfield);
    const csrollable = createCustomElement(RollableComponent, { injector: this.injector });
    customElements.define('charsheet-rollable', csrollable);
    const csrollablefield = createCustomElement(RollablefieldComponent, { injector: this.injector });
    customElements.define('charsheet-rollable-field', csrollablefield);
    const cstable = createCustomElement(TableComponent, { injector: this.injector });
    customElements.define('charsheet-table', cstable);
  }
}
