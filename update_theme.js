import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add FallingHearts component at the top (after imports)
const fallingHeartsComponent = `
function FallingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <import_motion.div
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
        </import_motion.div>
      ))}
    </div>
  );
}
`.replace(/import_motion/g, 'motion');

content = content.replace(/import \{ motion, AnimatePresence.*?from 'framer-motion';/, "import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';\n" + fallingHeartsComponent);

// 2. Inject FallingHearts into App and change App container background
content = content.replace(/<div className="relative w-full h-screen bg-\[\#050505\] text-white overflow-hidden font-sans">/, '<div className="relative w-full h-screen bg-gradient-to-br from-peach via-pink-100 to-peach text-[#800020] overflow-hidden font-sans">\n      <FallingHearts />');

// 3. Replace all slide dark backgrounds with transparent or peach/pink gradients
content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-transparent');
content = content.replace(/bg-\[\#0B0C10\]/g, 'bg-transparent');
content = content.replace(/bg-\[\#030101\]/g, 'bg-transparent');
content = content.replace(/bg-\[\#150a0a\]/g, 'bg-transparent');
content = content.replace(/bg-gradient-to-b from-\[\#0a0a0a\].*?to-\[\#0a0a0a\]/g, 'bg-transparent');

// 4. Replace text colors and borders
content = content.replace(/text-white/g, 'text-[#800020]');
content = content.replace(/text-white\/80/g, 'text-[#800020]/80');
content = content.replace(/text-white\/60/g, 'text-[#800020]/60');
content = content.replace(/text-gold/g, 'text-rose-600');
content = content.replace(/border-gold/g, 'border-rose-400');
content = content.replace(/border-gold\/([0-9]+)/g, 'border-rose-400/$1');
content = content.replace(/text-gold\/([0-9]+)/g, 'text-rose-600/$1');
content = content.replace(/bg-gold/g, 'bg-rose-400');
content = content.replace(/from-gold/g, 'from-rose-500');
content = content.replace(/to-yellow-700/g, 'to-pink-600');
content = content.replace(/to-yellow-600/g, 'to-pink-500');

// 5. Replace specific cinematic colors in EntranceSlide
content = content.replace(/from-\[\#2a0800\] via-\[\#0a0200\] to-\[\#030101\]/g, 'from-pink-200 via-peach to-pink-100');
content = content.replace(/from-yellow-900\/20 via-red-900\/5/g, 'from-pink-300/30 via-peach/20');
content = content.replace(/from-black to-\[\#2a0800\]/g, 'from-rose-500 to-rose-700');
content = content.replace(/from-black to-\[\#00102a\]/g, 'from-blue-400 to-blue-600');
content = content.replace(/from-black via-black\/80/g, 'from-pink-300 via-pink-200/80');

// 6. Fix specific dark UI elements that are illegible on a light background
content = content.replace(/bg-black\/40/g, 'bg-white/40');
content = content.replace(/bg-black\/50/g, 'bg-white/50');
content = content.replace(/bg-black\/80/g, 'bg-white/80');
content = content.replace(/bg-black\/90/g, 'bg-white/90');
content = content.replace(/bg-black/g, 'bg-white/20');
content = content.replace(/border-white\/10/g, 'border-rose-300/50');
content = content.replace(/border-white\/20/g, 'border-rose-300');
content = content.replace(/shadow-\[0_0_20px_#D4AF37\]/g, 'shadow-[0_0_20px_#FFB6C1]');
content = content.replace(/shadow-\[0_0_15px_#D4AF37\]/g, 'shadow-[0_0_15px_#FFB6C1]');

fs.writeFileSync('src/App.jsx', content);
console.log("App.jsx updated with light theme.");
