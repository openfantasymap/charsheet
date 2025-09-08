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
import { AuthcallbackComponent } from './authcallback/authcallback.component';
import { AuthGuard } from './auth.guard';
import { IndexComponent } from './index/index.component';
import { SheetEditorComponent } from './sheet-editor/sheet-editor.component';

export const routes: Routes = [
    {path: 'parties/create', component: CreatePartyComponent, canActivate: [AuthGuard]},
    {path: 'parties/:party/master', component: PartyMasterComponent, canActivate: [AuthGuard]},
    {path: 'parties/:party', component: PartyDetailComponent, canActivate: [AuthGuard]},
    {path: 'parties/:party/join', component: PartyJoinComponent, canActivate: [AuthGuard]},
    {path: 'parties/:party/:character', component: CharViewComponent},
    {path: 'parties', component: PartyListComponent, canActivate: [AuthGuard]},
    
    {path: 'sheets/:character', component: CharViewComponent, canActivate: [AuthGuard]},
    {path: 'sheets', component: CharListComponent, canActivate: [AuthGuard]},

    {path: 'create/:game/:type', component: CharCreationComponent, canActivate: [AuthGuard]},
    {path: 'create/:game', component: CharCreationComponent, canActivate: [AuthGuard]},
    {path: 'create', component: AddDialogComponent, canActivate: [AuthGuard]},
    
    {path: 'editor/:game/:ttype', component: SheetEditorComponent},
    
    {path: 'import', component: CharImporterComponent, canActivate: [AuthGuard]},
    {path: 'agent', component: DefaultComponent, canActivate: [AuthGuard]},
    
    { 
        path: 'auth/callback',
        redirectTo: 'agent'
    },

    

    {path: '', component: IndexComponent}
];
