import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterSheetService {

  private obs: Map<string, Map<string, EventEmitter<any>>> = new Map<string, Map<string, EventEmitter<any>>>();

  observe(aotm: any, field: any) {
    if(!this.obs.has(aotm))
      this.obs.set(aotm, new Map<string, EventEmitter<any>>());
      if (!this.obs.get(aotm)?.has(field)){
        this.obs.get(aotm)?.set(field, new EventEmitter<any>());
      } 
    return this.obs.get(aotm)?.get(field);
  }

  emit(aotm:string, field:string, roll: any){
    if(!this.obs.has(aotm))
      this.obs.set(aotm, new Map<string, EventEmitter<any>>());
      if (!this.obs.get(aotm)?.has(field)){
        this.obs.get(aotm)?.set(field, new EventEmitter<any>());
      } 
    this.obs.get(aotm)?.get(field)?.emit(roll);
    
  }

  constructor() { }
}
