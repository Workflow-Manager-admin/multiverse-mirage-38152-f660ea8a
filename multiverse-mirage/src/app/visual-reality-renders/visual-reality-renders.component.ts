import { Component, Input } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-visual-reality-renders',
  template: `
    <div class="renders-title">Reality Renders</div>
    <div class="renders-list">
      <div class="render-placeholder">[Stable Diffusion images will go here]</div>
    </div>
  `,
  styleUrls: ['./visual-reality-renders.component.scss']
})
/** Renders visual scene outputs (placeholder for diffusion images). */
export class VisualRealityRendersComponent {
  @Input() scenario: string | null = null;
}
