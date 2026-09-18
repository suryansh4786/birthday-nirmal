import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

const gallerySlideCode = `function GallerySlide({ onNext }) {
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
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#800020] tracking-wide drop-shadow-sm">A Lifetime of</h2>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-rose-500 italic drop-shadow-sm">Moments</h2>
        </motion.div>

        <div className="flex flex-col md:grid md:grid-cols-4 md:grid-rows-2 gap-6 w-full mt-4">
          {photos.map((photo, i) => (
            <motion.div
              layoutId={\`gallery-img-\${photo.id}\`}
              key={photo.id}
              onClick={() => setSelectedId(photo.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (i * 0.15), duration: 0.8 }}
              className={\`relative overflow-hidden rounded-3xl border-4 border-white shadow-[0_15px_40px_rgba(255,182,193,0.6)] group cursor-pointer bg-white \${photo.span} aspect-square md:aspect-auto\`}
            >
              <div className="absolute inset-0 bg-rose-500/10 group-hover:bg-transparent transition-all duration-500 z-10 pointer-events-none" />
              <img 
                src={\`/img-\${photo.id}.jpg\`} 
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
              layoutId={\`gallery-img-\${selectedId}\`}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white p-2 rounded-2xl shadow-2xl"
            >
              <img 
                src={\`/img-\${selectedId}.jpg\`} 
                className="w-full h-full object-contain max-h-[85vh] rounded-xl"
                alt="Expanded Gallery"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}`;

content = content.replace(/function GallerySlide\(\{(.|\n)*?function ReasonsSlide/m, gallerySlideCode + '\n\nfunction ReasonsSlide');

fs.writeFileSync('src/App.jsx', content);
console.log("GallerySlide updated successfully.");
