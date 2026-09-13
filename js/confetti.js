/**
 * Romantic Confetti & Floating Hearts Engine
 * Pure Canvas, 60fps, no external dependencies
 */

class ConfettiEngine {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '99999';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();

    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.pixelRatio;
    this.canvas.height = this.height * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  // Draw Heart Shape
  drawHeart(ctx, x, y, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
    // top right curve
    ctx.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw Star Shape
  drawStar(ctx, x, y, points, outer, inner, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = (i % 2 === 0) ? outer : inner;
      const a = (i * Math.PI) / points;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw Ribbon / Rectangle
  drawRibbon(ctx, x, y, w, h, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = color;
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  }

  // Celebration Fireworks / Confetti Explosion
  burst(origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 }, count = 75) {
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166', '#a855f7', '#60a5fa', '#ffffff'];
    const types = ['heart', 'star', 'ribbon'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      const type = types[Math.floor(Math.random() * types.length)];

      this.particles.push({
        type: type,
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 10 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        gravity: 0.25,
        drag: 0.96,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.1 + 0.05
      });
    }
  }

  // Floating Hearts Upward (e.g., when clicking "Thả Tim" or liking)
  floatingHearts(origin = { x: window.innerWidth / 2, y: window.innerHeight - 80 }, count = 12) {
    const colors = ['#ff2a6d', '#ff5e7e', '#ff758f', '#ff8fa3', '#f72585'];

    for (let i = 0; i < count; i++) {
      const spreadX = (Math.random() - 0.5) * 60;
      this.particles.push({
        type: 'heart',
        x: origin.x + spreadX,
        y: origin.y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -(Math.random() * 4 + 3.5),
        size: Math.random() * 14 + 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
        rotation: (Math.random() - 0.5) * 0.5,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        gravity: -0.05, // Floats upward
        drag: 0.99,
        wobble: Math.random() * 20,
        wobbleSpeed: Math.random() * 0.08 + 0.03
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.vx *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx + Math.sin(p.wobble) * 0.8;
      p.y += p.vy;
      p.wobble += p.wobbleSpeed;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > this.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      if (p.type === 'heart') {
        this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      } else if (p.type === 'star') {
        this.drawStar(this.ctx, p.x, p.y, 5, p.size, p.size * 0.5, p.color, p.alpha, p.rotation);
      } else {
        this.drawRibbon(this.ctx, p.x, p.y, p.size, p.size * 0.4, p.color, p.alpha, p.rotation);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Global instance attached to window for easy calling anywhere
window.Confetti = null;
document.addEventListener('DOMContentLoaded', () => {
  window.Confetti = new ConfettiEngine();
});
