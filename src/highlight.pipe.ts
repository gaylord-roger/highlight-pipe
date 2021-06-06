import { Pipe, PipeTransform } from '@angular/core';
/*
 * Highlight some text
 * Usage:
 *   value | highlight:text_to_highlight
 * Example:
 *   {{ 'my text to highlight' | highlight:'text' }}
 *   formats to: 'my <mark>text</mark> to highlight'
 *   {{ 'my text to highlight':[ 'highlight', 'text'] }}
 *   formats to: 'my <mark>text</mark> to <mark>highlight</mark>'
*/
@Pipe({name: 'highlight'})
export class HighlightPipe implements PipeTransform {
  transform(value: string, args: string|string[]): string {
    return value;
  }
}