import { Routes } from '@angular/router';
import { CharViewComponent } from './char-view/char-view.component';
import { CharListComponent } from './char-list/char-list.component';
import { DefaultComponent } from './default/default.component';
import { PartyListComponent } from './party-list/party-list.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { PartyMasterComponent } from './party-master/party-master.component';

export const routes: Routes = [
    {path: 'parties/:party/master', component: PartyMasterComponent},
    {path: 'parties/:party', component: PartyDetailComponent},
    {path: 'parties/:party/:character', component: CharViewComponent},
    {path: 'parties', component: PartyListComponent},
    {path: 'sheets/:character', component: CharViewComponent},
    {path: 'sheets', component: CharListComponent},
    {path: '', component: DefaultComponent}
];
