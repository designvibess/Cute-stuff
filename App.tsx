
import React, { useState, useEffect, useCallback } from 'react';
import { PunchCardData, StampType } from './types';
import PunchCard from './components/PunchCard';
import AddCardModal from './components/AddCardModal';
import CelebrationModal from './components/CelebrationModal';
import { getBestiePepTalk } from './services/geminiService';
import { playStampSound, playGraduationSound } from './services/audioService';

const App: React.FC = () => {
  const [cards, setCards] = useState<PunchCardData[]>(() => {
    const saved = localStorage.getItem('punchcards');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.map((c: any) => ({
      ...c,
      preferredStamp: c.preferredStamp || StampType.HEART,
      targetCount: c.targetCount || 10,
      stamps: c.stamps || []
    }));
  });
  
  const [graduationStreak, setGraduationStreak] = useState<number>(() => {
    const saved = localStorage.getItem('graduationStreak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [celebratingCard, setCelebratingCard] = useState<PunchCardData | null>(null);
  const [enlargedCardId, setEnlargedCardId] = useState<string | null>(null);
  const [pepTalk, setPepTalk] = useState<string>("Hi bestie! Ready to conquer the world?");
  const [isLoadingPepTalk, setIsLoadingPepTalk] = useState(false);

  useEffect(() => {
    localStorage.setItem('punchcards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('graduationStreak', graduationStreak.toString());
  }, [graduationStreak]);

  const refreshPepTalk = useCallback(async () => {
    setIsLoadingPepTalk(true);
    const talk = await getBestiePepTalk(cards);
    setPepTalk(talk);
    setIsLoadingPepTalk(false);
  }, [cards]);

  useEffect(() => {
    refreshPepTalk();
  }, []);

  const handleAddCard = (name: string, color: string, stamp: StampType, targetCount: number) => {
    const newCard: PunchCardData = {
      id: crypto.randomUUID(),
      habitName: name,
      color,
      stamps: [],
      targetCount,
      preferredStamp: stamp,
      status: 'Active',
      lastUpdated: Date.now(),
    };
    setCards([...cards, newCard]);
    setShowAddModal(false);
  };

  const handleStamp = (id: string, type: StampType) => {
    playStampSound();
    setCards(prev => prev.map(card => {
      if (card.id === id && card.stamps.length < (card.targetCount || 10)) {
        const newStamps = [...card.stamps, type];
        if (newStamps.length === (card.targetCount || 10)) {
          playGraduationSound();
          setCelebratingCard({ ...card, stamps: newStamps, status: 'Completed' });
          setGraduationStreak(s => s + 1);
          setEnlargedCardId(null);
        }
        return { ...card, stamps: newStamps, lastUpdated: Date.now() };
      }
      return card;
    }));
  };

  const finishCelebration = () => {
    if (celebratingCard) {
      setCards(prev => prev.map(c => 
        c.id === celebratingCard.id ? { ...c, status: 'Completed' as const } : c
      ));
      setCelebratingCard(null);
      refreshPepTalk();
    }
  };

  const activeEnlargedCard = cards.find(c => c.id === enlargedCardId);
  const activeCards = cards.filter(c => c.status === 'Active');
  const archivedCards = cards.filter(c => c.status === 'Completed').sort((a,b) => b.lastUpdated - a.lastUpdated);

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-6xl mx-auto flex flex-col">
      <header className="pt-12 pb-8 flex flex-col md:flex-row justify-between items-start gap-6 w-full">
        <div className="text-left">
          <h1 className="pixel-font text-xl md:text-2xl text-pink-600 drop-shadow-[2px_2px_0_#000] mb-2 text-left">
            What, like it's hard?
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-pink-400 text-xl animate-sparkle">✨</span>
              <p className="text-gray-600 font-medium italic">Your daily micro-goals boutique</p>
            </div>
            {graduationStreak > 0 && (
              <div className="flex items-center gap-2 bg-gold-500 bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]">
                <span className="text-lg">🏆</span>
                <span className="pixel-font text-[10px] text-[#8A6D0F] uppercase">{graduationStreak} GRADUATED</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={() => setShowArchive(!showArchive)}
            className="group relative pixel-button flex-1 md:flex-none"
          >
              <div className={`p-4 pixel-border flex items-center justify-center pixel-font text-[10px] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${showArchive ? 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300' : 'bg-white text-gray-800 hover:bg-gray-50'}`}>
                  {showArchive ? 'GO BACK' : 'THE ARCHIVE'}
              </div>
          </button>
          
          <button 
            onClick={() => { setShowAddModal(true); setShowArchive(false); }}
            className="group relative pixel-button flex-1 md:flex-none"
          >
              <div className="bg-pink-500 text-white p-4 pixel-border flex items-center justify-center pixel-font text-[10px] hover:bg-pink-600 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
                  OPEN NEW CARD
              </div>
          </button>
        </div>
      </header>

      {!showArchive && (
        <section className="mb-12 w-full">
          <div className="bg-white p-6 pixel-border relative overflow-hidden group hover:bg-pink-50 transition-colors w-full">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                  <span className="text-4xl">💅</span>
              </div>
              <div className="flex items-start gap-4 text-left">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex-shrink-0 flex items-center justify-center border-2 border-pink-500">
                      <span className="text-2xl">👩‍⚖️</span>
                  </div>
                  <div className="flex-1">
                      <h3 className="pixel-font text-[8px] text-pink-400 mb-1 uppercase">Bestie Pep Talk</h3>
                      <p className={`text-lg font-medium text-gray-800 italic leading-relaxed ${isLoadingPepTalk ? 'animate-pulse' : ''}`}>
                          "{pepTalk}"
                      </p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); refreshPepTalk(); }}
                    className="pixel-font text-[8px] text-pink-300 hover:text-pink-500 self-center"
                  >
                    REFRESH
                  </button>
              </div>
          </div>
        </section>
      )}

      <main className="w-full">
        {showArchive ? (
          <div className="space-y-8">
             <div className="flex items-center justify-between border-b-4 border-black pb-4">
                <h2 className="pixel-font text-lg text-black uppercase">THE ARCHIVE</h2>
                <span className="pixel-font text-[8px] text-gray-500 uppercase">{archivedCards.length} GRADUATES</span>
             </div>
             {archivedCards.length === 0 ? (
                <div className="py-20 text-center bg-gray-50 pixel-border border-dashed w-full">
                   <p className="pixel-font text-[10px] text-gray-400">No cards in storage. Keep studying, bestie!</p>
                </div>
             ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {archivedCards.map(card => (
                    <PunchCard 
                      key={card.id} 
                      card={card} 
                      onStamp={() => {}} 
                    />
                  ))}
                </div>
             )}
          </div>
        ) : (
          activeCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-4 border-dashed border-pink-200 rounded-xl bg-white/50 w-full">
              <div className="text-6xl mb-4 animate-float">🐕</div>
              <p className="pixel-font text-xs text-pink-300 text-center px-4">Nothing in your shopping bag yet!</p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="mt-6 text-pink-500 pixel-font text-[10px] underline underline-offset-4 hover:text-pink-700 uppercase"
              >
                CREATE YOUR FIRST HABIT
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {activeCards.map(card => (
                <PunchCard 
                  key={card.id} 
                  card={card} 
                  onStamp={() => setEnlargedCardId(card.id)} 
                />
              ))}
            </div>
          )
        )}
      </main>

      {enlargedCardId && activeEnlargedCard && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setEnlargedCardId(null)}>
          <div className="max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="mb-4 text-center">
              <span className="pixel-font text-white text-[10px] bg-black/50 px-3 py-1 rounded">WORK IN PROGRESS</span>
            </div>
            <PunchCard 
              card={activeEnlargedCard} 
              onStamp={handleStamp} 
              isDetailed={true} 
            />
            <button 
              onClick={() => setEnlargedCardId(null)}
              className="w-full mt-6 pixel-font text-[10px] text-white py-4 bg-gray-800 pixel-border hover:bg-gray-700 transition-colors"
            >
              CLOSE WORK VIEW
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <AddCardModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={handleAddCard} 
        />
      )}
      
      {celebratingCard && (
        <CelebrationModal 
          habitName={celebratingCard.habitName} 
          onClose={finishCelebration} 
        />
      )}

      <div className="fixed top-10 right-10 pointer-events-none text-3xl animate-sparkle opacity-20">✨</div>
      <div className="fixed bottom-10 left-10 pointer-events-none text-3xl animate-sparkle opacity-20" style={{animationDelay: '1s'}}>💖</div>
    </div>
  );
};

export default App;
