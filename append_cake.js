import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

const cakeSlideCode = `

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
      
      {/* Background Stage */}
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
              <h2 className="text-3xl font-serif font-bold text-rose-600">Tap to Pop Balloons!</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Drama Sequence */}
      {phase !== 'balloons' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="absolute inset-0 z-10"
        >
          {/* Confetti after pop */}
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

          {/* Table & Cake */}
          <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-48 h-32 flex flex-col items-center justify-end z-20">
            {/* Table */}
            <div className="w-48 h-8 bg-white/60 backdrop-blur-md border border-rose-300 rounded-t-xl shadow-xl absolute bottom-0" />
            
            {/* Cake */}
            <motion.div 
              className="relative bottom-8 w-32 h-24 bg-gradient-to-b from-pink-100 to-pink-200 border-2 border-pink-300 rounded-t-lg shadow-lg flex flex-col items-center cursor-pointer"
              whileHover={{ scale: phase === 'cake' ? 1.05 : 1 }}
              onClick={phase === 'cake' ? handleCut : undefined}
            >
               {/* Cake Layers */}
               <div className="w-full h-3 bg-pink-400 absolute top-4 opacity-50" />
               <div className="w-full h-3 bg-pink-400 absolute top-12 opacity-50" />
               {/* Candles */}
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

               {/* Cut Cake split visually */}
               {phase !== 'cake' && (
                 <div className="absolute top-0 w-1 h-full bg-pink-400 opacity-80 left-1/2" />
               )}
            </motion.div>
          </div>

          {/* Boy Silhouette (Nirmal) */}
          <motion.div 
            animate={{ 
              x: phase === 'hug' || phase === 'done' ? '30vw' : '15vw',
              rotateY: 0
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-[28%] left-[0%] w-16 h-40 flex flex-col items-center z-10"
          >
            <div className="w-12 h-12 bg-white/30 border border-blue-400/50 rounded-full shadow-md" /> {/* Head */}
            <div className="w-14 h-16 bg-gradient-to-b from-blue-300 to-blue-500 border-t border-x border-blue-400/30 rounded-t-xl -mt-1 shadow-lg" /> {/* Body */}
            
            {/* Boy Arm */}
            <motion.div 
              animate={{ 
                rotate: phase === 'cut' ? -45 : phase === 'feed' ? -80 : (phase === 'hug' || phase === 'done' ? -20 : 0)
              }}
              transition={{ duration: 0.8 }}
              className="absolute top-14 left-1/2 w-3 h-14 bg-white/30 border border-blue-400/40 origin-top rounded-full z-30"
            >
               {phase === 'feed' && (
                 <div className="absolute bottom-0 -left-2 w-4 h-4 bg-pink-200 rounded-full shadow-sm" /> // Cake piece
               )}
            </motion.div>
          </motion.div>

          {/* Girl Silhouette (Muskan) */}
          <motion.div 
            animate={{ 
              x: phase === 'hug' || phase === 'done' ? '33vw' : '50vw',
              rotateY: 180
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-[28%] left-[30%] w-16 h-36 flex flex-col items-center z-10"
          >
            <div className="w-10 h-10 bg-white/30 border border-rose-400/50 rounded-full shadow-md" /> {/* Head */}
            <div className="w-16 h-28 bg-gradient-to-b from-rose-400 to-rose-600 border-t border-x border-rose-400/30 rounded-t-3xl -mt-2 shadow-lg" /> {/* Dress */}
            
            {/* Girl Arm */}
            <motion.div 
              animate={{ 
                rotate: phase === 'cut' ? -45 : phase === 'feed' ? -80 : (phase === 'hug' || phase === 'done' ? -20 : 0)
              }}
              transition={{ duration: 0.8, delay: phase === 'feed' ? 1.5 : 0 }}
              className="absolute top-12 left-1/2 w-3 h-12 bg-white/30 border border-rose-400/40 origin-top rounded-full z-30"
            >
               {phase === 'feed' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-0 -left-2 w-4 h-4 bg-pink-200 rounded-full shadow-sm" /> // Cake piece
               )}
            </motion.div>
          </motion.div>

          {/* Dialogue Messages */}
          <AnimatePresence>
            {phase === 'message-boy' && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-[20%] left-[10%] w-64 bg-white/80 backdrop-blur-md p-4 rounded-2xl rounded-bl-none shadow-xl border border-blue-200 z-50"
              >
                <p className="text-[#800020] font-medium font-serif italic text-lg">"Every slice of life is sweeter with you."</p>
              </motion.div>
            )}
            
            {(phase === 'message-girl' || phase === 'hug' || phase === 'done') && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute top-[20%] right-[10%] md:right-[20%] w-64 bg-white/80 backdrop-blur-md p-4 rounded-2xl rounded-br-none shadow-xl border border-rose-200 z-50"
              >
                <p className="text-rose-600 font-medium font-serif italic text-lg">"You are my favorite wish come true."</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hug Burst */}
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

      {/* Step Inside Button */}
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
`;

content += cakeSlideCode;

fs.writeFileSync('src/App.jsx', content);
console.log("CakeSlide appended successfully.");
