import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

const finaleSlideCode = `function FinaleSlide() {
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
            className="text-5xl md:text-7xl font-sans font-bold text-white mb-6 tracking-wide"
            style={{ fontFamily: "'Clicker Script', cursive, sans-serif" }}
          >
            I Love You
          </motion.h1>
          
          <div className="relative w-full max-w-[250px] md:max-w-xs mb-6 aspect-[3/4] rounded-2xl overflow-hidden border-[12px] border-white shadow-[0_15px_40px_rgba(255,255,255,0.2)] bg-white mx-auto transform rotate-[-2deg]">
            <img src="/img-6.jpg" alt="Us" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
            <span className="px-5 py-2 bg-pink-500/80 backdrop-blur-md text-white text-sm md:text-base font-bold tracking-wider rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] border border-pink-400">
              #you&me
            </span>
            <span className="px-5 py-2 bg-pink-500/80 backdrop-blur-md text-white text-sm md:text-base font-bold tracking-wider rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] border border-pink-400">
              #always&forever
            </span>
          </div>

          <p className="text-xl md:text-2xl text-pink-200 font-bold mb-8 italic tracking-wide drop-shadow-md">
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

      {/* Deluxe Fireworks Simulation */}
      {opened && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Particles */}
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
                className={\`absolute \${size} \${color} rounded-full shadow-[0_0_10px_#fff]\`}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}`;

content = content.replace(/function FinaleSlide\(\) \{(.|\n)*?\}\n*$/m, finaleSlideCode + '\n');

fs.writeFileSync('src/App.jsx', content);
console.log("FinaleSlide updated successfully.");
