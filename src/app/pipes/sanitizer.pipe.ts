import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer',
})
export class SantizerPipe {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | unknown, arg: string): string | SafeHtml {
    if (!value) return '';
    const randomValue = new Date().getMilliseconds();

    switch (arg) {
      case 'image':
        return `${value}?timer=${randomValue}`;
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value as string) || '';

      default:
        return '';
    }
  }
}
