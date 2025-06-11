import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Stub/placeholder components for all features:
import { GalaxyBackgroundComponent } from './galaxy-background/galaxy-background.component';
import { WhatIfLandingComponent } from './what-if-landing/what-if-landing.component';
import { NarrativeTimelineComponent } from './narrative-timeline/narrative-timeline.component';
import { VisualRealityRendersComponent } from './visual-reality-renders/visual-reality-renders.component';
import { MirrorchatComponent } from './mirrorchat/mirrorchat.component';
import { MetricsDashboardComponent } from './metrics-dashboard/metrics-dashboard.component';
import { RewindRerollComponent } from './rewind-reroll/rewind-reroll.component';
import { MemoryPoemComponent } from './memory-poem/memory-poem.component';
import { ImmersiveAudioToggleComponent } from './immersive-audio-toggle/immersive-audio-toggle.component';
import { CosmicGlowsComponent } from './cosmic-glows/cosmic-glows.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GalaxyBackgroundComponent,
    WhatIfLandingComponent,
    NarrativeTimelineComponent,
    VisualRealityRendersComponent,
    MirrorchatComponent,
    MetricsDashboardComponent,
    RewindRerollComponent,
    MemoryPoemComponent,
    ImmersiveAudioToggleComponent,
    CosmicGlowsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
