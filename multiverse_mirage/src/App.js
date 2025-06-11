import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
// Main Container for Multiverse Mirage - immersive, galaxy-themed multi-feature UI
// This app shows a landing page with 'What If' scenario input, then animates to a split simulation view:
// left = AI narrative + MirrorChat, right = dreamlike visuals & metrics dashboard.
// All feature "backends" here are placeholders.

const PALETTE = {
  primary: '#1a1333',
  secondary: '#2d1e4f',
  accent: '#00ffe7',
  background: 'radial-gradient(ellipse at 60% 25%, #2d1e4f 0%, #1a1333 100%)',
};

const FONTS = {
  heading: "'Space Grotesk', 'Inter', sans-serif",
  body: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
};

// --- Animations/Starfield (minimal JS version, no Framer dependency) ---
function Starfield({ numStars = 150 }) {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const stars = Array.from({length: numStars}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      speed: Math.random() * 0.025 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const alpha = 0.4 + 0.6 * Math.abs(Math.cos(Date.now() * 0.0005 + s.phase));
        ctx.beginPath();
        ctx.globalAlpha = alpha;
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = PALETTE.accent;
        ctx.shadowColor = PALETTE.accent;
        ctx.shadowBlur = 10 * s.r;
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;

        s.x += Math.sin(s.phase) * s.speed;
        s.y += Math.cos(s.phase) * s.speed * 0.5;
        // Wrap
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;
      });
      animId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animId);
    // eslint-disable-next-line
  }, []);

  return (
    <canvas
      ref={ref}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: 'fixed', left: 0, top: 0, width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

// ---- Immersive Audio (ambient music & binaural simulation) ----
function ImmersiveAudioToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  function toggle() {
    if (!playing) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(!playing);
  }
  // Placeholder: ambient loop -- in real app, src would be user-supplied or dynamic
  return (
    <>
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/07/26/audio_125bfa54d2.mp3" preload="auto" />
      <button
        style={{
          background: 'none', border: 'none', color: PALETTE.accent,
          fontSize: '1.35rem', marginLeft: '4px', cursor: 'pointer'
        }}
        title={playing ? 'Pause immersive audio' : 'Play immersive audio'}
        onClick={toggle}
        aria-label="Toggle immersive audio"
      >
        {playing ? <>&#x1F50A;</> : <>&#x1F507;</>}
      </button>
    </>
  );
}

// --- What If Scenario Input (landing main UI) ---
function WhatIfLanding({onSubmit}) {
  const [scenario, setScenario] = useState('');
  const [profile, setProfile] = useState({
    mbti: '', big5: ''
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (scenario.length > 3) onSubmit(scenario, profile);
  }
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div
        className="galaxy-card"
        style={{
          background: 'rgba(33,23,73,0.95)',
          borderRadius: 18,
          padding: '42px 32px',
          boxShadow: `0 0 24px ${PALETTE.accent}55, 0 1.5px 8px #0007`,
          maxWidth: 435,
          width: '100%',
          textAlign: 'center',
          border: `1.5px solid ${PALETTE.accent}31`,
        }}
      >
        <div style={{fontFamily: FONTS.heading, fontSize: '1.18rem', color: PALETTE.accent, letterSpacing: '0.04em', marginBottom: 2}}>Enter the Multiverse</div>
        <h1 style={{fontFamily: FONTS.heading, fontSize: '2.5rem', fontWeight: 700, margin: '8px 0 18px 0', color: '#fff', letterSpacing: '0.03em', textShadow: `0 1.5px 3px ${PALETTE.secondary}`}}>
          What if...
        </h1>
        <div style={{fontFamily: FONTS.body, color: '#D3D1EE' , marginBottom: 20, lineHeight: 1.5 }}>
          Enter a scenario that changes your path. <br /> e.g. &quot;What if I became an astronaut in Vienna in 2040?&quot;
        </div>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            required
            value={scenario}
            onChange={e => setScenario(e.target.value)}
            placeholder="Describe your alternate life..."
            style={{
              width: '100%',
              padding: '12px 15px',
              borderRadius: 7,
              fontSize: '1.1rem',
              border: `1.2px solid ${PALETTE.accent}70`,
              outline: 'none',
              background: '#212040',
              color: '#fff',
              fontFamily: FONTS.body,
              marginBottom: 16
            }}
          />
          {/* Psychological profile input */}
          <div style={{display: 'flex', gap: 10, marginBottom: 20}}>
            <input
              value={profile.mbti}
              onChange={e => setProfile(p => ({...p, mbti: e.target.value.toUpperCase().slice(0,4)}))}
              placeholder="MBTI (e.g. INFP)"
              style={{
                flex: 1,
                padding: '9px 10px',
                borderRadius: 6,
                border: `1px solid ${PALETTE.accent}50`,
                background: '#24214a',
                color: '#fff',
                fontFamily: FONTS.body,
                fontSize: '1rem',
              }}
              maxLength={4}
            />
            <input
              value={profile.big5}
              onChange={e => setProfile(p => ({...p, big5: e.target.value}))}
              placeholder="Big Five (OCEAN)"
              style={{
                flex: 1, padding: '9px 10px',
                borderRadius: 6, border: `1px solid ${PALETTE.accent}44`,
                background: '#24214a', color: '#fff',
                fontFamily: FONTS.body,
                fontSize: '1rem'
              }}
              maxLength={5}
            />
          </div>
          <button
            className="btn btn-large"
            type="submit"
            style={{
              marginTop: 0,
              background: PALETTE.accent,
              color: '#242040',
              fontWeight: 600,
              fontSize: '1.14rem',
              borderRadius: 6,
              boxShadow: `0 2px 12px ${PALETTE.accent}29`,
              border: 'none',
              letterSpacing: '0.018em'
            }}
          >
            Begin Simulation
          </button>
        </form>
        <div style={{fontSize: '0.98rem', marginTop: 26, color: '#aaa', fontFamily: FONTS.body, opacity: 0.82}}>
          <span style={{verticalAlign: -1, marginRight: 2}}>✨</span> Multiverse Mirage by KAVIA
        </div>
      </div>
    </div>
  );
}

// --- Simulation Split View (narrative, visuals, metrics) ---
function SimulationView({ scenario, profile, onBack }) {
  const [loading, setLoading] = useState(true);
  const [narrative, setNarrative] = useState('');
  const [visuals, setVisuals] = useState(['']);
  const [metrics, setMetrics] = useState(
    {emotional: 65, career: 72, finances: 55, relationships: 80}
  );
  const [chat, setChat] = useState([{from:'system', msg:'Ask any character about your new life...'}]);
  const [input, setInput] = useState('');
  const [memoryPoem, setMemoryPoem] = useState('');
  const [reroll, setReroll] = useState(false);
  const metricsOptions = [
    {label: 'Emotion', key: 'emotional', color: '#ff72e0'},
    {label: 'Career', key: 'career', color: '#46faff'},
    {label: 'Finances', key: 'finances', color: '#f7ee6d'},
    {label: 'Relationships', key: 'relationships', color: '#ff967e'}
  ];

  // Placeholder: Fake AI calls, delay for effect
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // "Integrate" GPT-4o result:
      setNarrative(
        `Year 2040: Guided by curiosity from your MBTI profile (${profile.mbti||'Unknown'}), you chose the astronaut path. In Vienna, a shimmering spaceport beckons new destinies. Over years, you encounter triumph, heartbreak, and cosmic wonder... \n\nMajor events:\n- First child born in low gravity (2043)\n- Discovered microbial life on Europa (2047)\n- Lost a dear friend to solar storm (2052)\n- Founded 'Mirage Society', uniting explorers (2055)\n\nYour story unfolds across stars, awash in beauty, danger, and hope.`
      );
      setVisuals([
        'https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=550&q=80'
      ]);
      setMetrics(
        {emotional: 77, career: 89, finances: 68, relationships: 72}
      );
      setMemoryPoem("In the shadow of endless stars,\nYou loved, you lost, you grew anew.\nVienna’s echo across the void—\nDreams reborn in midnight blue.");
      setLoading(false);
    }, 1600);
    // eslint-disable-next-line
  }, [reroll]);

  // MirrorChat reply (placeholder AI chat)
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setChat(ch => ([...ch, {from:'user', msg: input}]));
    setInput('');
    setTimeout(()=>{
      setChat(ch => ([...ch, {
        from:'ai', msg: `In this universe, ${scenario.replace(/^What if /i,'').replace(/\?$/, '')}, I found myself transformed each day by your courage. [AI reply 🚀]`
      }]));
    }, 950);
  };

  // Metrics dashboard - radial bar chart
  const RadialMetrics = () => (
    <div style={{
      display:'flex', flexDirection:'row', flexWrap:'wrap', gap: 22,
      justifyContent:'center', alignItems:'center', marginBottom: 23
    }}>
      {metricsOptions.map((m, i) => (
        <div key={m.key} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <svg width="78" height="78">
            <circle cx="39" cy="39" r="32" fill="none" stroke="#332a5a" strokeWidth="10"/>
            <circle
              cx="39" cy="39" r="32"
              fill="none"
              stroke={m.color}
              strokeWidth="9"
              strokeDasharray={201}
              strokeDashoffset={201 * (1 - metrics[m.key]/100)}
              style={{transition:'stroke-dashoffset 1.2s cubic-bezier(.69,0,.32,1.04)'}}
              />
            <text x="39" y="45.5" textAnchor="middle" fontFamily={FONTS.body} fontSize="1.29rem" fill="#fff" fontWeight="bold">
              {metrics[m.key]}
            </text>
          </svg>
          <span style={{
              color: m.color,
              marginTop: 2,
              fontSize:'0.85rem',
              fontFamily: FONTS.heading,
              textShadow: `0 0 3px #222d`
            }}>{m.label}</span>
        </div>
      ))}
    </div>
  );

  // Reroll/rewind
  const handleReroll = () => {
    setReroll(!reroll);
  };

  return (
    <div style={{
      width: '100vw', height: '100vh',
      minHeight: '100svh',
      background: PALETTE.background,
      display: 'flex', flexDirection: 'row',
      justifyContent: 'stretch', alignItems: 'stretch',
      position: 'relative', zIndex: 2, overflow: 'hidden',
      transition: 'background 0.7s cubic-bezier(.59,0,.69,.94)'
    }}>
      {/* Left: Narrative + MirrorChat */}
      <div style={{
        flex: '1 1 0',
        minWidth: 0,
        background: 'rgba(26,18,49,0.87)',
        borderRight: `1.5px solid ${PALETTE.accent}20`,
        padding: '56px 32px 24px 44px',
        display: 'flex', flexDirection:'column',
        justifyContent:'flex-start',
        position: 'relative',
        transition: 'background .8s cubic-bezier(.49,0,.25,1)',
        boxShadow: '1.5px 3px 12px #1a133341',
      }}>
        <button
          style={{
            position:'absolute', top: 27, left: 14, fontSize: '1.12rem',
            background: 'rgba(0,0,0,0.18)', color: '#fff',
            border: `1.2px solid ${PALETTE.accent}60`,
            borderRadius: 7, padding: '5px 13px', fontFamily: FONTS.body,
            zIndex:2, cursor:'pointer', opacity:.82, letterSpacing:'.03em'
          }}
          onClick={onBack}
          aria-label="Back to scenario prompt"
        >⟵ Back</button>
        <div style={{marginBottom:20, fontFamily:FONTS.heading, fontWeight:600, fontSize:'1.3rem',color:PALETTE.accent, letterSpacing: '.029em'}}>Alternate Timeline:</div>
        <div style={{
          background: 'rgba(30,31,60,0.94)',
          padding: '20px 15px 16px 20px', borderRadius: 9, boxShadow: `0 3px 21px #16119a27, 0 1px 8px #0004`,
          fontFamily: FONTS.body,
          fontSize: '1.09rem', color: '#e9f8fa',
          marginBottom: '20px', minHeight: 160,
          whiteSpace:'pre-line'
        }}>
          {loading ? <em style={{color: '#8fe7ff'}}>Narrative loading...</em> : narrative}
        </div>

        {/* MirrorChat */}
        <div style={{margin: '0 0 7px 3px', fontFamily: FONTS.heading, color: PALETTE.accent, fontSize: '1.08rem'}}>MirrorChat</div>
        <div style={{
          background: '#23213fbb', borderRadius: 9, padding: '9px 6px 9px 13px',
          minHeight: 108, maxHeight: 144, overflowY: 'auto', fontFamily: FONTS.body, fontSize: '1.06rem',
          marginBottom: 6, boxShadow: '0 2px 7px #0003',
        }}>
          {chat.map((msg, i) =>
            <div key={i}
              style={{
                margin: '4px 0', color: msg.from === 'ai' ? PALETTE.accent : msg.from === 'user' ? '#fff' : '#efeffd',
                textAlign: msg.from === 'user' ? 'right' : 'left'
              }}>
              <span style={{fontWeight: msg.from === 'ai' ? 600 : 400, fontFamily: msg.from === 'ai'?FONTS.heading:FONTS.body}}>{msg.msg}</span>
            </div>
          )}
        </div>
        <form style={{display:'flex', flexDirection:'row'}}
              onSubmit={handleSend}
              autoComplete="off"
        >
          <input aria-label="Chat with AI"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Speak to someone in this world"
            style={{
              flex: 1,
              borderRadius: 7, border: '1px solid #009fc8aa', 
              fontFamily: FONTS.body, fontSize: '1rem',
              background: '#190e25',
              color: '#fff', padding: '8px 13px'
             }}
          />
          <button type="submit" style={{
            marginLeft:9, borderRadius:7, background: PALETTE.accent,
            border:'none', color: '#222', fontWeight:600, fontFamily: FONTS.heading, fontSize:'1.08rem',
            padding: '8px 17px', boxShadow: '0 1px 6px #009fc852'
          }}>Send</button>
        </form>
        <div style={{marginTop:'auto', marginBottom: 4, fontSize: '0.97rem', color:'#a5ffda9b', textAlign:'right'}}>
          {memoryPoem && <span style={{fontFamily: FONTS.heading}} title="AI Memory Poem">Memory Poem: <span style={{color:'#ffcef7'}}>{memoryPoem.split("\n")[0]}</span>...</span>}
        </div>
        {/* Reroll */}
        <button
          onClick={handleReroll}
          style={{
            background: 'rgba(0,0,0,0.13)',
            border: `1.2px solid ${PALETTE.accent}77`,
            color:'#d5fff6',
            fontWeight: 500, fontSize: '1.03rem',
            borderRadius: 8, padding: '7.5px 16px',
            marginTop: 7, cursor:'pointer',
            fontFamily: FONTS.heading,
            letterSpacing: '.029em',
            boxShadow: '0 1.5px 4px #00ffe760'
          }}
        >Rewind &amp; Reroll</button>
      </div>

      {/* Right: Visuals & Metrics */}
      <div style={{
        flex: '1 1 0', minWidth:0,
        background: 'radial-gradient(ellipse at 93% 33%, #1a1333 0%, #2d1e4f 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        padding: '44px 33px 28px 32px',
        position: 'relative'
      }}>
        <div style={{
          fontFamily: FONTS.heading, fontWeight: 600, fontSize: '1.28rem', color:PALETTE.accent, marginBottom: 13}}>
          Reality Renders
        </div>
        <div style={{display:'flex', flexDirection: 'row', gap: 13, marginBottom: 18}}>
          {!loading && visuals.map((url,i) => (
              <img
                key={i}
                src={url}
                alt="AI-generated visual"
                style={{
                  width: '140px', height: '94px', objectFit:'cover', borderRadius:8,
                  boxShadow: `0 1.5px 9px ${PALETTE.accent}33, 0 1px 7px #2225`,
                  border: `1.3px solid ${PALETTE.accent}26`,
                  background: '#0b0d13'
                }}
              />
          ))}
          {loading &&
            <div style={{
              width:140,height:94, background:'#18143a',
              borderRadius:8, display:'flex', alignItems:'center',justifyContent:'center', color:PALETTE.accent, fontWeight:500, fontSize:'1.25rem'
            }}><div className="loading-dots"><span>⏳</span></div></div>
          }
        </div>
        <div style={{
          margin:'21px 0 5px 0', color:'#f7d7ffbc', fontFamily:FONTS.heading, fontWeight:400, textAlign:'center'
        }}>
          Metrics Dashboard
        </div>
        <div style={{
          background:'#18143aeb', borderRadius:8, padding:'14px 8px 7px 18px',
          boxShadow:`0 1.7px 13px #321e7a44, 0 0.7px 4px #fff1`,
          minWidth: 258, maxWidth:288, margin:'0 auto 8px auto'
        }}>
          <RadialMetrics />
          <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 6}}>
            {/* Sliders for direct editing */}
            {metricsOptions.map((m,i) => (
              <div key={m.key} style={{marginBottom:0}}>
                <label style={{
                  color: m.color, fontSize:'.96rem',
                  marginRight:7, fontFamily:FONTS.heading
                }}>{m.label}:
                </label>
                <input
                  type="range"
                  value={metrics[m.key]}
                  min={0}
                  max={100}
                  style={{flex:1,accentColor:m.color,margin:'0 8px', verticalAlign:-2}}
                  onChange={e => setMetrics(metrics => ({...metrics, [m.key]: Number(e.target.value)}))}
                  aria-label={`${m.label} slider`}
                />
                <span style={{color:'#fff',marginLeft:2,fontSize:'.99rem'}}>{metrics[m.key]}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:'auto', color:'#9affff82', fontFamily:FONTS.body, fontSize:'0.97rem', textAlign:'center', opacity:.82}}>
          <div style={{marginBottom:2}}><span style={{color:PALETTE.accent,fontWeight:600}}>Tip:</span> <span>Adjust metrics to see how outcomes shift.</span></div>
          <div style={{color:'#a1bfff', marginTop:6}}>Dreamlike Animations enabled</div>
        </div>
      </div>
    </div>
  );
}

// --- Main App Container ---
function App() {
  const [simulationState, setSimulationState] = useState({
    started: false,
    scenario: null,
    profile: {}
  });

  // Theme font CSS effect on mount
  useEffect(() => {
    const font1 = document.createElement('link');
    font1.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;700&display=swap';
    font1.rel = 'stylesheet';
    document.head.appendChild(font1);
    return () => { document.head.removeChild(font1); };
  }, []);

  return (
    <div className="app" style={{position:'relative', minHeight:'100vh', background: PALETTE.background}}>
      <Starfield numStars={175}/>
      <nav className="navbar" style={{
        background: 'rgba(26,19,51,0.92)', boxShadow: `0 1.5px 8px #0b0f1d35`
      }}>
        <div className="container" style={{maxWidth:1280}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div className="logo" style={{
              fontFamily: FONTS.heading,
              color: PALETTE.accent,
              fontSize: '1.3rem'
            }}>
              <span className="logo-symbol" style={{fontSize:'1.35em', color: PALETTE.accent, marginRight:6}}>✶</span>
              Multiverse Mirage
            </div>
            <div style={{display: 'flex', alignItems:'center', gap: 8}}>
              <ImmersiveAudioToggle />
              <a
                href="https://github.com/kaviacode/multiverse-mirage"
                style={{
                  color:'#fff', textDecoration:'none',fontWeight:500,
                  background:PALETTE.accent, borderRadius:6,
                  padding:'7px 14px', fontFamily:FONTS.heading,
                  fontSize:'1.01rem', boxShadow:'0 1.5px 5px #00ffe728'
                }}
                target="_blank" rel="noopener noreferrer"
              >GitHub</a>
            </div>
          </div>
        </div>
      </nav>
      <main style={{paddingTop: 64, minHeight: '100svh'}}>
        {!simulationState.started ? (
          <WhatIfLanding
            onSubmit={(scenario, profile) => setSimulationState({
              started: true,
              scenario, profile
            })}
          />
        ) : (
          <SimulationView
            scenario={simulationState.scenario}
            profile={simulationState.profile}
            onBack={() => setSimulationState({started:false,scenario:null,profile:{}})}
          />
        )}
      </main>
      {/* Soft color glow overlays */}
      <div style={{
        pointerEvents: 'none', position:'fixed', left:0, top:0, width:'100vw', height:'100svh',
        zIndex:1, mixBlendMode:'color-dodge',
      }}>
        <div style={{
          position:'absolute', left:'13vw',top:'23vh', width:180,height:180,
          borderRadius:'50%', background:PALETTE.accent, filter:'blur(110px)', opacity:.13}}/>
        <div style={{
          position:'absolute', right:'7vw',top:'13vh', width:100,height:100,
          borderRadius:'50%', background:'#ffaaff', filter:'blur(88px)', opacity:.08}}/>
        <div style={{
          position:'absolute', left:'60vw',top:'61vh', width:110,height:110,
          borderRadius:'50%', background:'#8adeff', filter:'blur(110px)', opacity:.10}}/>
      </div>
    </div>
  );
}

export default App;
