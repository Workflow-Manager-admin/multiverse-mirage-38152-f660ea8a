import { Component } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/** The Multiverse Mirage main container.
 * - Immersive galaxy/starfield background with color overlays
 * - Central "What if..." prompt input, proceeding to a split simulation view
 * - All major app slots/components stubbed for expansion
 * - Uses global theme/colors/fonts as per requirements
 */
export class AppComponent {
  // Theming and feature flags
  public readonly palette = {
    primary: '#1a1333',
    secondary: '#2d1e4f',
    accent: '#00ffe7'
  };
  public readonly fonts = {
    heading: "'Space Grotesk', 'Inter', sans-serif",
    body: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"
  };

  // App state
  started = false;
  scenario: string | null = null;
  profile: { mbti: string; big5: string } = { mbti: '', big5: '' };

  onScenarioSubmit(event: { scenario: string, profile: { mbti: string, big5: string } }) {
    this.started = true;
    this.scenario = event.scenario;
    this.profile = event.profile;
  }

  onBack() {
    this.started = false;
    this.scenario = null;
    this.profile = { mbti: '', big5: '' };
  }
}
