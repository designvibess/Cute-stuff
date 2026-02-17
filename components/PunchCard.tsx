
import React from 'react';
import { PunchCardData, StampType } from '../types';
import { StampIcons } from '../constants';

interface PunchCardProps {
  card: PunchCardData;
  onStamp: (id: string, type: StampType) => void;
  isDetailed?: boolean;
}

const PunchCard: React.FC<PunchCardProps> = ({ card, onStamp, isDetailed = false }) => {
  const slots = Array.from({ length: card.targetCount || 10 });
  const isArchived = card.status === 'Completed';

  return (
    <div 
      className={`relative p-6 rounded-none pixel-border transition-all duration-300 group
        ${isDetailed ? 'scale-105 shadow-[8px_8px_0_#000]' : 'hover:-translate-y-1 hover:shadow-[4px_4px_0_#000] cursor-pointer'}
        ${isArchived ? 'opacity-70 grayscale-[0.5]' : ''}`}
      style={{ backgroundColor: card.color }}
      onClick={() => !isDetailed && !isArchived && onStamp(card.id, card.preferredStamp)}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h3 className={`pixel-font text-black uppercase tracking-tighter drop-shadow-sm ${isDetailed ? 'text-lg' : 'text-[10px] md:text-xs'}`}>
            {card.habitName}
          </h3>
          {isDetailed && (
            <div className="flex items-center gap-1 mt-1 opacity-50">
              <div className="w-3 h-3">{StampIcons[card.preferredStamp]}</div>
              <span className="pixel-font text-[6px] text-black">STAMP STYLE</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="pixel-font text-[8px] bg-white/80 px-2 py-1 mb-1">
            {card.stamps.length}/{card.targetCount || 10}
          </span>
          {isDetailed && !isArchived && <span className="pixel-font text-[6px] text-black/50 animate-pulse">TAP TO PUNCH</span>}
          {isArchived && <span className="pixel-font text-[6px] text-pink-600 font-bold bg-white px-1">GRADUATED! 🎓</span>}
        </div>
      </div>

      <div className={`grid grid-cols-5 gap-3`}>
        {slots.map((_, idx) => {
          const slotStamp = card.stamps[idx];
          const isStamped = !!slotStamp;
          const isNextSlot = idx === card.stamps.length;
          
          return (
            <div
              key={idx}
              className={`relative aspect-square w-full flex items-center justify-center border-4 border-black/10
                ${isStamped ? 'bg-white shadow-[2px_2px_0_rgba(0,0,0,0.1)]' : 'bg-black/5'}
                ${isNextSlot && isDetailed && !isArchived ? 'animate-pulse bg-white/30 border-white/50' : ''}
                ${!isStamped && isDetailed && isNextSlot && !isArchived ? 'hover:bg-white/50 cursor-pointer scale-105' : ''}
                transition-transform
              `}
              onClick={(e) => {
                if (isDetailed && isNextSlot && !isArchived) {
                  e.stopPropagation();
                  onStamp(card.id, card.preferredStamp);
                }
              }}
            >
              {isStamped ? (
                <div className="w-3/4 h-3/4 animate-bounce">
                  {StampIcons[slotStamp]}
                </div>
              ) : (
                isDetailed && isNextSlot && !isArchived && (
                  <div className="w-1/2 h-1/2 opacity-10">
                    {StampIcons[card.preferredStamp]}
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>
      
      {card.stamps.length === 0 && !isDetailed && !isArchived && (
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="pixel-font text-[8px] text-black bg-white px-2 py-1 shadow-[2px_2px_0_#000]">GO TO WORK</span>
        </div>
      )}
      
      <div className="absolute top-1 left-1 w-2 h-2 bg-white/30"></div>
      <div className="absolute top-1 right-1 w-2 h-2 bg-white/30"></div>
      <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/30"></div>
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/30"></div>
    </div>
  );
};

export default PunchCard;
