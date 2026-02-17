
export enum StampType {
  STAR = 'STAR',
  HEART = 'HEART',
  SMILEY = 'SMILEY'
}

export interface PunchCardData {
  id: string;
  habitName: string;
  color: string;
  stamps: StampType[];
  targetCount: number; // New: Number of stamps required (5-30)
  preferredStamp: StampType;
  status: 'Active' | 'Completed';
  lastUpdated: number;
}

export interface ColorOption {
  name: string;
  hex: string;
  bg: string;
  border: string;
}

export const ELLE_PALETTE: ColorOption[] = [
  { name: 'Bubblegum', hex: '#FF85A1', bg: 'bg-[#FF85A1]', border: 'border-[#FF85A1]' },
  { name: 'Magenta', hex: '#FF007F', bg: 'bg-[#FF007F]', border: 'border-[#FF007F]' },
  { name: 'Pastel Pink', hex: '#FFC2D1', bg: 'bg-[#FFC2D1]', border: 'border-[#FFC2D1]' },
  { name: 'Gold', hex: '#D4AF37', bg: 'bg-[#D4AF37]', border: 'border-[#D4AF37]' },
];
