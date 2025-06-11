import { Component, Input } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-memory-poem',
  template: `<div class="memory-poem">[Memory Poem summary placeholder]</div>`,
  styleUrls: ['./memory-poem.component.scss']
})
/** Memory Poem summarizing the emotional simulation arc (stub). */
export class MemoryPoemComponent {
  @Input() scenario: string | null = null;
}
