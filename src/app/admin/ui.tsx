"use client";

import { useEffect, useMemo, useState } from "react";

type LinkItem = { title: string; subtitle?: string; url: string; icon?: string };
type Stats = { lvl: number | string; aim: string; speed: string; code: string };
type LinkBioData = {
  nick: string; bio: string; contactEmail: string; discordUrl: string;
  stats: Stats; links: LinkItem[];
};

async function api<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(path, { ...opts, headers: { "Content-Type": "application/json", ...(opts?.headers || {}) } });
  const txt = await res.text();
  let j:any = {};
  try { j = txt ? JSON.parse(txt) : {}; } catch { j = { message: txt }; }
  if (!res.ok) throw new Error(j?.message || "Request failed");
  return j as T;
}

export default function AdminClient({ authed }: { authed: boolean }) {
  const [isAuthed, setIsAuthed] = useState(authed);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [data, setData] = useState<LinkBioData | null>(null);

  useEffect(() => {
    if (!isAuthed) return;
    (async () => {
      setErr(""); setMsg("");
      const d = await api<LinkBioData>("/api/admin/data");
      setData(d);
    })().catch(e => setErr(String(e.message || e)));
  }, [isAuthed]);

  const links = useMemo(() => data?.links || [], [data]);

  async function onLogin(){
    setErr(""); setMsg("");
    try{
      await api("/api/admin/login", { method:"POST", body: JSON.stringify({ password }) });
      setIsAuthed(true); setPassword(""); setMsg("Успешный вход.");
    } catch(e:any){ setErr(e.message || "Неверный пароль."); }
  }

  async function onLogout(){
    setErr(""); setMsg("");
    try{
      await api("/api/admin/logout", { method:"POST", body: JSON.stringify({}) });
      setIsAuthed(false); setData(null); setMsg("Вы вышли.");
    } catch(e:any){ setErr(e.message || "Ошибка выхода."); }
  }

  async function onSave(){
    if(!data) return;
    setErr(""); setMsg("");
    try{
      await api("/api/admin/save", { method:"POST", body: JSON.stringify({ data }) });
      setMsg("Сохранено!");
    } catch(e:any){ setErr(e.message || "Не удалось сохранить."); }
  }

  function addLink(){
    setData(prev => {
      const p = prev || { nick:"PLAYER", bio:"", contactEmail:"", discordUrl:"", stats:{lvl:1,aim:"B",speed:"B",code:"B"}, links:[] };
      return { ...p, links: [...p.links, { title:"LINK", subtitle:"", url:"#", icon:"GO" }] };
    });
  }

  function removeLink(i:number){
    setData(prev => {
      if(!prev) return prev;
      const next = [...prev.links]; next.splice(i,1);
      return { ...prev, links: next };
    });
  }

  return (
    <main className="wrap">
      <div className="topbar">
        <div className="brand"><div className="dot" /><div>admin</div></div>
        <div className="chip">
          <div className="status"><span className="lamp" /> {isAuthed ? "ONLINE" : "LOCKED"}</div>
          {isAuthed ? <button className="btn ghost hover-game" onClick={onLogout}>ВЫЙТИ</button> : null}
        </div>
      </div>

      {err ? <div className="panel"><div className="card" style={{ color:"#ffb0b0", fontWeight:700 }}>{err}</div></div> : null}
      {msg ? <div className="panel"><div className="card" style={{ color:"#b6ffbf", fontWeight:700 }}>{msg}</div></div> : null}

      {!isAuthed ? (
        <div className="panel">
          <div className="card">
            <h1 className="title">ВХОД</h1>
            <p className="subtitle">Пароль у env: <code>ADMIN_PASSWORD_HASH</code></p>
            <div className="ctaRow">
              <input className="input" type="password" placeholder="Пароль" value={password} onChange={e=>setPassword(e.target.value)} />
              <button className="btn hover-game" onClick={onLogin}>ВОЙТИ</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="panel">
          <div className="card">
            <h1 className="title">ПРОФИЛЬ</h1>

            <div className="row2">
              <div>
                <div className="subtitle">Ник</div>
                <input className="input" value={data?.nick || ""} onChange={e=>setData(d=>d?{...d,nick:e.target.value}:d)} />
              </div>
              <div>
                <div className="subtitle">Email</div>
                <input className="input" value={data?.contactEmail || ""} onChange={e=>setData(d=>d?{...d,contactEmail:e.target.value}:d)} />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div className="subtitle">Bio (RU)</div>
              <textarea className="textarea" value={data?.bio || ""} onChange={e=>setData(d=>d?{...d,bio:e.target.value}:d)} />
            </div>

            <div style={{ marginTop: 12 }}>
              <div className="subtitle">Discord URL</div>
              <input className="input" value={data?.discordUrl || ""} onChange={e=>setData(d=>d?{...d,discordUrl:e.target.value}:d)} />
            </div>

            <h2 className="title" style={{ marginTop: 16 }}>СТАТЫ</h2>
            <div className="row2">
              <div><div className="subtitle">Уровень</div><input className="input" value={String(data?.stats?.lvl ?? "")} onChange={e=>setData(d=>d?{...d,stats:{...d.stats,lvl:e.target.value}}:d)} /></div>
              <div><div className="subtitle">AIM</div><input className="input" value={data?.stats?.aim ?? ""} onChange={e=>setData(d=>d?{...d,stats:{...d.stats,aim:e.target.value}}:d)} /></div>
              <div><div className="subtitle">Скорость</div><input className="input" value={data?.stats?.speed ?? ""} onChange={e=>setData(d=>d?{...d,stats:{...d.stats,speed:e.target.value}}:d)} /></div>
              <div><div className="subtitle">Код</div><input className="input" value={data?.stats?.code ?? ""} onChange={e=>setData(d=>d?{...d,stats:{...d.stats,code:e.target.value}}:d)} /></div>
            </div>

            <h2 className="title" style={{ marginTop: 16 }}>ССЫЛКИ</h2>
            <div className="ctaRow">
              <button className="btn secondary hover-game" onClick={addLink}>ДОБАВИТЬ</button>
              <button className="btn hover-game" onClick={onSave} disabled={!data}>СОХРАНИТЬ</button>
              <a className="btn ghost hover-game" href="/" target="_blank" rel="noreferrer">ОТКРЫТЬ САЙТ</a>
            </div>

            <div style={{ marginTop: 12 }}>
              {links.map((l,i)=>(
                <div className="panel" key={i} style={{ margin:"10px 0" }}>
                  <div className="card">
                    <div className="row2">
                      <div>
                        <div className="subtitle">Title</div>
                        <input className="input" value={l.title} onChange={e=>setData(d=>{
                          if(!d) return d; const next=[...d.links]; next[i]={...next[i],title:e.target.value}; return {...d,links:next};
                        })} />
                      </div>
                      <div>
                        <div className="subtitle">Subtitle</div>
                        <input className="input" value={l.subtitle || ""} onChange={e=>setData(d=>{
                          if(!d) return d; const next=[...d.links]; next[i]={...next[i],subtitle:e.target.value}; return {...d,links:next};
                        })} />
                      </div>
                    </div>

                    <div className="row2" style={{ marginTop: 10 }}>
                      <div>
                        <div className="subtitle">URL</div>
                        <input className="input" value={l.url} onChange={e=>setData(d=>{
                          if(!d) return d; const next=[...d.links]; next[i]={...next[i],url:e.target.value}; return {...d,links:next};
                        })} />
                      </div>
                      <div>
                        <div className="subtitle">Icon</div>
                        <input className="input" value={l.icon || ""} onChange={e=>setData(d=>{
                          if(!d) return d; const next=[...d.links]; next[i]={...next[i],icon:e.target.value}; return {...d,links:next};
                        })} />
                      </div>
                    </div>

                    <div className="ctaRow" style={{ marginTop: 12 }}>
                      <button className="btn ghost hover-game" onClick={()=>removeLink(i)}>УДАЛИТЬ</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="footer">
              <div className="small">Це працює на Vercel: зберігання JSON у KV.</div>
              <div className="small">Пароль — тільки через env (не в коді).</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
