import { Pipe, PipeTransform } from '@angular/core';
import { GamerulesService } from './gamerules.service';

@Pipe({
  name: 'transform',
  standalone: true
})
export class TransformPipe implements PipeTransform {

  constructor(
    private g: GamerulesService
  ) {}

  transform(value: string, ...args: unknown[]): string {
    return this.g.transform(value);
  }

}
