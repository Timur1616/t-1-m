import Link from "next/link";
import { getData } from "../lib/storage";

export default async function HomePage() {
  const data = await getData();

  return (
    <main className="wrap" id="top">
      <div className="topbar">
        <div className="brand"><div className="dot" /><div>link hub</div></div>
        <div className="chip">
          <div className="status"><span className="lamp" /> ONLINE</div>
          <div>Ник: <b>{data.nick || "PLAYER"}</b></div>
        </div>
      </div>

      <section className="hero">
        <div className="panel">
          <div className="card">
            <div className="profile">
              <div className="avatar">
                <img src="/avatar.png" alt="Avatar" />
                <div className="badge">KIRKA STYLE</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                <p className="nick">{data.nick || "PLAYER"}</p>
                <p className="bio">{data.bio || ""}</p>

                <div className="ctaRow">
                  <a className="btn hover-game sfx" href="#links">ОТКРЫТЬ ССЫЛКИ</a>
                  <a className="btn secondary hover-game sfx" href={data.contactEmail ? `mailto:${data.contactEmail}` : "#"}>НАПИСАТЬ</a>
                  <a className="btn ghost hover-game sfx" href={data.discordUrl || "#"} target="_blank" rel="noreferrer">DISCORD</a>
                </div>

                <div className="ctaRow">
                  <Link className="btn ghost hover-game sfx" href="/admin">ADMIN</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="card">
            <h2 className="title">ПРОГРЕСС</h2>
            <p className="subtitle">Мини-статы в стиле игры.</p>

            <div className="pillRow">
              <div className="pill">УРОВЕНЬ: <b>{String(data.stats?.lvl ?? 1)}</b></div>
              <div className="pill">AIM: <b>{data.stats?.aim ?? "B"}</b></div>
              <div className="pill">СКОРОСТЬ: <b>{data.stats?.speed ?? "B"}</b></div>
              <div className="pill">КОД: <b>{data.stats?.code ?? "B"}</b></div>
            </div>

            <div className="ctaRow" style={{ marginTop: 6 }}>
              <a className="btn ghost hover-game sfx" href="#links">GO!</a>
            </div>
          </div>
        </div>
      </section>

      <section className="panel" id="links">
        <div className="links">
          {(data.links || []).map((l, idx) => (
            <a className="linkItem hover-game sfx" key={idx} href={l.url || "#"} target="_blank" rel="noreferrer">
              <div className="linkLeft">
                <div className="ico" aria-hidden="true">{l.icon || "GO"}</div>
                <div className="label">
                  <b>{l.title || "LINK"}</b>
                  <span>{l.subtitle || ""}</span>
                </div>
              </div>
              <div className="arrow">▶</div>
            </a>
          ))}
        </div>
      </section>

      <div className="footer">
        <div className="small">© {new Date().getFullYear()} • Сделано в стиле Kirka</div>
        <div className="small">Звук клика: <span id="soundState">вкл</span></div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
(() => {
  let audioCtx=null, soundEnabled=true;
  const stateEl=document.getElementById('soundState');

  function ensureAudio(){
    if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    if(audioCtx.state==='suspended') audioCtx.resume();
  }

  function clickBeep(){
    if(!soundEnabled) return;
    ensureAudio();
    const t=audioCtx.currentTime;
    const osc=audioCtx.createOscillator();
    const gain=audioCtx.createGain();
    const filter=audioCtx.createBiquadFilter();
    osc.type='square';
    osc.frequency.setValueAtTime(880,t);
    osc.frequency.exponentialRampToValueAtTime(520,t+0.03);
    filter.type='lowpass';
    filter.frequency.setValueAtTime(2200,t);
    gain.gain.setValueAtTime(0.0001,t);
    gain.gain.exponentialRampToValueAtTime(0.035,t+0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001,t+0.05);
    osc.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
    osc.start(t); osc.stop(t+0.06);
  }

  document.addEventListener('pointerdown',(e)=>{
    const el=e.target.closest('.sfx'); if(!el) return;
    clickBeep();
  },{passive:true});

  if(stateEl){
    stateEl.addEventListener('dblclick',()=>{
      soundEnabled=!soundEnabled;
      stateEl.textContent=soundEnabled?'вкл':'выкл';
      if(soundEnabled) clickBeep();
    });
  }
})();
      `}} />
    </main>
  );
}
