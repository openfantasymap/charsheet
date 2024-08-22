import { Component, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-char-importer',
  standalone: true,
  imports: [],
  templateUrl: './char-importer.component.html',
  styleUrl: './char-importer.component.scss'
})
export class CharImporterComponent {
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();


  @HostBinding('style.width') private width = '100vw';
  @HostBinding('style.height') private height = 'calc(100vw - 68px)';
  @HostBinding('style.display') private display = 'block';
  @HostBinding('style.background') private background = '#eee';
  @HostBinding('style.border') private borderStyle = '2px dashed';
  @HostBinding('style.border-color') private borderColor = '#696D7D';
  @HostBinding('style.border-radius') private borderRadius = '5px';

  @HostListener('dragover', ['$event']) public onDragOver(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'lightgray';
    this.borderColor = 'cadetblue';
    this.borderStyle = '3px solid';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
  }

  @HostListener('drop', ['$event']) public onDrop(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
    debugger;
    let files = evt.dataTransfer.files;
    let valid_files : Array<File> = files;
    this.filesChangeEmiter.emit(valid_files);
  }

}
