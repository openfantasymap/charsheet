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

@Component({
  selector: 'app-char-view',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, MatSnackBarModule],
  templateUrl: './char-view.component.html',
  styleUrl: './char-view.component.scss'
})
export class CharViewComponent implements OnDestroy {

  charId?: string|null;

  content?: SafeHtml;
  
  style: string = "";
  html: string = "";
  js: string = "";

  styleElement?: HTMLStyleElement;
  scriptElement?: HTMLScriptElement;

  charData: any;

  rolling = false;

  constructor(
    private ar: ActivatedRoute,
    private h: HttpClient,
    private d: DomSanitizer,
    private char: CharacterService,
    private renderer: Renderer2,
    private dt: DiceTowerService,
    private sb: MatSnackBar,
    private gr: GamerulesService,
    @Inject(DOCUMENT) private document: HTMLDocument


  ) {

    this.dt.rolling.subscribe(roll => {
      this.rolling = true;
    })
    this.charId = ar.snapshot.paramMap.get('character');
    
    //this.dt.initialize();
  }

  ngOnInit(){
    if(this.charId){
      this.char.getCharacter(this.charId).subscribe(data=>{
        this.charData = data; 
        this.gr.loadFor(this.charData.game);
        this.h.get('/assets/templates/'+this.charData.game+'/'+this.charData.type+'.css', {responseType:'text'}).subscribe(data => {
          //this.style += "<style>"+d.bypassSecurityTrustStyle(data).toString().replaceAll('SafeValue must use [property]=binding: ', '').replaceAll('(see https://g.co/ng/security#xss)','')+"</style>";
          this.style = data;
          this.styleElement = this.renderer.createElement("style") as HTMLStyleElement;
          this.styleElement.type="text/css";
          this.styleElement.appendChild(this.renderer.createText(this.style));
          this.renderer.appendChild(this.document.head, this.styleElement);
        });
        this.h.get('/assets/templates/'+this.charData.game+'/'+this.charData.type+'.html', {responseType:'text'}).subscribe(data=>{
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
  }
  ngOnDestroy(): void {
    this.scriptElement?.remove();
    this.styleElement?.remove();
  }

  close(){
    this.rolling=false;
    this.sb.dismiss();    
  }
}

