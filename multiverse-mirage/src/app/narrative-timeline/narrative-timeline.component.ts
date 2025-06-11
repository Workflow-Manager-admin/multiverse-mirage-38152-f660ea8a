import { Component, Input } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-narrative-timeline',
  template: `
  <div class="section-title">Alternate Timeline:</div>
  <div class="narrative-timeline">
    <span class="narrative-placeholder">[AI-generated narrative would appear here for scenario: <em>{{scenario}}</em>]</span>
  </div>`,
  styleUrls: ['./narrative-timeline.component.scss']
})
/** Displays the narrative timeline for the provided scenario (placeholder for GPT-4o narrative). */
export class NarrativeTimelineComponent {
  @Input() scenario: string | null = null;
  @Input() profile: { mbti: string, big5: string } | null = null;
}
