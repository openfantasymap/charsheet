import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import createStudioEditor from '@grapesjs/studio-sdk';
import { tableComponent, iconifyComponent, accordionComponent, flexComponent, rteTinyMce, canvasGridMode, canvasFullSize, layoutSidebarButtons } from '@grapesjs/studio-sdk-plugins';
import { BlockManagerStore } from '@grapesjs/studio-sdk/dist/store/blockManager';
import '@grapesjs/studio-sdk/dist/style.css';

@Component({
  selector: 'app-sheet-editor',
  standalone: true,
  imports: [],
  templateUrl: './sheet-editor.component.html',
  styleUrl: './sheet-editor.component.scss'
})
export class SheetEditorComponent implements AfterViewInit {

  ruleset!: string;
  sheet_type!: string;

  constructor(
    private ar: ActivatedRoute,
    private h: HttpClient
  ){ 
    this.ruleset = ar.snapshot.paramMap.get('game')!;
    this.sheet_type = ar.snapshot.paramMap.get('ttype')!;

  }



  ngAfterViewInit(){
    this.h.get<any>(`http://51.159.6.136:59912/api/templates/${this.ruleset}/${this.sheet_type}/project`).subscribe(data=>{

createStudioEditor({
  root: '#studio-editor',
  licenseKey: '988e54999940449ca500c8f9915ac24c95740c38e1cd490b981b623521722d2b',
  project: data.project, 
  pages:{
    remove: false,
    add: false,
    duplicate: false,
    settings: false,
  },
  dataSources: {
      blocks: true, // This enables the Data Source specific blocks
      globalData: data.data
    },

  assets: {
    storageType: 'self',
    // Provide a custom upload handler for assets
    onUpload: async ({ files }) => {
      const body = new FormData();
      for (const file of files) {
        body.append('files', file);
      }
      const response = await fetch('ASSETS_UPLOAD_URL', { method: 'POST', body });
      const result = await response.json();
      // The expected result should be an array of assets, eg.
      // [{ src: 'ASSET_URL' }]
      return result;
    },
    // Provide a custom handler for deleting assets
    onDelete: async ({ assets }) => {
      const body = JSON.stringify(assets);
      await fetch('ASSETS_DELETE_URL', { method: 'DELETE', body });
    }
  },
  storage: {
    type: 'self',
    // Provide a custom handler for saving the project data.
    onSave: async ({ project }) => {
      throw new Error('Implement your "onSave"!');
      const body = new FormData();
      body.append('project', JSON.stringify(project));
      await fetch('PROJECT_SAVE_URL', { method: 'POST', body });
    },
    
    autosaveChanges: 100,
    autosaveIntervalMs: 10000
  }
});
    })
  }
  
}
