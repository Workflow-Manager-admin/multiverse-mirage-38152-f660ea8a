import { Component, EventEmitter, Output } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-what-if-landing',
  templateUrl: './what-if-landing.component.html',
  styleUrls: ['./what-if-landing.component.scss']
})
/** Landing component: scenario and psychological profile input form (MBTI/Big5).
 * Emits (submitted) when form is filled.
 */
export class WhatIfLandingComponent {
  scenario = '';
  profile = { mbti: '', big5: '' };

  @Output() submitted = new EventEmitter<{ scenario: string, profile: { mbti: string, big5: string } }>();

  onSubmit() {
    if (this.scenario.length > 3) {
      this.submitted.emit({ scenario: this.scenario, profile: this.profile });
    }
  }
}
