import { Pipe, PipeTransform } from '@angular/core';

class Interval {
  public start = 0;
  public end = 0;
}

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
  highlight(value: string, word: string): string {
    const startIndex = value.toLowerCase().indexOf(word.toLowerCase());
    if (startIndex !== -1) {
      const endLength = word.length;
      const matchingString = value.substr(startIndex, endLength);
      return value.replace(matchingString, '<mark>' + matchingString + '</mark>');
    }
    return '';
  }

  // retourne une liste d'interval où le mot est trouvé
  findWord(value: string, word: string): Interval[] {
    const liste = [];

    const endLength = value.length;
    let startIndex = value.indexOf(word);
    while (startIndex > -1) {
      liste.push({ start: startIndex, end: startIndex + word.length });
      startIndex = value.indexOf(word, startIndex + word.length);
    }

    return liste;
  }

  transform(value: any, args: any): any {
    if (args && value) {
      if (typeof args === 'string') {
        args = [args];
      }

      const lcValue = value.toLowerCase();
      // extrait tous les intervals des mots à marquer
      let intervals: Interval[] = [];

      for (const word of args) {
        if (word && word !== '') {
          const found = this.findWord(lcValue, word.toLowerCase());
          for (const f of found) {
            intervals.push(f);
          }
        }
      }

      if (intervals.length === 0) {
        return value;
      }

      // simplifie les intervals
      intervals = intervals
        .sort((a, b) => {
          return a.start - b.start || a.end - b.end;
        })
        .reduce((r, a) => {
          const last = r[r.length - 1] || ({} as Interval);
          if (last.start <= a.start && a.start <= last.end) {
            if (last.end < a.end) {
              last.end = a.end;
            }
            return r;
          }
          return r.concat(a);
        }, [] as Interval[]);

      let resultat = '';
      let idx = 0;

      // highlight les intervals
      for (const interval of intervals) {
        if (interval.start > idx) {
          resultat += value.substring(idx, interval.start);
        }
        const matchingString = value.substring(interval.start, interval.end);
        resultat += '<mark>' + matchingString + '</mark>';
        idx = interval.end;
      }
      resultat += value.substring(idx, value.length);
      return resultat;
    }

    return value;
  }
}
