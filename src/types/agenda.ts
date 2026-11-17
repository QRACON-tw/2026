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
  | 'break'
  | 'departure';

export type RoomKind = 'hall' | 'center' | 'meeting' | 'outdoor' | 'cafe';

export interface Room {
  id: RoomId;
  
  name: string;
  
  short: string;
  kind: RoomKind;
  capacity?: number;
}

export type RoomId = 'hall' | 'key' | 'multi1' | 'multi2' | 'multi3' | 'cafe';

export interface Session {
  
  id: string;
  title: string;
  type: SessionType;
  
  start: string;
  end: string;
  
  rooms: RoomId[] | 'all';
  speakerIds: string[];
  tags: string[];
  /** Keep space activities on the timetable without generating an empty detail page. */
  detailPage?: boolean;
  
  abstract?: string;
  keywords?: string[];
  
  note?: string;
  slidesUrl?: string;
  videoUrl?: string;
}
