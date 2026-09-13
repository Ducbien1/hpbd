/**
 * Romantic Wedding-Style Falling Rose Petals & Golden Sparkles
 * High performance Canvas, 60fps, responsive
 */

class RomanticPetalsBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.sparkles = [];
    this.numPetals = 28;
    this.numSparkles = 25;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.isRunning = true;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    document.addEventListener('visibilitychange', () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) this.animate();
    });

    this.createElements();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.pixelRatio;
    this.canvas.height = this.height * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  createElements() {
    this.petals = [];
    this.sparkles = [];

    // Realistic rose petals
    const petalColors = [
      { start: 'rgba(255, 175, 189, 0.85)', end: 'rgba(255, 117, 143, 0.75)' },
      { start: 'rgba(255, 195, 205, 0.85)', end: 'rgba(255, 140, 160, 0.7)' },
      { start: 'rgba(255, 225, 230, 0.9)', end: 'rgba(247, 160, 180, 0.75)' },
      { start: 'rgba(248, 215, 218, 0.85)', end: 'rgba(224, 130, 145, 0.7)' }
    ];

    for (let i = 0; i < this.numPetals; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 12 + 10,
        vx: Math.random() * 1.2 + 0.4,
        vy: Math.random() * 1.4 + 0.8,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayRange: Math.random() * 1.5 + 1.0,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.015,
        color: petalColors[Math.floor(Math.random() * petalColors.length)]
      });
    }

    // Soft golden sparkles
    for (let i = 0; i < this.numSparkles; i++) {
      this.sparkles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        color: ['#d4af37', '#f7d794', '#fff', '#ffd1dc'][Math.floor(Math.random() * 4)]
      });
    }
  }

  // Draw 3D curved rose petal
  drawPetal(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    // 3D flipping scaling
    const flipScale = Math.cos(p.flip);
    ctx.scale(1, flipScale);

    // Petal gradient
    const grad = ctx.createLinearGradient(-p.size / 2, -p.size, p.size / 2, p.size);
    grad.addColorStop(0, p.color.start);
    grad.addColorStop(1, p.color.end);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.9, p.size * 0.4, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.4, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
    ctx.closePath();
    ctx.fill();

    // Subtle center vein
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(0, -p.size * 0.7);
    ctx.lineTo(0, p.size * 0.7);
    ctx.stroke();

    ctx.restore();
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Golden Sparkles
    for (let s of this.sparkles) {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha > 0.85) {
        s.alpha = 0.85;
        s.twinkleDir = -1;
      } else if (s.alpha < 0.1) {
        s.alpha = 0.1;
        s.twinkleDir = 1;
      }

      this.ctx.save();
      this.ctx.globalAlpha = s.alpha;
      this.ctx.fillStyle = s.color;
      this.ctx.shadowColor = s.color;
      this.ctx.shadowBlur = 4;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Draw Falling Petals
    for (let p of this.petals) {
      p.swayOffset += p.swaySpeed;
      p.x += p.vx + Math.sin(p.swayOffset) * p.swayRange;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      // Wrap around
      if (p.y > this.height + 30) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }
      if (p.x > this.width + 30) {
        p.x = -20;
      }

      this.drawPetal(p);
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RomanticPetalsBackground('bg-canvas');
});
