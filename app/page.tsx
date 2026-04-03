"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  onClick?: () => void;
};

function Button({ children, className = "", variant = "default", onClick }: ButtonProps) {
  const base = "px-6 py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-300";
  const styles =
    variant === "outline"
      ? "border border-white/20 text-white hover:bg-white hover:text-black"
      : "bg-white text-black hover:opacity-90";
  return <button onClick={onClick} className={`${base} ${styles} ${className}`}>{children}</button>;
}

function Logo() {
  return <div className="text-xs tracking-[0.5em]">BLACKWAUGH</div>;
}

function InvestorModal({ open, setOpen, onLogin }) {
  

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="bg-black/70 backdrop-blur-2xl border border-white/10 p-12 w-full max-w-md">
            <h3 className="text-sm mb-3 tracking-widest uppercase">Investor Access</h3>
            <p className="text-gray-500 text-[11px] mb-6 uppercase tracking-widest">Authorized institutional users only</p>
            <input placeholder="Email" className="w-full mb-3 p-3 bg-black/40 border border-white/10 text-sm" />
            <input placeholder="Password" type="password" className="w-full mb-6 p-3 bg-black/40 border border-white/10 text-sm" />
            <Button className="w-full" onClick={onLogin}>Enter</Button>
            <button onClick={() => setOpen(false)} className="mt-4 text-[10px] text-gray-600">Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Dashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-black text-white px-20 py-20">
      <h1 className="text-2xl mb-6 tracking-widest">Investor Dashboard</h1>
      <p className="text-gray-400 mb-10 text-sm">Confidential materials and performance data.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {["Q1 Report","Investor Deck","Pipeline Overview"].map((doc,i)=>(
          <div key={i} className="border border-white/10 p-6 hover:border-white/30 transition">
            <div className="mb-2">{doc}</div>
            <div className="text-xs text-gray-500">Download</div>
          </div>
        ))}
      </div>

      <Button className="mt-10" variant="outline" onClick={onLogout}>Logout</Button>
    </div>
  );
}





export default function Home() {
  const handleMouseMove = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -120]);

  if (loggedIn) return <Dashboard onLogout={() => setLoggedIn(false)} />;

  return (
    <div onMouseMove={handleMouseMove} className={`relative min-h-screen bg-black text-white font-mono overflow-hidden`}>

      {/* POINTER LIGHT */}
      <div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.08), transparent 60%)`
        }}
      />

      {/* VIDEO BACKGROUND (replace with real asset footage later) */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
        <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4" />
      </video>

      {/* GRAIN */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* AMBIENT LIGHT */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-white/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[700px] h-[700px] bg-white/5 rounded-full blur-[160px]" />
      </motion.div>

      {/* GLASS */}
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[3px] bg-gradient-to-b from-white/5 via-transparent to-transparent" />

      <InvestorModal open={open} setOpen={setOpen} onLogin={() => {setLoggedIn(true); setOpen(false);}} />

      {/* HEADER */}
      <header className="relative flex justify-between items-center px-20 py-6 border-b border-white/10">
        <Logo />
        <nav className="hidden md:flex gap-10 text-[10px] text-gray-500 tracking-widest uppercase">
          <span>Firm</span>
          <span>Strategy</span>
          <span>Portfolio</span>
          <span>Contact</span>
        </nav>
        <Button onClick={() => setOpen(true)} variant="outline">Investor Login</Button>
      </header>

      {/* HERO */}
      <section className="relative h-screen flex flex-col justify-center px-20 max-w-5xl">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl mb-8">
          Global Capital. Strategic Execution.
        </motion.h1>
        <p className="text-gray-400 max-w-md mb-10 text-sm">Investing across real assets and private markets.</p>
        <div className="flex gap-4">
          <Button>Strategy</Button>
          <Button variant="outline">Investor Relations</Button>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="relative px-20 py-16 border-t border-white/10 grid md:grid-cols-4 gap-10 text-center">
        {[
          ["$2.4B+","Assets Managed"],
          ["12+","Global Markets"],
          ["25+","Portfolio Companies"],
          ["15%","Target IRR"]
        ].map((m,i)=>(
          <div key={i}>
            <div className="text-2xl mb-1">{m[0]}</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">{m[1]}</div>
          </div>
        ))}
      </section>

      {/* PIPELINE PREVIEW */}
      <section className="relative px-20 py-24 border-t border-white/10 max-w-5xl">
        <h2 className="text-[10px] uppercase tracking-widest mb-10 text-gray-500">Active Pipeline</h2>
        <div className="grid md:grid-cols-3 gap-6 text-xs text-gray-400">
          {["Infrastructure Acquisition","Aviation Expansion","Technology Platform","Real Estate Development","Agriculture Expansion","Aquaculture Acquisition"].map((item,i)=>(
            <div key={i} className="border border-white/10 p-6 hover:border-white/30 transition">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS (RESTORED) */}
      <section className="relative px-20 py-24 border-t border-white/10 max-w-5xl">
        <h2 className="text-[10px] uppercase tracking-widest mb-10 text-gray-500">Investment Sectors</h2>
        <div className="grid md:grid-cols-3 gap-8 text-xs text-gray-400">
          {[
            "Real Estate Development",
            "Technology",
            "Aviation",
            "Agriculture",
            "Aquaculture",
            "Mining",
            "Infrastructure",
            "Marine",
            "Private Equity"
          ].map((sector, i) => (
            <div key={i} className="opacity-70 hover:opacity-100 transition">
              {sector}
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL OFFICES (RESTORED) */}
      <section className="relative px-20 py-24 border-t border-white/10 max-w-5xl">
        <h2 className="text-[10px] uppercase tracking-widest mb-10 text-gray-500">Global Offices</h2>
        <div className="grid md:grid-cols-4 gap-10 text-xs text-gray-500">
          {[
            ["Sydney", "Level 40, 1 Farrer Place, NSW 2000"],
            ["New York", "450 Park Avenue, NY 10022"],
            ["London", "20 Grosvenor Street, Mayfair"],
            ["Tokyo", "1-1 Marunouchi, Chiyoda"]
          ].map((city, i) => (
            <div key={i}>
              <div className="text-white mb-1">{city[0]}</div>
              <div>{city[1]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="relative px-20 py-24 border-t border-white/10 max-w-5xl">
        <h2 className="text-[10px] uppercase tracking-widest mb-10 text-gray-500">Leadership</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            ["Chief Executive Officer","Global capital allocation and strategic direction."],
            ["Chief Investment Officer","Oversight of investment strategy and portfolio execution."],
            ["Head of Infrastructure","Development and management of real asset platforms."]
          ].map((l,i)=>(
            <div key={i} className="border border-white/10 p-6 hover:border-white/30 transition">
              <div className="text-white text-sm mb-2 tracking-wide">{l[0]}</div>
              <div className="text-xs text-gray-500">{l[1]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LEGACY */}
      <section className="relative px-20 py-24 border-t border-white/10 max-w-5xl">
        <h2 className="text-[10px] uppercase tracking-widest mb-10 text-gray-500">Legacy</h2>
        <div className="max-w-2xl text-xs text-gray-400 leading-relaxed">
          BlackWaugh Group was established with a long-term mandate to build and scale enduring platforms across global markets. The firm operates with a disciplined investment philosophy, focused on capital preservation, asymmetric returns, and generational value creation.
          <br /><br />
          Since inception, BlackWaugh has expanded its presence across multiple continents, deploying capital into real assets, infrastructure, and strategic operating businesses.
        </div>
        <div className="mt-10 text-[10px] text-gray-500 uppercase tracking-widest">
          Established 2012 · Global Investment Platform
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-20 py-10 border-t border-white/10 flex justify-between text-[10px] text-gray-600">
        <div>© BlackWaugh Group</div>
        <div className="flex gap-6">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Compliance</span>
        </div>
      </footer>

    </div>
  );
}
