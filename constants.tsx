
import React from 'react';
import { StampType } from './types';

export const StampIcons: Record<StampType, React.ReactNode> = {
  [StampType.STAR]: (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-black" shapeRendering="crispEdges">
      <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z" />
    </svg>
  ),
  [StampType.HEART]: (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-black" shapeRendering="crispEdges">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  [StampType.SMILEY]: (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-black" shapeRendering="crispEdges">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export const PIXEL_BG = "https://www.transparenttextures.com/patterns/pixel-weave.png";
