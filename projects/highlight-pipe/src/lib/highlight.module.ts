import { NgModule } from '@angular/core';
import { HighlightPipe } from './highlight.pipe';

@NgModule({
  imports: [HighlightPipe],
  exports: [HighlightPipe],
  declarations: [],
})
export class HighlightModule {}
