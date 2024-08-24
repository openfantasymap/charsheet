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
import { StepComponent } from "./step/step.component";


@Component({
  selector: 'app-char-creation',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule, HttpClientModule, RouterModule, StepComponent],
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

  ccData: any;

  rolling = false;

  messages: any[] = [];

  currentStep = "";
  currentIndex = 0;

  steps:any[] = [];

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
    if(!this.type){
    }
    if(this.game && this.type){
      this.gr.loadFor(this.game);
      this.cc.getFor(this.game, this.type).subscribe(data=>{
        this.ccData = data; 
        this.steps = this.ccData.sequence.map((x:any)=>{
          let b = this.ccData.steps[x];
          b['id'] = x;
          return b;
        });
        this.h.get('/assets/templates/'+this.game+'/'+this.type+'/creation.css', {responseType:'text'}).subscribe(data => {
          //this.style += "<style>"+d.bypassSecurityTrustStyle(data).toString().replaceAll('SafeValue must use [property]=binding: ', '').replaceAll('(see https://g.co/ng/security#xss)','')+"</style>";
          this.style = data;
          this.styleElement = this.renderer.createElement("style") as HTMLStyleElement;
          this.styleElement.type="text/css";
          this.styleElement.appendChild(this.renderer.createText(this.style));
          this.renderer.appendChild(this.document.head, this.styleElement);
        });
        this.currentStep = this.ccData.sequence[this.currentIndex];
      })
    }
    
  }

  goNext(){
    this.currentIndex = Math.min(++this.currentIndex, this.ccData.sequence.length);
    this.currentStep = this.ccData.sequence[this.currentIndex];
  }
  goPrev(){
    this.currentIndex = Math.max(--this.currentIndex, 0);
    this.currentStep = this.ccData.sequence[this.currentIndex];
  }

  goTo(id:string){
    this.currentIndex = this.ccData.sequence.indexOf(id);
    this.currentStep = this.ccData.sequence[this.currentIndex];
  }

  done(){
    
  }
}

