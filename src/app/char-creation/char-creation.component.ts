import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnDestroy, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CharacterService } from '../character.service';
import { DiceTowerService } from '../dice-tower.service';
import { GamerulesService } from '../gamerules.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConnectionService } from '../connection.service';
import { Subscription } from 'rxjs';
import { CharacterCreationService } from '../character-creation.service';


@Component({
  selector: 'app-char-creation',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './char-creation.component.html',
  styleUrl: './char-creation.component.scss'
})
export class CharCreationComponent {

  game?: string|null;
  gameRules: any = {};

  content?: SafeHtml;
  
  style: string = "";
  html: string = "";
  js: string = "";

  styleElement?: HTMLStyleElement;
  scriptElement?: HTMLScriptElement;

  type?: string|null;

  charData: any;

  rolling = false;

  messages: any[] = [];

  constructor(
    private ar: ActivatedRoute,
    private h: HttpClient,
    private d: DomSanitizer,
    private renderer: Renderer2,
    private dt: DiceTowerService,
    private sb: MatSnackBar,
    private gr: GamerulesService,
    private cc: CharacterCreationService,

    @Inject(DOCUMENT) private document: HTMLDocument
  ) {

    this.dt.rolling.subscribe(roll => {
      this.rolling = true;
    });
    this.dt.rolled.subscribe(roll=>{
    })
    this.game = ar.snapshot.paramMap.get('game');
    this.type = ar.snapshot.paramMap.get('type');
    
    //this.dt.initialize();
  }

  ngOnInit(){
    if(this.game && this.type){
      this.cc.getFor(this.game, this.type).subscribe(data=>{
        this.charData = data; 
        this.gr.loadFor(this.charData.game);
        this.h.get('/assets/templates/'+this.charData.game+'/'+this.charData.type+'/creation.css', {responseType:'text'}).subscribe(data => {
          //this.style += "<style>"+d.bypassSecurityTrustStyle(data).toString().replaceAll('SafeValue must use [property]=binding: ', '').replaceAll('(see https://g.co/ng/security#xss)','')+"</style>";
          this.style = data;
          this.styleElement = this.renderer.createElement("style") as HTMLStyleElement;
          this.styleElement.type="text/css";
          this.styleElement.appendChild(this.renderer.createText(this.style));
          this.renderer.appendChild(this.document.head, this.styleElement);
        });
        this.h.get('/assets/templates/'+this.charData.game+'/'+this.charData.type+'/creation.html', {responseType:'text'}).subscribe(data=>{
          this.html = data.split('<script>')[0];
          if (data.split('<script>')[1].length > 0){
            this.js = "setTimeout(()=>{"+data.split('<script>')[1].split('</script>')[0]+"}, 250);"
            this.content = this.d.bypassSecurityTrustHtml(this.html);
            this.scriptElement = this.renderer.createElement("script");
            this.renderer.setProperty(
              this.scriptElement,
              "text",
              this.js
            );
            this.renderer.appendChild(this.document.head, this.scriptElement);
          }
      
        });
      })
    }
    
  }
}

