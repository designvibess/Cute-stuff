
import React from 'react';

interface CelebrationModalProps {
  habitName: string;
  onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ habitName, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/95 backdrop-blur-lg overflow-hidden">
      <div className="text-center space-y-10 w-full max-w-lg flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center">
            <div className="pixel-font text-5xl md:text-7xl animate-bounce mb-4 text-pink-500 drop-shadow-[6px_6px_0_#000] tracking-tighter text-center w-full">
              GRADUATED!
            </div>
            <div className="absolute -top-16 -left-8 md:-left-16 text-4xl md:text-6xl animate-sparkle">✨</div>
            <div className="absolute -bottom-16 -right-8 md:-right-16 text-4xl md:text-6xl animate-sparkle" style={{animationDelay: '0.2s'}}>💝</div>
            <div className="absolute top-1/2 -right-16 md:-right-24 text-3xl md:text-4xl animate-float">🎓</div>
        </div>
        
        <div className="space-y-6 flex flex-col items-center w-full">
          <p className="pixel-font text-xl md:text-2xl text-black break-words px-4">"{habitName}"</p>
          <div className="bg-pink-100 p-4 border-2 border-pink-500 inline-block">
             <p className="text-2xl md:text-3xl font-bold text-pink-600 italic">What, like it's hard?</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="pixel-font text-xs p-6 bg-gold-500 bg-[#D4AF37] text-white pixel-border hover:scale-105 transition-transform w-full shadow-[8px_8px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none max-w-xs uppercase"
        >
          THANK U, NEXT!
        </button>
      </div>
      
      {/* Visual Pixel Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => {
          const colors = ['#FF85A1', '#FF007F', '#FFC2D1', '#D4AF37', '#FFFFFF'];
          return (
            <div
              key={i}
              className="absolute"
              style={{
                top: '-20px',
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                animation: `fall ${1.5 + Math.random() * 2.5}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CelebrationModal;
