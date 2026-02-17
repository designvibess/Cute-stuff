
import React, { useState } from 'react';
import { ELLE_PALETTE, StampType } from '../types';
import { StampIcons } from '../constants';

interface AddCardModalProps {
  onClose: () => void;
  onAdd: (name: string, color: string, stamp: StampType, targetCount: number) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(ELLE_PALETTE[0].hex);
  const [selectedStamp, setSelectedStamp] = useState(StampType.HEART);
  const [targetCount, setTargetCount] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name, selectedColor, selectedStamp, targetCount);
    }
  };

  const targetOptions = [5, 10, 15, 20, 25, 30];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-500/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md pixel-border p-6 animate-float">
        <h2 className="pixel-font text-lg text-pink-600 mb-6 text-center">Boutique Phase</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block pixel-font text-[10px] mb-2">Habit Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Study LSATs"
              className="w-full p-3 border-4 border-pink-200 focus:border-pink-500 outline-none font-medium"
              maxLength={20}
              required
            />
          </div>

          <div>
            <label className="block pixel-font text-[10px] mb-2">Shopping Trip Length</label>
            <div className="flex flex-wrap gap-2">
              {targetOptions.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setTargetCount(count)}
                  className={`flex-1 py-2 pixel-border pixel-font text-[8px] transition-all
                    ${targetCount === count ? 'bg-pink-500 text-white' : 'bg-white text-gray-400 hover:bg-pink-50'}`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block pixel-font text-[10px] mb-2">Card Color</label>
            <div className="flex gap-4">
              {ELLE_PALETTE.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-10 h-10 pixel-border ${c.bg} transition-all ${selectedColor === c.hex ? 'ring-4 ring-pink-500 ring-offset-2 scale-110' : 'hover:scale-105'}`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block pixel-font text-[10px] mb-2">Signature Stamp</label>
            <div className="flex gap-4">
              {(Object.keys(StampIcons) as StampType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedStamp(type)}
                  className={`w-12 h-12 flex items-center justify-center p-2 pixel-border transition-all bg-white
                    ${selectedStamp === type 
                      ? 'ring-4 ring-pink-500 ring-offset-2 bg-pink-100 scale-110 border-pink-500' 
                      : 'hover:bg-gray-50 hover:scale-105 border-gray-200'}`}
                >
                  <div className="w-8 h-8">
                     {StampIcons[type]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 pixel-font text-[10px] p-3 bg-gray-200 text-gray-700 border-4 border-gray-300 hover:bg-gray-300 transition-all"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 pixel-font text-[10px] p-3 bg-pink-500 text-white hover:bg-pink-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              FINALIZE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
