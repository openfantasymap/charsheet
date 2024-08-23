import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterCreationService {
  character: any = {}
  setStepChoices(step: string, itm: any) {
    if (!(step in this.character)){
      this.character[step] = [];
    }
    this.character[step].push(itm);
  }
  getRef(ref: any):Observable<any[]> {
    return this.h.get<any[]>(ref);
  }
  ccdata: any;
  getStep(step: string | undefined) {
    if(step)
      return this.ccdata.steps[step];
    return {};
  }
  getFor(game: string, type: string) {
    return this.h.get('/assets/templates/'+game+'/'+type+'/creation.json').pipe(tap(x=>this.ccdata=x));
  }

  constructor(
    private h: HttpClient
  ) { }
}
