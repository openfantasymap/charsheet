import { Routes } from '@angular/router';
import { CharViewComponent } from './char-view/char-view.component';
import { CharListComponent } from './char-list/char-list.component';
import { DefaultComponent } from './default/default.component';
import { PartyListComponent } from './party-list/party-list.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { PartyMasterComponent } from './party-master/party-master.component';
import { PartyJoinComponent } from './party-join/party-join.component';
import { CharCreationComponent } from './char-creation/char-creation.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { CharImporterComponent } from './char-importer/char-importer.component';
import { CreatePartyComponent } from './create-party/create-party.component';

export const routes: Routes = [
    {path: 'parties/create', component: CreatePartyComponent},
    {path: 'parties/:party/master', component: PartyMasterComponent},
    {path: 'parties/:party', component: PartyDetailComponent},
    {path: 'parties/:party/join', component: PartyJoinComponent},
    {path: 'parties/:party/:character', component: CharViewComponent},
    {path: 'parties', component: PartyListComponent},
    
    {path: 'sheets/:character', component: CharViewComponent},
    {path: 'sheets', component: CharListComponent},

    {path: 'create/:game/:type', component: CharCreationComponent},
    {path: 'create/:game', component: CharCreationComponent},
    {path: 'create', component: AddDialogComponent},
    
    {path: 'import', component: CharImporterComponent},
    {path: '', component: DefaultComponent}
];
