// Короткий сигнал тревоги через Web Audio API (без внешних файлов).
export function playAlarm() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    const beep = (start, freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + 0.4);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + 0.45);
    };

    beep(0, 880);
    beep(0.5, 880);
    beep(1.0, 1046);

    setTimeout(() => ctx.close(), 2000);
  } catch {
    // звук не критичен — игнорируем ошибки
  }
}
