import type { Session, SessionType } from '../types/agenda';
import { site } from './site';

const DAY = site.date;
const at = (hhmm: string) => `${DAY}T${hhmm}:00+08:00`;

type Draft = Omit<Session, 'start' | 'end' | 'speakerIds' | 'tags'> & {
  from: string;
  to: string;
};

const drafts: Draft[] = [
  { id: 'check-in', title: '報到', type: 'break', from: '08:00', to: '09:00', rooms: 'all' },
  { id: 'opening', title: '開幕', type: 'plenary', from: '09:00', to: '09:20', rooms: 'all' },
  {
    id: 'keynote-dialogue',
    title: '開場嘉賓對談：量子計算如何影響我們的未來',
    type: 'keynote',
    from: '09:20',
    to: '09:50',
    rooms: ['hall', 'key', 'multi12'],
    note: '開場嘉賓對談，主持人與與談人待公布。',
  },
  {
    id: 'keynote',
    title: '進入 2027 的量子世界',
    type: 'keynote',
    from: '10:00',
    to: '10:30',
    rooms: ['hall', 'key', 'multi12'],
  },

  {
    id: 'poster-journey',
    title: '【海報展示】量子之旅—學習量子心路歷程',
    type: 'exhibit',
    from: '09:20',
    to: '13:30',
    rooms: ['multi3'],
    note: '海報展示，自由參觀。',
  },
  {
    id: 'poster-debate',
    title: '【海報展示】量子辯論各主題與相關資料',
    type: 'exhibit',
    from: '09:20',
    to: '13:30',
    rooms: ['room1'],
    note: '海報展示，自由參觀。',
  },

  { id: 'qc-basics', title: '量子電腦基礎簡介', type: 'talk', from: '10:50', to: '11:20', rooms: ['hall'] },
  { id: 'quantum-annealing', title: '量子退火介紹及應用', type: 'talk', from: '10:50', to: '11:20', rooms: ['key'] },
  { id: 'hs-intro', title: '量子科普 for 高中生', type: 'talk', from: '10:50', to: '11:20', rooms: ['multi12'] },

  { id: 'enterprise-strategy', title: '企業量子應用與佈局', type: 'talk', from: '11:30', to: '12:00', rooms: ['hall'] },
  { id: 'quantum-ai', title: '量子 & AI', type: 'talk', from: '11:30', to: '12:00', rooms: ['key'] },
  { id: 'sampling', title: '量子計算與抽樣', type: 'talk', from: '11:30', to: '12:00', rooms: ['multi12'] },

  {
    id: 'lunch',
    title: '午餐',
    type: 'break',
    from: '12:00',
    to: '13:30',
    rooms: ['hall', 'key', 'multi12'],
  },

  {
    id: 'industry-and-study',
    title: '量子產業／升學 現況與未來',
    type: 'talk',
    from: '13:30',
    to: '14:00',
    rooms: ['hall', 'key'],
  },
  {
    id: 'quantum-journey',
    title: '量子之旅—學習量子心路歷程',
    type: 'talk',
    from: '13:30',
    to: '14:00',
    rooms: ['multi12'],
  },
  { id: 'workshop-1', title: '量子電腦工作坊 1', type: 'workshop', from: '13:30', to: '15:30', rooms: ['multi3'] },
  { id: 'debate-1', title: '量子辯論 1', type: 'debate', from: '13:30', to: '14:00', rooms: ['room1'] },

  { id: 'taiwan-qc-research', title: '台灣量子電腦研究方向', type: 'talk', from: '14:15', to: '14:45', rooms: ['hall'] },
  { id: 'hpc-quantum', title: '量子 & HPC', type: 'talk', from: '14:15', to: '14:45', rooms: ['key'] },
  { id: 'photonic-materials', title: '光電材料 & 量子通訊與計算', type: 'talk', from: '14:15', to: '14:45', rooms: ['multi12'] },
  { id: 'debate-2', title: '量子辯論 2', type: 'debate', from: '14:15', to: '14:45', rooms: ['room1'] },

  { id: 'quantum-security', title: '量子 & 資安的發展與現況', type: 'talk', from: '15:00', to: '15:30', rooms: ['hall'] },
  { id: 'drug-discovery', title: '量子 in 藥物開發／分子模擬', type: 'talk', from: '15:00', to: '15:30', rooms: ['key'] },
  { id: 'quantum-sensing', title: '量子感測研究成果', type: 'talk', from: '15:00', to: '15:30', rooms: ['multi12'] },
  { id: 'debate-3', title: '量子辯論 3', type: 'debate', from: '15:00', to: '15:30', rooms: ['room1'] },

  {
    id: 'rerun-qc-basics',
    title: '重播：量子電腦基礎簡介',
    type: 'rerun',
    from: '15:30',
    to: '16:00',
    rooms: ['hall'],
    note: '原場次重播。',
  },
  {
    id: 'rerun-quantum-annealing',
    title: '重播：量子退火介紹及應用',
    type: 'rerun',
    from: '15:30',
    to: '16:00',
    rooms: ['key'],
    note: '原場次重播。',
  },
  {
    id: 'rerun-hs-intro',
    title: '重播：量子科普 for 高中生',
    type: 'rerun',
    from: '15:30',
    to: '16:00',
    rooms: ['multi12'],
    note: '原場次重播。',
  },
  { id: 'workshop-2', title: '量子電腦工作坊 2', type: 'workshop', from: '15:30', to: '16:00', rooms: ['multi3'] },

  {
    id: 'rerun-enterprise-strategy',
    title: '重播：企業量子應用與佈局',
    type: 'rerun',
    from: '16:00',
    to: '16:30',
    rooms: ['hall'],
    note: '原場次重播。',
  },
  {
    id: 'rerun-quantum-ai',
    title: '重播：量子 & AI',
    type: 'rerun',
    from: '16:00',
    to: '16:30',
    rooms: ['key'],
    note: '原場次重播。',
  },
  {
    id: 'rerun-sampling',
    title: '重播：量子計算與抽樣',
    type: 'rerun',
    from: '16:00',
    to: '16:30',
    rooms: ['multi12'],
    note: '原場次重播。',
  },

  {
    id: 'free-chat',
    title: '自由交流',
    type: 'break',
    from: '16:00',
    to: '16:30',
    rooms: ['multi3', 'room1'],
  },

  {
    id: 'closing',
    title: '閉幕',
    type: 'plenary',
    from: '16:30',
    to: '17:00',
    rooms: 'all',
    note: '全體會眾至三大演講廳參加閉幕。',
  },
  { id: 'departure', title: '賦歸', type: 'break', from: '17:00', to: '17:30', rooms: 'all' },
];

export const sessions: Session[] = drafts.map(({ from, to, ...rest }) => ({
  ...rest,
  start: at(from),
  end: at(to),
  speakerIds: [],
  tags: [],
}));

export const typeLabels: Record<SessionType, string> = {
  plenary: '典禮',
  keynote: '主題演講',
  talk: '演講',
  rerun: '重播',
  lightning: '閃電講',
  workshop: '工作坊',
  submission: '學生投稿',
  debate: '辯論',
  roundtable: '桌長',
  activity: '活動',
  exhibit: '展示',
  screening: '放映',
  break: '休息',
};

export const isListed = (s: Session) => s.type !== 'break';
export const canBookmark = (s: Session) => isListed(s) && s.rooms !== 'all';

export const phases = [
  { id: 'phase-arrival', label: '報到與開幕', from: '08:00', to: '10:50' },
  { id: 'phase-morning', label: '上午分軌', from: '10:50', to: '12:00' },
  { id: 'phase-noon', label: '午間', from: '12:00', to: '13:30' },
  { id: 'phase-afternoon', label: '下午分軌', from: '13:30', to: '16:30' },
  { id: 'phase-closing', label: '閉幕與賦歸', from: '16:30', to: '17:30' },
] as const;
