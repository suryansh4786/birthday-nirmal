import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

const musicPlayerCode = `
function GlobalMusicPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <button 
        onClick={() => setPlaying(!playing)}
        className="fixed top-6 right-6 z-[100] w-12 h-12 bg-white/70 backdrop-blur-md border border-rose-300 rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(255,182,193,0.8)] transition-all duration-300 group"
      >
        <Music className={\`w-5 h-5 \${playing ? 'text-rose-500 animate-pulse' : 'text-gray-400'} group-hover:text-rose-500 transition-colors\`} />
      </button>

      {/* Floating Music Notes */}
      <AnimatePresence>
        {playing && (
          <div className="fixed inset-0 pointer-events-none z-[99] overflow-hidden">
             {[...Array(10)].map((_, i) => (
               <motion.div
                 key={\`note-\${i}\`}
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

export default function App() {`;

content = content.replace("export default function App() {", musicPlayerCode);

const appReturnCode = `  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-peach via-pink-100 to-peach text-[#800020] overflow-hidden font-sans">
      <GlobalMusicPlayer />
      <FallingHearts />`;

content = content.replace(/  return \(\s*<div className="relative w-full h-screen bg-gradient-to-br from-peach via-pink-100 to-peach text-\[#800020\] overflow-hidden font-sans">\s*<FallingHearts \/>/s, appReturnCode);

fs.writeFileSync('src/App.jsx', content);
console.log("Global Music Player added successfully.");
