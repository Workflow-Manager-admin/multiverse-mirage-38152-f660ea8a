import { Component, Input } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-metrics-dashboard',
  template: `
    <div class="dashboard-title">Metrics Dashboard</div>
    <div class="metrics-radials">
      <div class="metrics-radial" *ngFor="let k of metricsKeys">
        <svg width="78" height="78"><!-- empty, real chart later --></svg>
        <div class="metric-label">{{k.label}}</div>
      </div>
    </div>
    <div class="metrics-sliders">
      <div class="slider-row" *ngFor="let k of metricsKeys">
        <label>{{k.label}}:</label>
        <input type="range" min="0" max="100"/>
      </div>
    </div>
  `,
  styleUrls: ['./metrics-dashboard.component.scss']
})
/** Interactive metrics dashboard (stub). */
export class MetricsDashboardComponent {
  @Input() scenario: string | null = null;
  metricsKeys = [
    { label: 'Emotion', key: 'emotional' },
    { label: 'Career', key: 'career' },
    { label: 'Finances', key: 'finances' },
    { label: 'Relationships', key: 'relationships' }
  ];
}
