import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noInfo'
})
export class NoInfoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value === "0") {
      return "coïruᐛ)ᕗ d▓ta";
    }
    if (value === "unknown") {
      return "nᐛt rΣcoᕕerable";
    }
    return value;
  }

}
