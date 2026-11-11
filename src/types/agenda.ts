export type SessionType =
  | 'plenary'
  | 'keynote'
  | 'talk'
  | 'rerun'
  | 'lightning'
  | 'workshop'
  | 'submission'
  | 'debate'
  | 'roundtable'
  | 'activity'
  | 'exhibit'
  | 'screening'
  | 'break';

export type RoomKind = 'hall' | 'center' | 'meeting' | 'outdoor';

export interface Room {
  id: RoomId;
  
  name: string;
  
  short: string;
  kind: RoomKind;
  capacity?: number;
}

export type RoomId = 'hall' | 'key' | 'room1' | 'multi2';

export interface Session {
  
  id: string;
  title: string;
  type: SessionType;
  
  start: string;
  end: string;
  
  rooms: RoomId[] | 'all';
  speakerIds: string[];
  tags: string[];
  
  abstract?: string;
  keywords?: string[];
  
  note?: string;
  slidesUrl?: string;
  videoUrl?: string;
}
