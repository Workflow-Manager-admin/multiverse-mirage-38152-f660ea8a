import { Component, Input } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-mirrorchat',
  template: `
    <div class="mirrorchat-title">MirrorChat</div>
    <div class="mirrorchat-box">
      <div class="chat-placeholder">[AI chat interface and voice input go here]</div>
    </div>
  `,
  styleUrls: ['./mirrorchat.component.scss']
})
/** MirrorChat: AI character chat interface (stub). */
export class MirrorchatComponent {
  @Input() scenario: string | null = null;
}
