/**
 * Romantic Audio Engine - Auto Playlist
 * Track 1: Happy Birthday Piano (hpbd_piano_lesfm.mp3)
 * Track 2: Bâng Khuâng Piano Không Lời (bang_khuang_piano.mp3) -> Loops continuously
 * + Web Audio Synthesizer Fallback
 */

class RomanticAudioManager {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.audioElement = null;
    this.synthTimeout = null;
    this.synthIndex = 0;
    this.useSynth = false;

    // Danh sách bài hát phát tuần tự:
    // Bài 1: Happy Birthday Piano -> khi hết chuyển sang Bài 2: Bâng Khuâng Piano (lặp vô tận)
    this.playlist = [
      {
        src: 'assets/audio/hpbd_piano_lesfm.mp3',
        title: 'Happy Birthday 🎵',
        loop: false
      },
      {
        src: 'assets/audio/bang_khuang_piano.mp3',
        title: 'Bâng Khuâng 🎵',
        loop: true
      }
    ];
    this.currentTrackIndex = 0;

    // Web Audio Fallback: Nhạc Happy Birthday
    this.beatLengthMs = 420;
    this.score = [
      { melody: 392.00, beats: 0.75, bass: 261.63 },
      { melody: 392.00, beats: 0.25 },
      { melody: 440.00, beats: 1.0 },
      { melody: 392.00, beats: 1.0, bass: 329.63 },
      { melody: 523.25, beats: 1.0, bass: 261.63 },
      { melody: 493.88, beats: 2.0, bass: 196.00 },
      { melody: null, beats: 0.4 },

      { melody: 392.00, beats: 0.75, bass: 196.00 },
      { melody: 392.00, beats: 0.25 },
      { melody: 440.00, beats: 1.0 },
      { melody: 392.00, beats: 1.0, bass: 246.94 },
      { melody: 587.33, beats: 1.0, bass: 293.66 },
      { melody: 523.25, beats: 2.0, bass: 261.63 },
      { melody: null, beats: 0.4 },

      { melody: 392.00, beats: 0.75, bass: 261.63 },
      { melody: 392.00, beats: 0.25 },
      { melody: 783.99, beats: 1.0, bass: 329.63 },
      { melody: 659.25, beats: 1.0, bass: 261.63 },
      { melody: 523.25, beats: 1.0, bass: 220.00 },
      { melody: 493.88, beats: 1.0, bass: 174.61 },
      { melody: 440.00, beats: 1.8, bass: 220.00 },
      { melody: null, beats: 0.4 },

      { melody: 698.46, beats: 0.75, bass: 174.61 },
      { melody: 698.46, beats: 0.25 },
      { melody: 659.25, beats: 1.0, bass: 261.63 },
      { melody: 523.25, beats: 1.0, bass: 329.63 },
      { melody: 587.33, beats: 1.0, bass: 196.00 },
      { melody: 523.25, beats: 2.6, bass: 261.63 },
      { melody: null, beats: 1.2 }
    ];

    this.initElements();
  }

  initElements() {
    this.vinylDisk = document.getElementById('music-disk');
    this.playIcon = document.getElementById('music-play-icon');
    this.waveAnim = document.getElementById('music-waves');
    this.musicButton = document.getElementById('music-toggle-btn');
    this.musicLabel = document.getElementById('music-label');

    if (this.musicButton) {
      this.musicButton.addEventListener('click', () => this.togglePlay());
      this.musicButton.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        this.nextTrack();
      });
    }

    // Khởi tạo Audio Element với bài đầu tiên trong playlist
    try {
      this.audioElement = new Audio();
      this.loadTrack(0);

      // Khi bài 1 kết thúc -> tự động chuyển sang bài tiếp theo (Bâng Khuâng không lời)
      this.audioElement.addEventListener('ended', () => {
        this.onTrackEnded();
      });

      this.audioElement.addEventListener('error', () => {
        console.info('Audio error, switching to Web Audio synth fallback');
        this.useSynth = true;
      });
    } catch (e) {
      this.useSynth = true;
    }
  }

  loadTrack(index) {
    if (!this.playlist[index] || !this.audioElement) return;

    this.currentTrackIndex = index;
    const track = this.playlist[index];
    this.audioElement.src = track.src;
    this.audioElement.loop = track.loop;
    this.audioElement.volume = 0.7;
    this.audioElement.preload = 'auto';

    if (this.musicLabel) {
      this.musicLabel.textContent = track.title;
    }
  }

  onTrackEnded() {
    // Chuyển sang bài tiếp theo trong danh sách
    const nextIndex = this.currentTrackIndex + 1;
    if (nextIndex < this.playlist.length) {
      this.loadTrack(nextIndex);
      if (this.isPlaying) {
        this.audioElement.play().catch(e => console.warn('Autoplay next track error:', e));
      }
    } else {
      // Nếu bài cuối có loop = true thì đã tự lặp, nếu không thì quay về đầu
      if (!this.playlist[this.currentTrackIndex].loop) {
        this.loadTrack(0);
        if (this.isPlaying) this.audioElement.play();
      }
    }
  }

  initAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Soft piano note synthesizer fallback
  playPianoNote(freq, duration = 2.0, volume = 0.12) {
    if (!this.audioContext || !freq) return;
    const now = this.audioContext.currentTime;

    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(260, now + duration);

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  playSynthStep() {
    if (!this.isPlaying) return;

    const item = this.score[this.synthIndex];
    if (item) {
      if (item.melody) {
        this.playPianoNote(item.melody, item.beats * 0.45 + 1.2, 0.13);
      }
      if (item.bass) {
        this.playPianoNote(item.bass, 2.5, 0.08);
      }

      const stepDuration = item.beats * this.beatLengthMs;
      this.synthIndex = (this.synthIndex + 1) % this.score.length;
      this.synthTimeout = setTimeout(() => {
        this.playSynthStep();
      }, stepDuration);
    }
  }

  startSynthSequence() {
    this.stopSynthSequence();
    this.synthIndex = 0;
    this.playSynthStep();
  }

  stopSynthSequence() {
    if (this.synthTimeout) {
      clearTimeout(this.synthTimeout);
      this.synthTimeout = null;
    }
  }

  play() {
    this.initAudioContext();
    this.isPlaying = true;

    if (this.audioElement && !this.useSynth) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.stopSynthSequence();
          })
          .catch((err) => {
            console.warn('Audio play fallback to synth:', err);
            this.useSynth = true;
            this.startSynthSequence();
          });
      }
    } else {
      this.startSynthSequence();
    }

    this.updateUI(true);
  }

  pause() {
    this.isPlaying = false;
    this.stopSynthSequence();
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.updateUI(false);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Chuyển nhanh sang bài Bâng Khuâng hoặc quay lại bài đầu
  nextTrack() {
    const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.loadTrack(nextIndex);
    if (this.isPlaying) {
      this.audioElement.play();
    }
  }

  updateUI(playing) {
    if (this.vinylDisk) {
      if (playing) {
        this.vinylDisk.classList.add('playing');
      } else {
        this.vinylDisk.classList.remove('playing');
      }
    }

    if (this.waveAnim) {
      this.waveAnim.style.opacity = playing ? '1' : '0.3';
    }

    if (this.musicLabel && this.playlist[this.currentTrackIndex]) {
      this.musicLabel.textContent = this.playlist[this.currentTrackIndex].title;
    }
  }
}

window.RomanticAudio = null;
document.addEventListener('DOMContentLoaded', () => {
  window.RomanticAudio = new RomanticAudioManager();
});
