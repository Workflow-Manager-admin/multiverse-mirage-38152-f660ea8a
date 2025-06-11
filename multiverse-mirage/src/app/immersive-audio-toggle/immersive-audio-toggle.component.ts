import { Component } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-immersive-audio-toggle',
  templateUrl: './immersive-audio-toggle.component.html',
  styleUrls: ['./immersive-audio-toggle.component.scss']
})
/** Button toggling simulated immersive audio (stub). */
export class ImmersiveAudioToggleComponent {
  playing = false;
  toggle() { this.playing = !this.playing; }
}
