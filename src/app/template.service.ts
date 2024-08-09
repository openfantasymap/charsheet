import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  //@ts-ignore
  private renderer: Renderer2;
  //@ts-ignore
  private document: HTMLDocument;
  private initialized = false;

  constructor(
    private h: HttpClient,
    private d: DomSanitizer,
  ) { }

  setup(renderer: Renderer2, document: HTMLDocument) {
    this.renderer = renderer;
    this.document = document;
    this.initialized = true;
  }
  style: string = "";
  html: string = "";
  js: string = "";

  styleElement?: HTMLStyleElement;
  scriptElement?: HTMLScriptElement;
  content?: SafeHtml;

  getStyle(game:string, type:string, mode: string="desktop"){
    if(this.initialized){
      this.h.get('/assets/templates/'+game+'/'+type+'.css', {responseType:'text'}).subscribe(data => {
        //this.style += "<style>"+d.bypassSecurityTrustStyle(data).toString().replaceAll('SafeValue must use [property]=binding: ', '').replaceAll('(see https://g.co/ng/security#xss)','')+"</style>";
        this.style = data;
        this.styleElement = this.renderer.createElement("style") as HTMLStyleElement;
        this.styleElement.type="text/css";
        this.styleElement.appendChild(this.renderer.createText(this.style));
        this.renderer.appendChild(this.document.head, this.styleElement);
      });
    } else {
      throw new Error('TemplateService not initialized');
    }
  }

  getPage(game:string, type:string, mode: string="desktop"){
    this.h.get('/assets/templates/'+game+'/'+type+'.html', {responseType:'text'}).subscribe(data=>{
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
  
  }

  getScripts(game:String, type:String){

  }
}
