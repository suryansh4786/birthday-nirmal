import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

const memorySlideCode = `function MemorySlide({ onNext }) {
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
            className="text-4xl md:text-6xl font-serif font-bold text-rose-700 text-center tracking-wide drop-shadow-md"
          >
            The Beginning
          </motion.h2>
          <div className="w-8 md:w-16 h-1 bg-rose-400 rounded-full shadow-[0_0_10px_#FFB6C1]" />
        </div>
        
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-16 md:gap-24 w-full perspective-1000 mt-10">
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
                className="relative aspect-[3/4] bg-white p-4 md:p-6 pb-20 md:pb-24 rounded-sm border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:shadow-[0_30px_60px_rgba(255,182,193,0.5)] transition-shadow duration-500 z-10"
              >
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 backdrop-blur-sm border border-white/50 rotate-[-2deg] shadow-sm z-30" />
                
                <div className="w-full h-full bg-white rounded-sm overflow-hidden relative shadow-inner">
                  <img 
                    src={\`/img-\${item}.jpg\`} 
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
}`;

content = content.replace(/function MemorySlide\(\{(.|\n)*?function GallerySlide/m, memorySlideCode + '\n\nfunction GallerySlide');

fs.writeFileSync('src/App.jsx', content);
console.log("MemorySlide updated successfully.");
