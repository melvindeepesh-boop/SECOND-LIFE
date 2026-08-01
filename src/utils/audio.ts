"use client";

let audioCtx: AudioContext | null = null;
let scanOsc: OscillatorNode | null = null;
let scanLfo: OscillatorNode | null = null;
let scanGain: GainNode | null = null;

/**
 * Initializes and returns a shared AudioContext instance.
 * Resumes it if it was suspended due to autoplay policies.
 */
function getAudioContext(): AudioContext {
  if (typeof window === "undefined") {
    throw new Error("Web Audio API is not available on the server.");
  }
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch((err) => console.log("AudioContext resume failed:", err));
  }
  return audioCtx;
}

/**
 * Checks if audio is muted in localStorage
 */
function isMuted(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("secondlife-muted") === "true";
}

/**
 * Play a subtle futuristic hover tick
 */
export function playHoverSound(muted?: boolean) {
  const isMutedVal = muted !== undefined ? muted : isMuted();
  if (isMutedVal) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    // Brief slide down in pitch for a soft "tick"
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.03);

    // Ultra-quiet volume so it's unobtrusive
    gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Fail silently to avoid interrupting user flows
  }
}

/**
 * Play a crisp futuristic touch/click pop
 */
export function playClickSound(muted?: boolean) {
  const isMutedVal = muted !== undefined ? muted : isMuted();
  if (isMutedVal) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Layer 1: Sine frequency drop for a clean pop
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(800, now);
    osc1.frequency.exponentialRampToValueAtTime(150, now + 0.06);

    gain1.gain.setValueAtTime(0.06, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // Layer 2: A quick mid-range triangle pluck for tactile weight
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(350, now);
    osc2.frequency.exponentialRampToValueAtTime(100, now + 0.04);

    gain2.gain.setValueAtTime(0.03, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.06);

    osc2.start(now);
    osc2.stop(now + 0.04);
  } catch (e) {
    // Fail silently
  }
}

/**
 * Start the futuristic circular scanner loop sound
 */
export function startScanSound(muted?: boolean) {
  const isMutedVal = muted !== undefined ? muted : isMuted();
  if (isMutedVal) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Stop any existing scan sounds just in case
    stopScanSound();

    scanOsc = ctx.createOscillator();
    scanLfo = ctx.createOscillator();
    scanGain = ctx.createGain();

    const filter = ctx.createBiquadFilter();
    const lfoGain = ctx.createGain();

    // Soft digital hum / synth texture
    scanOsc.type = "sine";
    scanOsc.frequency.setValueAtTime(440, now);

    // LFO to wobble the frequency for a scanning / radar effect
    scanLfo.type = "sine";
    scanLfo.frequency.setValueAtTime(6, now); // 6Hz wobble
    lfoGain.gain.setValueAtTime(120, now); // wobble intensity (Hz)

    // Connect LFO to modulate oscillator frequency
    scanLfo.connect(lfoGain);
    lfoGain.connect(scanOsc.frequency);

    // Bandpass filter to make it sound thin, digital, and space-age
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(4, now);

    // Soft entry volume ramp
    scanGain.gain.setValueAtTime(0.001, now);
    scanGain.gain.linearRampToValueAtTime(0.04, now + 0.2);

    // Connections
    scanOsc.connect(filter);
    filter.connect(scanGain);
    scanGain.connect(ctx.destination);

    // Start oscillators
    scanLfo.start(now);
    scanOsc.start(now);
  } catch (e) {
    // Fail silently
  }
}

/**
 * Stop the scanner loop sound
 */
export function stopScanSound() {
  try {
    const ctx = audioCtx;
    if (ctx && scanGain && scanOsc) {
      const now = ctx.currentTime;
      // Smooth fadeout before stopping
      scanGain.gain.cancelScheduledValues(now);
      scanGain.gain.setValueAtTime(scanGain.gain.value, now);
      scanGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      const oscToStop = scanOsc;
      const lfoToStop = scanLfo;

      scanOsc = null;
      scanLfo = null;
      scanGain = null;

      setTimeout(() => {
        try {
          oscToStop.stop();
          lfoToStop?.stop();
        } catch (e) {}
      }, 200);
    }
  } catch (e) {
    // Fail silently
  }
}

/**
 * Play a futuristic C-major arpeggio ascending chime upon scan success
 */
export function playSuccessSound(muted?: boolean) {
  const isMutedVal = muted !== undefined ? muted : isMuted();
  if (isMutedVal) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // C5, E5, G5, C6 notes in Hz
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, index) => {
      const startTime = now + index * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      // Nice ringing envelope
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.04, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch (e) {
    // Fail silently
  }
}

/**
 * Play a cinematic ambient intro chime/drone
 */
export function playIntroSound(muted?: boolean) {
  const isMutedVal = muted !== undefined ? muted : isMuted();
  if (isMutedVal) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Warm deep drone (Low E note)
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = "triangle";
    droneOsc.frequency.setValueAtTime(82.41, now); // E2
    droneGain.gain.setValueAtTime(0, now);
    droneGain.gain.linearRampToValueAtTime(0.05, now + 1.5);
    droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
    droneOsc.connect(droneGain);
    droneGain.connect(ctx.destination);
    droneOsc.start(now);
    droneOsc.stop(now + 4.5);

    // Warm high notes (E5, B5, E6) starting slightly later
    const chimeNotes = [659.25, 987.77, 1318.51];
    chimeNotes.forEach((freq, index) => {
      const startTime = now + 0.4 + index * 0.25;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.03, startTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 2.5);
    });
  } catch (e) {
    // Fail silently
  }
}
