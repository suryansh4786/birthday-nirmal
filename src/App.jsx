import { Heart, Sparkles, Stars, Gift, ChevronRight, ChevronLeft, Music } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ReactPlayer from 'react-player';

function FallingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
          animate={{ 
            y: window.innerHeight + 50, 
            x: Math.random() * window.innerWidth,
            opacity: [0, 0.7, 0.7, 0],
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 15
          }}
        >
          <Heart className="w-6 h-6 text-pink-400 fill-pink-400 opacity-60 drop-shadow-md" />
        </motion.div>
      ))}
    </div>
  );
}
import './App.css';

const slides = [
  'entrance',
  'memory',
  'gallery', // NEW SLIDE
  'reasons',
  'promise',
  'cake',
  'finale'
];


function GlobalMusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt autoplay on first user interaction anywhere on the document
    const handleFirstInteraction = () => {
      if (audioRef.current && !playing) {
        audioRef.current.play().then(() => {
          setPlaying(true);
        }).catch(err => console.log("Autoplay blocked:", err));
      }
      // Remove listener after first interaction
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [playing]);

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent triggering the global interaction listener again immediately
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play();
        setPlaying(true);
      }
    }
  };

  return (
    <>
      <button 
        onClick={togglePlay}
        className="fixed top-6 right-6 z-[100] w-12 h-12 bg-white/70 backdrop-blur-md border border-rose-300 rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(255,182,193,0.8)] transition-all duration-300 group"
      >
        <Music className={`w-5 h-5 ${playing ? 'text-rose-500 animate-pulse' : 'text-gray-400'} group-hover:text-rose-500 transition-colors`} />
      </button>

      {/* Local Audio Player */}
      <audio 
        ref={audioRef}
        src="/tum-se-hi.mp4" 
        loop 
        className="hidden" 
      />

      {/* Floating Music Notes */}
      <AnimatePresence>
        {playing && (
          <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden">
             {[...Array(10)].map((_, i) => (
               <motion.div
                 key={`note-${i}`}
                 initial={{ opacity: 0, y: window.innerHeight, x: Math.random() * window.innerWidth }}
                 animate={{ 
                   opacity: [0, 1, 1, 0], 
                   y: -100, 
                   x: Math.random() * window.innerWidth + (Math.random() > 0.5 ? 200 : -200),
                   rotate: Math.random() * 360
                 }}
                 transition={{ 
                   duration: Math.random() * 10 + 10, 
                   repeat: Infinity,
                   ease: "linear",
                   delay: Math.random() * 5
                 }}
                 className="absolute text-rose-300/50 text-3xl font-serif drop-shadow-md"
               >
                 {i % 2 === 0 ? '♫' : '♪'}
               </motion.div>
             ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function StardustCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let particleId = 0;
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (Math.random() > 0.4) {
        setParticles(prev => [
          ...prev.slice(-20), // Keep max 20 particles
          {
            id: particleId++,
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 + 1, // Fall downwards
            size: Math.random() * 8 + 4
          }
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Main glowing cursor dot */}
      <motion.div 
        className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#ff00de] mix-blend-screen"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      
      {/* Sparkle Trail */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: p.x, y: p.y, scale: 1 }}
            animate={{ 
              opacity: 0, 
              x: p.x + p.vx * 20, 
              y: p.y + p.vy * 20, 
              scale: 0 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full bg-pink-400"
            style={{ 
              width: p.size, 
              height: p.size,
              boxShadow: `0 0 ${p.size * 2}px rgba(255,182,193,0.8)`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}


function SlideTransition({ children, keyName }) {
  return (
    <motion.div
      key={keyName}
      initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 1.1, rotateY: 30 }}
      transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      className="absolute inset-0 w-full h-full"
    >
      {children}
    </motion.div>
  );
}


function EnterOverlay({ onEnter }) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black cursor-pointer"
      onClick={onEnter}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/40 via-black to-black opacity-60" />
      
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center z-10"
      >
        <Heart className="w-16 h-16 text-rose-500 mb-6 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)] fill-rose-500" />
        <h1 className="text-3xl md:text-5xl font-serif text-rose-200 tracking-[0.2em] uppercase font-light drop-shadow-xl text-center px-4">
          Tap to Begin
        </h1>
        <p className="text-rose-400/60 mt-4 tracking-widest text-sm uppercase">Turn your volume up</p>
      </motion.div>
    </motion.div>
  );
}

export default function App() {



  const [hasEntered, setHasEntered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-gradient-to-br from-peach via-pink-100 to-peach text-[#800020] overflow-hidden font-sans w-screen max-w-[100vw]">
      <AnimatePresence>
        {!hasEntered && (
          <EnterOverlay key="enter-overlay" onEnter={() => setHasEntered(true)} />
        )}
      </AnimatePresence>
      <StardustCursor />
      <GlobalMusicPlayer />
      <FallingHearts />
      
      {/* Heavy Luxury Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-red-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-yellow-600/10 blur-[100px]" />
        
        {/* Floating dust particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-rose-400/30"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentSlide === 0 && <SlideTransition keyName="slide-0"><EntranceSlide onNext={nextSlide} /></SlideTransition>}
        {currentSlide === 1 && <SlideTransition keyName="slide-1"><MemorySlide onNext={nextSlide} /></SlideTransition>}
        {currentSlide === 2 && <SlideTransition keyName="slide-2"><GallerySlide onNext={nextSlide} /></SlideTransition>}
        {currentSlide === 3 && <SlideTransition keyName="slide-3"><ReasonsSlide onNext={nextSlide} /></SlideTransition>}
        {currentSlide === 4 && <SlideTransition keyName="slide-4"><PromiseSlide onNext={nextSlide} /></SlideTransition>}
        {currentSlide === 5 && <SlideTransition keyName="slide-5"><CakeSlide onNext={nextSlide} /></SlideTransition>}
        {currentSlide === 6 && <SlideTransition keyName="slide-6"><FinaleSlide /></SlideTransition>}
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-50 bg-white/40 px-6 py-3 rounded-full border border-rose-400/20 backdrop-blur-md">
        <button onClick={prevSlide} className={`text-rose-600/50 hover:text-rose-600 transition-colors ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-3">
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-700 cursor-pointer ${
                currentSlide === idx ? 'bg-rose-400 w-8 shadow-[0_0_15px_#FFB6C1]' : 'bg-white/20 hover:bg-rose-400/50'
              }`}
            />
          ))}
        </div>

        <button onClick={nextSlide} className={`text-rose-600/50 hover:text-rose-600 transition-colors ${currentSlide === slides.length - 1 ? 'opacity-0 pointer-events-none' : ''}`}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function EntranceSlide({ onNext }) {
  const [phase, setPhase] = useState('walk');

  useEffect(() => {
    // Cinematic Drama Timeline
    const t1 = setTimeout(() => setPhase('knock'), 3500); 
    const t2 = setTimeout(() => setPhase('doorOpen'), 5500); 
    const t3 = setTimeout(() => setPhase('giveFlower'), 7500); 
    const t4 = setTimeout(() => setPhase('kiss'), 10000); 
    const t5 = setTimeout(() => setPhase('done'), 13500); 

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Heavy Cinematic Background - Deep Velvet & Gold */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-200 via-peach to-pink-100" />
      
      {/* Golden Glowing Fog */}
      <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-pink-300/30 via-peach/20 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Golden Embers */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`ember-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-rose-500 to-yellow-400 shadow-[0_0_10px_#D4AF37]"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
            animate={{ 
              y: [0, -100, -200], 
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1] 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* The Cinematic Stage (Glass Floor) */}
      <div className="absolute bottom-[20%] w-[120%] -left-[10%] h-[20%] bg-gradient-to-t from-pink-300 via-pink-200/80 to-white/5 border-t border-rose-400/30 backdrop-blur-xl transform perspective-[1000px] rotateX-[60deg]" />

      {/* Cinematic Sweeping Spotlight */}
      <motion.div 
        initial={{ rotate: -45, opacity: 0 }}
        animate={{ 
          rotate: phase === 'walk' ? [-45, 45, -20, 20, 0] : 0, 
          opacity: phase === 'walk' ? [0, 1, 1, 1, 0.5] : 0 
        }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
        className="absolute -top-[50%] left-1/2 w-32 h-[200vh] bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-3xl pointer-events-none z-30"
        style={{ transformOrigin: 'top center' }}
      />

      {/* The Ornate Luxury Door */}
      <div className="absolute bottom-[28%] right-[20%] md:right-[30%] w-32 h-56 flex items-end justify-center z-10">
        {/* Door Frame */}
        <div className="absolute inset-0 border-[6px] border-[#3e1f0e] rounded-t-full shadow-[0_0_40px_rgba(212,175,55,0.15)] bg-white/90">
          <div className="absolute inset-1 border border-rose-400/30 rounded-t-full pointer-events-none" />
        </div>
        
        {/* Muskan (Girl Silhouette) - Glowing from inside */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'walk' || phase === 'knock' ? 0 : 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-16 h-36 flex flex-col items-center bottom-0"
        >
          <div className="absolute -inset-10 bg-yellow-600/20 blur-2xl rounded-full" /> {/* Inner Glow */}
          <div className="w-10 h-10 bg-white/20 border border-red-500/50 rounded-full z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]" /> {/* Head */}
          <div className="w-16 h-28 bg-gradient-to-b from-rose-500 to-rose-700 border-t border-x border-red-500/30 rounded-t-3xl -mt-2 z-0 shadow-[0_0_20px_rgba(220,38,38,0.3)]" /> {/* Dress */}
        </motion.div>

        {/* The Swinging Door Panel */}
        <motion.div 
          initial={{ rotateY: 0 }}
          animate={{ rotateY: phase === 'walk' || phase === 'knock' ? 0 : -105 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
          className="absolute inset-0 bg-gradient-to-br from-[#4a2511] to-[#1a0800] border-r-2 border-l-2 border-rose-400/50 rounded-t-full origin-left shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Door details */}
          <div className="absolute top-[40%] right-3 w-4 h-4 bg-rose-400 rounded-full shadow-[0_0_10px_#D4AF37]" />
          <div className="absolute inset-4 border border-rose-400/20 rounded-t-[50px] pointer-events-none" />
        </motion.div>
      </div>

      {/* Nirmal (Boy Silhouette) */}
      <motion.div 
        initial={{ x: '-50vw' }}
        animate={{ 
          x: phase === 'walk' ? '0vw' : (phase === 'kiss' || phase === 'done' ? '18vw' : '12vw') 
        }}
        transition={{ duration: phase === 'walk' ? 3.5 : 1.5, ease: "easeInOut" }}
        className="absolute bottom-[28%] left-[20%] md:left-[30%] w-16 h-40 flex flex-col items-center z-20"
      >
        <motion.div 
          animate={{ y: phase === 'walk' ? [-3, 3, -3] : 0 }}
          transition={{ duration: 0.6, repeat: phase === 'walk' ? Infinity : 0, ease: "easeInOut" }}
          className="flex flex-col items-center w-full h-full"
        >
          <div className="w-12 h-12 bg-white/20 border border-blue-500/50 rounded-full z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" /> {/* Head */}
          <div className="w-14 h-16 bg-gradient-to-b from-blue-400 to-blue-600 border-t border-x border-blue-500/30 rounded-t-xl -mt-1 z-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]" /> {/* Jacket */}
          <div className="w-12 h-14 bg-transparent border-x border-blue-900/50" /> {/* Pants */}

          {/* Arm (Knocking & Giving Flowers) */}
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ 
              rotate: phase === 'knock' ? [-30, 30, -30, 30, 0] : (phase === 'giveFlower' || phase === 'kiss' || phase === 'done' ? -75 : 0) 
            }}
            transition={{ duration: phase === 'knock' ? 1.5 : 0.8, ease: "easeInOut" }}
            className="absolute top-14 left-1/2 w-3 h-14 bg-white/20 border border-blue-500/40 origin-top rounded-full z-20 shadow-lg"
          >
            {/* The Luxury Bouquet */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: phase === 'giveFlower' || phase === 'kiss' || phase === 'done' ? 1 : 0,
                scale: phase === 'giveFlower' || phase === 'kiss' || phase === 'done' ? 1 : 0
              }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute -bottom-10 -left-6 w-16 h-16"
            >
              <div className="absolute inset-0 bg-red-600 blur-md opacity-50 animate-pulse" /> {/* Bouquet Glow */}
              <div className="absolute top-0 left-2 w-5 h-5 bg-gradient-to-br from-red-400 to-red-700 rounded-full shadow-md" />
              <div className="absolute top-2 left-6 w-6 h-6 bg-gradient-to-br from-red-400 to-red-800 rounded-full shadow-md" />
              <div className="absolute top-4 left-0 w-7 h-7 bg-gradient-to-br from-red-500 to-red-900 rounded-full shadow-md" />
              <div className="absolute top-6 left-4 w-5 h-5 bg-gradient-to-br from-red-400 to-red-700 rounded-full shadow-md" />
              <div className="absolute bottom-0 left-4 w-4 h-8 bg-gradient-to-b from-green-700 to-green-900 rounded-b-md" /> {/* Stems */}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Epic Kissing Light Burst */}
      <AnimatePresence>
        {(phase === 'kiss' || phase === 'done') && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -80 }}
            className="absolute bottom-[40%] right-[35%] md:right-[40%] z-30"
          >
            <div className="absolute -inset-20 bg-pink-500/20 blur-[50px] rounded-full" />
            <Heart className="relative w-16 h-16 text-pink-500 fill-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,1)] animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Story Text */}
      <div className="absolute top-[15%] w-full text-center z-50 px-4">
        <AnimatePresence mode="wait">
          {phase === 'knock' && (
            <motion.h2 key="text-knock" initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }} transition={{ duration: 1 }} className="text-2xl md:text-5xl font-serif text-[#800020] tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">*Knock Knock*</motion.h2>
          )}
          {phase === 'giveFlower' && (
            <motion.h2 key="text-flower" initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }} transition={{ duration: 1 }} className="text-3xl md:text-6xl font-serif text-rose-600 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">"Happy Birthday, baachaaaaa!"</motion.h2>
          )}
          {(phase === 'kiss' || phase === 'done') && (
            <motion.div key="text-kiss" initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 2, ease: "easeOut" }} className="flex flex-col items-center">
              <h2 className="text-4xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-500 via-white to-pink-500 drop-shadow-[0_0_30px_rgba(212,175,55,0.6)] leading-tight">
                Happy Birthday,<br/><span className="italic font-light">baachaaaaa!</span>
              </h2>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step Inside Button */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            onClick={onNext}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-12 md:bottom-20 px-10 py-4 border border-rose-400/40 bg-white/40 backdrop-blur-md text-rose-600 hover:bg-rose-400 hover:text-black transition-all duration-500 uppercase tracking-[0.4em] text-xs font-medium z-50 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)]"
          >
            Step Inside
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Cinematic Bars */}
      <div className="absolute top-0 w-full h-8 md:h-16 bg-white/20 z-40 shadow-[0_20px_40px_rgba(0,0,0,1)]" />
      <div className="absolute bottom-0 w-full h-8 md:h-16 bg-white/20 z-40 shadow-[0_-20px_40px_rgba(0,0,0,1)]" />
    </motion.div>
  );
}

function MemorySlide({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 bg-transparent overflow-y-auto"
    >
      <div className="z-10 w-full max-w-7xl flex flex-col items-center py-10">
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <div className="w-8 md:w-16 h-1 bg-rose-400 rounded-full shadow-[0_0_10px_#FFB6C1]" />
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-6xl font-serif font-bold text-rose-700 text-center tracking-wide drop-shadow-md"
          >
            The Beginning
          </motion.h2>
          <div className="w-8 md:w-16 h-1 bg-rose-400 rounded-full shadow-[0_0_10px_#FFB6C1]" />
        </div>
        
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-20 md:gap-24 w-full perspective-1000 mt-10 pb-20">
          {[7, 11].map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, rotateY: 45, y: -100 }}
              animate={{ opacity: 1, rotateY: 0, y: 0 }}
              transition={{ delay: idx * 0.4, duration: 1.5, type: "spring", bounce: 0.4 }}
              className="relative w-full max-w-[320px] mx-auto group"
            >
              {/* Hanging String & Pin */}
              <div className="absolute -top-16 left-1/2 w-0.5 h-16 bg-gray-300 origin-top z-0" />
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-sm z-10" />

              <motion.div
                whileHover={{ rotate: (idx % 2 === 0 ? 3 : -3), scale: 1.05, z: 20 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformOrigin: "top center" }}
                className="relative aspect-[3/4] bg-white p-4 md:p-6 pb-16 md:pb-24 rounded-sm border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:shadow-[0_30px_60px_rgba(255,182,193,0.5)] transition-shadow duration-500 z-10"
              >
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 backdrop-blur-sm border border-white/50 rotate-[-2deg] shadow-sm z-30" />
                
                <div className="w-full h-full bg-white rounded-sm overflow-hidden relative shadow-inner">
                  <img 
                    src={`/img-${item}.jpg`} 
                    alt="Memory" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="absolute bottom-6 left-0 right-0 z-20 text-center px-4">
                  <p className="text-gray-800 font-serif text-3xl font-bold tracking-widest" style={{ fontFamily: "'Caveat', cursive, serif" }}>
                    {item === 7 ? 'First Glance' : 'Lost in Time'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function GallerySlide({ onNext }) {
  const [selectedId, setSelectedId] = useState(null);

  const photos = [
    { id: 3, span: "col-span-1 row-span-1", text: "Endless Joy" },
    { id: 10, span: "col-span-1 md:col-span-2 row-span-1 md:row-span-2", text: "Perfect Days" },
    { id: 5, span: "col-span-1 row-span-1", text: "Forever" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 bg-transparent overflow-y-auto"
    >
      <div className="w-full max-w-5xl flex flex-col min-h-min py-10 md:py-0">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 pl-4 border-l-4 border-rose-500"
        >
          <h2 className="text-3xl md:text-6xl font-serif font-bold text-[#800020] tracking-wide drop-shadow-sm">A Lifetime of</h2>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-rose-500 italic drop-shadow-sm">Moments</h2>
        </motion.div>

        <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 w-full mt-4 pb-20">
          {photos.map((photo, i) => (
            <motion.div
              layoutId={`gallery-img-${photo.id}`}
              key={photo.id}
              onClick={() => setSelectedId(photo.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (i * 0.15), duration: 0.8 }}
              className={`relative overflow-hidden rounded-3xl border-4 border-white shadow-[0_15px_40px_rgba(255,182,193,0.6)] group cursor-pointer bg-white ${photo.span} aspect-square md:aspect-auto min-h-[150px]`}
            >
              <div className="absolute inset-0 bg-rose-500/10 group-hover:bg-transparent transition-all duration-500 z-10 pointer-events-none" />
              <img 
                src={`/img-${photo.id}.jpg`} 
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                alt="Gallery"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#800020]/90 via-[#800020]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-end p-6 pointer-events-none">
                <p className="text-white font-serif text-2xl font-bold italic tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-md">
                  {photo.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              layoutId={`gallery-img-${selectedId}`}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white p-2 rounded-2xl shadow-2xl"
            >
              <img 
                src={`/img-${selectedId}.jpg`} 
                className="w-full h-full object-contain max-h-[85vh] rounded-xl"
                alt="Expanded Gallery"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ReasonsSlide({ onNext }) {
  const [flipped, setFlipped] = useState(null);
  
  const reasons = [
    "Your smile lights up my darkest days.",
    "The way you care about the little things.",
    "Your endless patience and pure heart.",
    "Because you make me want to be better.",
    "The simple fact that you exist."
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 bg-transparent overflow-y-auto"
    >
      <div className="z-10 w-full max-w-6xl flex flex-col items-center py-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white/60 backdrop-blur-xl px-12 py-4 rounded-full border border-white mb-12 shadow-[0_10px_30px_rgba(255,182,193,0.5)]"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-rose-600 tracking-wide">Why I Love You</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 w-full perspective-1000 pb-20">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="relative w-full md:w-[calc(33%-1rem)] max-w-[300px] aspect-[4/3] cursor-pointer group"
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
              onClick={() => setFlipped(flipped === i ? null : i)}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-700 shadow-[0_10px_30px_rgba(255,182,193,0.4)] group-hover:shadow-[0_20px_50px_rgba(255,182,193,0.7)] rounded-2xl"
                animate={{ rotateY: flipped === i ? 180 : 0 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of Card */}
                <div 
                  className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-md border-2 border-white rounded-2xl flex flex-col items-center justify-center backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Heart className="w-10 h-10 text-rose-300 mb-4 drop-shadow-sm group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-serif font-bold text-rose-600">Reason #{i + 1}</h3>
                  <p className="text-sm text-rose-400 mt-2 font-medium">Tap to Reveal</p>
                </div>

                {/* Back of Card */}
                <div 
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-white rounded-2xl flex items-center justify-center p-6 backface-hidden shadow-inner"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <p className="text-white font-serif text-xl md:text-2xl font-bold text-center leading-relaxed drop-shadow-md">
                    "{reason}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


function PromiseSlide({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [waxBroken, setWaxBroken] = useState(false);

  const handleOpen = () => {
    setWaxBroken(true);
    setTimeout(() => {
      setOpened(true);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 bg-transparent overflow-y-auto overflow-x-hidden"
    >
      <div className="w-full max-w-4xl flex flex-col items-center py-10 perspective-1000">
        
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              initial={{ y: 50, rotateX: 30, opacity: 0 }}
              animate={{ y: 0, rotateX: 0, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
              onClick={handleOpen}
              className="relative w-[300px] h-[225px] md:w-[400px] md:h-[300px] cursor-pointer group mt-20 md:mt-24 mx-auto"
            >
              {/* Envelope Body */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 shadow-[0_30px_60px_rgba(255,182,193,0.6)] rounded-lg border border-pink-300 overflow-hidden">
                {/* Envelope Flap Base */}
                <div className="absolute top-0 left-0 w-full h-full border-t-[112px] md:border-t-[150px] border-t-pink-200 border-l-[150px] md:border-l-[200px] border-l-transparent border-r-[150px] md:border-r-[200px] border-r-transparent origin-top z-10 drop-shadow-md" />
                <div className="absolute bottom-0 left-0 w-full h-full border-b-[113px] md:border-b-[150px] border-b-pink-100 border-l-[150px] md:border-l-[200px] border-l-transparent border-r-[150px] md:border-r-[200px] border-r-transparent z-20 drop-shadow-sm" />
                
                {/* Wax Seal */}
                <motion.div 
                  className="absolute top-[35%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center"
                  animate={{ scale: waxBroken ? 1.5 : [1, 1.05, 1] }}
                  transition={{ duration: waxBroken ? 0.5 : 2, repeat: waxBroken ? 0 : Infinity }}
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <motion.div 
                      className="absolute inset-0 bg-red-600 rounded-full shadow-[inset_0_-4px_8px_rgba(0,0,0,0.4),0_5px_15px_rgba(220,38,38,0.6)] border-2 border-red-700 flex items-center justify-center"
                      animate={waxBroken ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="w-8 h-8 md:w-10 md:h-10 text-red-300 fill-red-800 drop-shadow-md" />
                    </motion.div>
                    
                    {/* Broken Wax Particles */}
                    {waxBroken && (
                      <div className="absolute inset-0">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                            animate={{ 
                              x: (Math.random() - 0.5) * 200, 
                              y: (Math.random() - 0.5) * 200, 
                              scale: 0, 
                              opacity: 0,
                              rotate: Math.random() * 360
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-600 rounded-sm"
                            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Magical Glow when breaking */}
                {waxBroken && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-[40px] z-20 pointer-events-none"
                  />
                )}
                
                <p className="absolute bottom-6 left-0 right-0 text-center text-pink-400 font-serif italic text-sm tracking-widest font-bold z-20">Tap to Break Seal</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ y: 100, opacity: 0, rotateX: -20, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
              className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl p-6 md:p-16 rounded-sm shadow-[0_20px_60px_rgba(255,182,193,0.5)] border border-pink-100 z-30"
            >
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(#fb7185 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              
              <Heart className="w-12 h-12 text-rose-400 mx-auto mb-8 opacity-50" />
              
              <div className="space-y-4 md:space-y-6 text-center font-serif text-[#800020] text-base md:text-2xl leading-relaxed relative z-10">
                <p>My Dearest,</p>
                <p>On this special day, I want to make a promise to you.</p>
                <p>I promise to always be your biggest cheerleader, your safe haven, and your best friend.</p>
                <p>I promise to choose you, every single day, in a hundred lifetimes, in a hundred worlds, in any version of reality.</p>
                <p className="text-xl md:text-3xl text-rose-500 font-bold italic mt-6 md:mt-8">I promise you my forever.</p>
              </div>

              <div className="mt-12 text-right relative z-10 flex flex-col items-end">
                <p className="text-gray-500 italic mb-2">Yours always,</p>
                <p className="text-3xl md:text-4xl text-rose-600 font-bold" style={{ fontFamily: "'Clicker Script', cursive, serif" }}>Nirmal</p>
                <div className="w-24 h-px bg-rose-300 mt-2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


function CakeSlide({ onNext }) {
  const [phase, setPhase] = useState('balloons');

  const handlePop = () => {
    setPhase('cake');
  };

  const handleCut = () => {
    setPhase('cut');
    setTimeout(() => setPhase('feed'), 2000);
    setTimeout(() => setPhase('message-boy'), 4500);
    setTimeout(() => setPhase('message-girl'), 8500);
    setTimeout(() => setPhase('hug'), 12500);
    setTimeout(() => setPhase('done'), 15500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-200 via-peach to-pink-100" />
      
      {phase !== 'balloons' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              initial={{ x: -200, y: Math.random() * window.innerHeight, opacity: 0, rotate: 45 }}
              animate={{ 
                x: window.innerWidth + 200, 
                y: Math.random() * window.innerHeight + 500,
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 5 + i * 2,
                ease: "linear"
              }}
              className="absolute w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-white rounded-full shadow-[0_0_10px_white]"
            >
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white]" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="absolute bottom-[20%] w-[120%] -left-[10%] h-[20%] bg-gradient-to-t from-pink-300 via-pink-200/80 to-white/5 border-t border-rose-400/30 backdrop-blur-xl transform perspective-[1000px] rotateX-[60deg]" />

      <AnimatePresence mode="wait">
        {phase === 'balloons' && (
          <motion.div
            key="balloons"
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer"
            onClick={handlePop}
          >
            <div className="relative w-full h-full">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
                  animate={{ 
                    y: "-10vh", 
                    x: Math.random() * window.innerWidth + (Math.random() > 0.5 ? 50 : -50)
                  }}
                  transition={{ 
                    duration: Math.random() * 5 + 5, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute w-12 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-[50%] shadow-lg border border-pink-300/50"
                  style={{ borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%" }}
                >
                  <div className="absolute -bottom-2 left-1/2 w-0.5 h-6 bg-white/50" />
                </motion.div>
              ))}
            </div>
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute px-8 py-4 bg-white/80 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(255,182,193,0.8)] border border-rose-300 pointer-events-none"
            >
              <h2 className="text-xl md:text-3xl font-serif font-bold text-rose-600 text-center">Tap to Pop Balloons!</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase !== 'balloons' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="absolute inset-0 z-10"
        >
          {phase === 'cake' && (
            <div className="absolute inset-0 pointer-events-none z-0">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -50, x: window.innerWidth / 2, opacity: 1 }}
                  animate={{ 
                    y: window.innerHeight, 
                    x: Math.random() * window.innerWidth,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute w-3 h-3 bg-rose-500 rounded-sm"
                />
              ))}
            </div>
          )}

          <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-32 md:w-48 h-24 md:h-32 flex flex-col items-center justify-end z-20">
            <div className="w-32 md:w-48 h-6 md:h-8 bg-white/60 backdrop-blur-md border border-rose-300 rounded-t-xl shadow-xl absolute bottom-0" />
            
            <motion.div 
              className="relative bottom-6 md:bottom-8 w-24 md:w-32 h-20 md:h-24 bg-gradient-to-b from-pink-100 to-pink-200 border-2 border-pink-300 rounded-t-lg shadow-lg flex flex-col items-center cursor-pointer"
              whileHover={{ scale: phase === 'cake' ? 1.05 : 1 }}
              onClick={phase === 'cake' ? handleCut : undefined}
            >
               <div className="w-full h-3 bg-pink-400 absolute top-4 opacity-50" />
               <div className="w-full h-3 bg-pink-400 absolute top-12 opacity-50" />
               <div className="absolute -top-6 flex gap-2">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="w-2 h-6 bg-white border border-gray-200 relative">
                     {phase === 'cake' && (
                       <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 0.5 }} className="absolute -top-3 left-0 w-2 h-3 bg-orange-400 rounded-full blur-[1px]" />
                     )}
                   </div>
                 ))}
               </div>
               
               {phase === 'cake' && (
                 <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity }} className="absolute -top-16 bg-white/90 px-3 py-1 rounded-full shadow-md whitespace-nowrap text-xs text-rose-600 font-bold border border-rose-200 pointer-events-none">
                   Tap to Cut
                 </motion.div>
               )}

               {phase !== 'cake' && (
                 <div className="absolute top-0 w-1 h-full bg-pink-400 opacity-80 left-1/2" />
               )}
            </motion.div>
          </div>

          <motion.div 
            animate={{ 
              x: phase === 'hug' || phase === 'done' ? '30vw' : '5vw',
              rotateY: 0
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-[28%] left-[0%] w-16 h-40 flex flex-col items-center z-10"
          >
            <div className="w-12 h-12 bg-white/30 border border-blue-400/50 rounded-full shadow-md" />
            <div className="w-14 h-16 bg-gradient-to-b from-blue-300 to-blue-500 border-t border-x border-blue-400/30 rounded-t-xl -mt-1 shadow-lg" />
            
            <motion.div 
              animate={{ 
                rotate: phase === 'cut' ? -45 : phase === 'feed' ? -80 : (phase === 'hug' || phase === 'done' ? -20 : 0)
              }}
              transition={{ duration: 0.8 }}
              className="absolute top-14 left-1/2 w-3 h-14 bg-white/30 border border-blue-400/40 origin-top rounded-full z-30"
            >
               {phase === 'feed' && (
                 <div className="absolute bottom-0 -left-2 w-4 h-4 bg-pink-200 rounded-full shadow-sm" />
               )}
            </motion.div>
          </motion.div>

          <motion.div 
            animate={{ 
              x: phase === 'hug' || phase === 'done' ? '33vw' : '65vw',
              rotateY: 180
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-[28%] left-[30%] w-16 h-36 flex flex-col items-center z-10"
          >
            <div className="w-10 h-10 bg-white/30 border border-rose-400/50 rounded-full shadow-md" />
            <div className="w-16 h-28 bg-gradient-to-b from-rose-400 to-rose-600 border-t border-x border-rose-400/30 rounded-t-3xl -mt-2 shadow-lg" />
            
            <motion.div 
              animate={{ 
                rotate: phase === 'cut' ? -45 : phase === 'feed' ? -80 : (phase === 'hug' || phase === 'done' ? -20 : 0)
              }}
              transition={{ duration: 0.8, delay: phase === 'feed' ? 1.5 : 0 }}
              className="absolute top-12 left-1/2 w-3 h-12 bg-white/30 border border-rose-400/40 origin-top rounded-full z-30"
            >
               {phase === 'feed' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-0 -left-2 w-4 h-4 bg-pink-200 rounded-full shadow-sm" />
               )}
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {phase === 'message-boy' && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-[10%] md:top-[20%] left-[5%] md:left-[10%] w-48 md:w-64 bg-white/80 backdrop-blur-md p-4 rounded-2xl rounded-bl-none shadow-xl border border-blue-200 z-50"
              >
                <p className="text-[#800020] font-medium font-serif italic text-base md:text-lg">"Every slice of life is sweeter with you."</p>
              </motion.div>
            )}
            
            {(phase === 'message-girl' || phase === 'hug' || phase === 'done') && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute top-[10%] md:top-[20%] right-[5%] md:right-[20%] w-48 md:w-64 bg-white/80 backdrop-blur-md p-4 rounded-2xl rounded-br-none shadow-xl border border-rose-200 z-50"
              >
                <p className="text-rose-600 font-medium font-serif italic text-base md:text-lg">"You are my favorite wish come true."</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(phase === 'hug' || phase === 'done') && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-[40%] left-[45%] md:left-[38%] z-30 pointer-events-none"
              >
                <div className="absolute -inset-10 bg-pink-400/40 blur-[30px] rounded-full animate-pulse" />
                <Heart className="relative w-20 h-20 text-rose-500 fill-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.8)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {phase === 'done' && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            onClick={onNext}
            transition={{ duration: 1 }}
            className="absolute bottom-12 md:bottom-20 px-10 py-4 border-2 border-white bg-white/60 backdrop-blur-md text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-500 uppercase tracking-[0.4em] text-sm font-bold z-50 shadow-[0_10px_30px_rgba(255,182,193,0.6)] hover:shadow-[0_15px_40px_rgba(255,182,193,0.9)] rounded-full"
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FinaleSlide() {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 bg-transparent overflow-y-auto"
    >
      <div className="absolute inset-0 bg-black/90 pointer-events-none transition-opacity duration-[3000ms]" style={{ opacity: opened ? 1 : 0 }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-300/30 via-transparent to-transparent opacity-60" />

      {!opened ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpened(true)}
          className="cursor-pointer group flex flex-col items-center z-10"
        >
          <div className="relative w-40 h-40 mb-8 rounded-3xl flex items-center justify-center bg-white/70 backdrop-blur-xl border-4 border-white shadow-[0_20px_50px_rgba(255,182,193,0.6)] group-hover:shadow-[0_20px_80px_rgba(255,182,193,0.9)] transition-all duration-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Gift className="w-16 h-16 text-rose-500 group-hover:scale-110 transition-transform duration-500 relative z-10" />
          </div>
          <p className="text-rose-600 font-bold uppercase tracking-[0.4em] text-lg drop-shadow-md">Reveal</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, type: "spring", bounce: 0.4 }}
          className="z-10 text-center flex flex-col items-center w-full max-w-2xl bg-white/10 p-6 md:p-12 rounded-3xl border border-white/20 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] my-10"
        >
          {/* Neon Sign */}
          <motion.h1 
            animate={{ 
              textShadow: [
                "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de",
                "0 0 2px #fff, 0 0 5px #fff, 0 0 10px #ff00de, 0 0 15px #ff00de, 0 0 20px #ff00de",
                "0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de"
              ],
              opacity: [1, 0.8, 1, 1, 0.9, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, times: [0, 0.1, 0.2, 0.8, 0.9, 1] }}
            className="text-4xl md:text-7xl font-sans font-bold text-white mb-4 md:mb-6 tracking-wide"
            style={{ fontFamily: "'Clicker Script', cursive, sans-serif" }}
          >
            I Love You
          </motion.h1>
          
          <div className="relative w-full max-w-[250px] md:max-w-xs mb-6 aspect-[3/4] rounded-2xl overflow-hidden border-[12px] border-white shadow-[0_15px_40px_rgba(255,255,255,0.2)] bg-white mx-auto transform rotate-[-2deg]">
            <img src="/finale-photo.jpg" alt="Us" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
            <span className="px-5 py-2 bg-pink-500/80 backdrop-blur-md text-white text-sm md:text-base font-bold tracking-wider rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] border border-pink-400">
              #you&me
            </span>
            <span className="px-5 py-2 bg-pink-500/80 backdrop-blur-md text-white text-sm md:text-base font-bold tracking-wider rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] border border-pink-400">
              #always&forever
            </span>
          </div>

          <p className="text-lg md:text-2xl text-pink-200 font-bold mb-6 md:mb-8 italic tracking-wide drop-shadow-md">
            Happy Birthday, gorgeous. Let's make this year unforgettable.
          </p>
          
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute w-20 h-20 bg-pink-500/60 rounded-full blur-[20px]"
            />
            <Heart className="w-12 h-12 text-pink-300 fill-pink-500 relative z-10 drop-shadow-[0_0_20px_rgba(236,72,153,1)]" />
          </div>
        </motion.div>
      )}

      {opened && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(120)].map((_, i) => {
            const colors = ['bg-pink-500', 'bg-rose-500', 'bg-yellow-400', 'bg-white', 'bg-purple-500'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() > 0.8 ? 'w-4 h-4' : 'w-2 h-2';
            return (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  y: window.innerHeight, 
                  x: window.innerWidth / 2,
                  scale: 0
                }}
                animate={{ 
                  y: [window.innerHeight, Math.random() * window.innerHeight - 200, window.innerHeight + 100],
                  x: [window.innerWidth / 2, Math.random() * window.innerWidth, Math.random() * window.innerWidth + (Math.random() > 0.5 ? 200 : -200)],
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: Math.random() * 3 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                  times: [0, 0.4, 1]
                }}
                className={`absolute ${size} ${color} rounded-full shadow-[0_0_10px_#fff]`}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
