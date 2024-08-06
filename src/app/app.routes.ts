import { Routes } from '@angular/router';
import { CharViewComponent } from './char-view/char-view.component';
import { CharListComponent } from './char-list/char-list.component';

export const routes: Routes = [
    {path: 'sheets/:character', component: CharViewComponent},
    {path: 'sheets', component: CharListComponent},
];
