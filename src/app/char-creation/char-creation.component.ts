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


@Component({
  selector: 'app-char-creation',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './char-creation.component.html',
  styleUrl: './char-creation.component.scss'
})
export class CharCreationComponent implements OnDestroy {

  charId?: string|null;

  content?: SafeHtml;
  
  style: string = "";
  html: string = "";
  js: string = "";

  styleElement?: HTMLStyleElement;
  scriptElement?: HTMLScriptElement;

  partyId?: string|null;
  partySubMaster?: Subscription;
  partySubGlobal?: Subscription;
  partySubRooms: Map<string, Subscription> = new Map<string, Subscription>();

  pinger?: NodeJS.Timeout;

  charData: any;

  rolling = false;

  messages: any[] = [];

  constructor(
    private ar: ActivatedRoute,
    private h: HttpClient,
    private d: DomSanitizer,
    private char: CharacterService,
    private renderer: Renderer2,
    private dt: DiceTowerService,
    private sb: MatSnackBar,
    private gr: GamerulesService,
    private conn: ConnectionService,

    @Inject(DOCUMENT) private document: HTMLDocument


  ) {

    this.dt.rolling.subscribe(roll => {
      this.rolling = true;
    });
    this.dt.rolled.subscribe(roll=>{
      if(this.partyId && this.charId)
        this.messages.unshift(this.conn.sendRoll(this.charId, this.partyId, roll.field, roll.result));
    })
    this.charId = ar.snapshot.paramMap.get('character');
    this.partyId = ar.snapshot.paramMap.get('party');
    
    //this.dt.initialize();
  }

  ngOnInit(){
    if(this.charId){
      this.char.getCharacter(this.charId).subscribe(data=>{
        this.charData = data; 
        this.gr.loadFor(this.charData.game);
        this.h.get('/assets/templates/'+this.charData.game+'/'+this.charData.type+'/sheet.css', {responseType:'text'}).subscribe(data => {
          //this.style += "<style>"+d.bypassSecurityTrustStyle(data).toString().replaceAll('SafeValue must use [property]=binding: ', '').replaceAll('(see https://g.co/ng/security#xss)','')+"</style>";
          this.style = data;
          this.styleElement = this.renderer.createElement("style") as HTMLStyleElement;
          this.styleElement.type="text/css";
          this.styleElement.appendChild(this.renderer.createText(this.style));
          this.renderer.appendChild(this.document.head, this.styleElement);
        });
        this.h.get('/assets/templates/'+this.charData.game+'/'+this.charData.type+'/sheet.html', {responseType:'text'}).subscribe(data=>{
          this.html = data.split('<script>')[0];
          this.js = "setTimeout(()=>{"+data.split('<script>')[1].split('</script>')[0]+"}, 250);"
          this.content = this.d.bypassSecurityTrustHtml(this.html);
          this.scriptElement = this.renderer.createElement("script");
          this.renderer.setProperty(
            this.scriptElement,
            "text",
            this.js
          );
          this.renderer.appendChild(this.document.head, this.scriptElement);
      
        });
      })
    }
    if(this.partyId && this.charId) { //it's play time!
      this.pinger = setInterval(()=>{
        if(this.partyId && this.charId)
          this.conn.ping(this.charId, this.partyId);
      }, 2500);
      this.partySubMaster = this.conn.getMasterConnection(this.charId, this.partyId).subscribe(message=>{
        const msg = JSON.parse(message.payload.toString());
        console.log(msg);
        this.conn.emit(msg.field, msg);
      });
      this.partySubGlobal = this.conn.getChatConnection(this.charId, this.partyId).subscribe(message=>{
        const msg = JSON.parse(message.payload.toString());
        this.messages.unshift(msg);
      });
    }
  }
  ngOnDestroy(): void {
    this.scriptElement?.remove();
    this.styleElement?.remove();
    if(this.charId && this.partyId){
      this.conn.disconnect(this.charId, this.partyId);
      this.partySubMaster?.unsubscribe();
      this.partySubGlobal?.unsubscribe();
      clearInterval(this.pinger);
    }
  }

  close(){
    this.rolling=false;
    this.sb.dismiss();    
  }
}

