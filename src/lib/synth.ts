// Tiny WebAudio helpers for the interactive mockups.
// The AudioContext is created lazily and only ever inside a user-gesture
// handler (gate screen click / toggle), so autoplay policy is respected.

let ctx: AudioContext | null = null;

export function audioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Short percussive pluck — used when the sequencer playhead crosses a clip. */
export function pluck(freq: number, dur = 0.4, type: OscillatorType = "triangle", vol = 0.09) {
  const ac = audioCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t = ac.currentTime;
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** UI blip for arcade menus. */
export function blip(freq = 880, dur = 0.06, vol = 0.05) {
  pluck(freq, dur, "square", vol);
}

/** Denied/error buzz for locked content. */
export function deny() {
  pluck(140, 0.18, "sawtooth", 0.05);
  setTimeout(() => pluck(110, 0.22, "sawtooth", 0.05), 90);
}
