import { Component, ContentChild, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { CharacterCreationService } from '../../character-creation.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'character-creation-step',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
  //encapsulation: ViewEncapsulation.ShadowDom
})
export class StepComponent implements OnChanges {
  @Input() step!: string;
  @ContentChild('*') content!: any;

  @Output() ready: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  stepData: any = {};
  items: any[] = [];

  selecteds: any[] = []

  constructor(
    private cc: CharacterCreationService
  ){

  }

  flattenObj(obj:any){
    let flat: any = {}
        for(let i in obj){
           if(typeof obj[i] == 'object'){
              let flatObj = this.flattenObj(obj[i])
              for(let x in flatObj){
                  flat[i + "." + x] = flatObj[x]
              }
          } else {
           flat[i] = obj[i]
          }
       }
    return flat;
    }
    

    ngOnChanges(){
        this.stepData = this.cc.getStep(this.step);
      if (this.stepData && 'ref' in this.stepData){
        this.cc.getRef(this.stepData.ref).subscribe((itms: any[])=>{
          this.items = itms;
          this.items.map(x=>x.template = this.applyTemplate(this.stepData.template, this.flattenObj(x)));
        })
      }
    }

  ngOnInit(){
  }

  applyTemplate(tmp:string, itm:any){
    let ret = tmp;
    for(let k of Object.keys(itm)){
        ret = ret.replaceAll('{{'+k+'}}', itm[k].toString());
    }
    return ret;
  }

  select(itm:any){
    if(this.selecteds.indexOf(itm)>=0){
      this.selecteds = this.selecteds.filter(x=>x!==itm);
    } else {
      if(this.stepData.mode === 'choice' && this.stepData.choice <= this.selecteds.length) {
        this.selecteds.shift();
      }     
      this.selecteds.push(itm);
    }
    this.cc.setStepChoices(this.step, itm);
  }

}
