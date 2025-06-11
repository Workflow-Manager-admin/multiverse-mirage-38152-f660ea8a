import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-galaxy-background',
  template: `<canvas #starsCanvas class="galaxy-canvas" tabindex="-1" aria-hidden="true"></canvas>`,
  styleUrls: ['./galaxy-background.component.scss']
})
/** Immersive animated starfield/cosmic background using Canvas. Not interactive. */
export class GalaxyBackgroundComponent implements AfterViewInit {
  @ViewChild('starsCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private animationId?: number;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    // Starfield
    const NUM_STARS = 145;
    const stars = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.7 + 0.45,
      speed: Math.random() * 0.04 + 0.02,
      phase: Math.random() * Math.PI * 2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const alpha = 0.31 + 0.69 * Math.abs(Math.cos(Date.now() * 0.0005 + s.phase));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * dpr, 0, 2 * Math.PI);
        ctx.fillStyle = '#00ffe7';
        ctx.shadowColor = '#00ffe7';
        ctx.shadowBlur = 12 * s.r * dpr;
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        // Animate
        s.x += Math.sin(s.phase) * s.speed * dpr;
        s.y += Math.cos(s.phase) * s.speed * 0.5 * dpr;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;
      }
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }
}
