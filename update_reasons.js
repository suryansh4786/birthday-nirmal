import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

const reasonsSlideCode = `function ReasonsSlide({ onNext }) {
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

        <div className="flex flex-wrap justify-center gap-6 w-full perspective-1000">
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
}`;

content = content.replace(/function ReasonsSlide\(\{(.|\n)*?function PromiseSlide/m, reasonsSlideCode + '\n\nfunction PromiseSlide');

fs.writeFileSync('src/App.jsx', content);
console.log("ReasonsSlide updated successfully.");
