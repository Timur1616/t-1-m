import { siteData } from "../data/siteData";

function Arrow() {
  return <span className="arrow">→</span>;
}

export default function Page() {
  const d = siteData;

  return (
    <>
      <div className="topbar">
        <div className="brand">
          <span className="dot" />
          {d.brand}
        </div>

        <div className="chip">
          <div className="status">
            <span className="lamp" />
            {d.statusLabel}
          </div>
          <div>
            <b>{d.nick}</b>
          </div>
        </div>
      </div>

      <div className="hero">
        <section className="panel">
          <div className="card">
            <div className="profile">
              <div className="avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.avatar} alt="avatar" />
                <div className="badge">{d.badge}</div>
              </div>

              <div>
                <h1 className="nick">{d.nick}</h1>
                <p className="bio">{d.bio}</p>

                <div className="ctaRow">
                  {d.buttons.map((b) => (
                    <a
                      key={b.label}
                      className={"btn hover-game " + (b.variant ? b.variant : "")}
                      href={b.href}
                      target="_blank"
                      rel="noreferrer"
                      data-click
                    >
                      {b.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="panel">
          <div className="card">
            <h2 className="title">{d.windowTitle}</h2>
            <p className="subtitle">{d.windowText}</p>
          </div>

          <div className="pillRow">
            {d.pills.map((p) => (
              <div key={p.label} className="pill">
                {p.label}: <b>{p.value}</b>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="panel">
        <div className="links">
          {d.links.map((l) => (
            <a
              key={l.title}
              className="linkItem hover-game"
              href={l.url}
              target="_blank"
              rel="noreferrer"
              data-click
            >
              <div className="linkLeft">
                <div className="ico">★</div>
                <div className="label">
                  <b>{l.title}</b>
                  <span>{l.subtitle}</span>
                </div>
              </div>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <div className="footer">
        <div className="small">{d.footerLeft}</div>
        <div className="small">{d.footerRight}</div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(){
            const click = new Audio('/click.wav');
            click.volume = 0.18;
            document.addEventListener('pointerdown', (e) => {
              const t = e.target.closest('[data-click]');
              if(!t) return;
              try { click.currentTime = 0; click.play(); } catch(_) {}
            });
          })();
        `,
        }}
      />
    </>
  );
}
