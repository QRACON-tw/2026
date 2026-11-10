import type { Session, SessionType } from '../types/agenda';
import { site } from './site';

const DAY = site.date;
const at = (hhmm: string) => `${DAY}T${hhmm}:00+08:00`;

type Draft = Omit<Session, 'start' | 'end' | 'speakerIds' | 'tags'> & {
  from: string;
  to: string;
  speakers?: string[];
};

// 逐格轉錄自 2026-11-07 議程草案（public/2026_QRACON_Agenda.jpg）。
// 標題照原文；草案上的括號備註（暫定、?）移到 note，原文留在各場次註解。
const drafts: Draft[] = [
  {
    id: 'check-in',
    title: '報到',
    type: 'break',
    from: '08:00',
    to: '09:00',
    rooms: ['hall', 'key'],
  },
  {
    id: 'opening',
    title: '開幕',
    type: 'plenary',
    from: '09:00',
    to: '09:15',
    rooms: ['hall', 'key'],
  },
  {
    id: 'opening-kickoff',
    title: '量子冒險啟程',
    type: 'activity',
    from: '09:15',
    to: '09:30',
    rooms: ['hall', 'key'],
  },
  {
    id: 'keynote-dialogue',
    title: '開場嘉賓對談：量子計算如何影響我們的未來',
    type: 'keynote',
    from: '09:30',
    to: '10:00',
    rooms: ['hall', 'key'],
    speakers: ['ke-zhong-ting'],
    note: '與談人與主持人待公布。',
    // 原文：柯忠廷｜?｜主持人?
  },
  {
    id: 'poster',
    title: '【海報展示】量子論壇各主題與相關資料',
    type: 'exhibit',
    from: '08:00',
    to: '13:45',
    rooms: ['room1'],
    note: '海報展示，自由參觀。',
  },
  {
    id: 'quantum-annealing',
    title: '量子退火介紹及應用',
    type: 'talk',
    from: '10:10',
    to: '10:40',
    rooms: ['hall', 'key'],
    speakers: ['ou-jia-he'],
  },
  {
    id: 'hs-intro',
    title: '量子科普 for 高中生',
    type: 'talk',
    from: '11:00',
    to: '11:30',
    rooms: ['key'],
    note: '講題暫定。',
    // 原文：量子科普 for 高中生（暫定）／講者 ?
  },
  {
    id: 'talk-ke-zhong-ting',
    title: '柯忠廷｜講題待公布',
    type: 'talk',
    from: '11:00',
    to: '11:30',
    rooms: ['hall'],
    speakers: ['ke-zhong-ting'],
    // 原文：（?）柯忠廷
  },
  {
    id: 'taiwan-qc-research',
    title: '台灣量子電腦之研究方向與產業佈局',
    type: 'keynote',
    from: '11:45',
    to: '12:15',
    rooms: ['hall', 'key'],
    note: '講題暫定。',
    // 原文：台灣量子電腦之研究方向與產業佈局（暫定）／講者 ?
  },
  {
    id: 'lunch',
    title: '午餐',
    type: 'break',
    from: '12:15',
    to: '12:45',
    rooms: ['hall', 'key'],
  },
  {
    id: 'lunch-games',
    title: '午餐 + 場外遊戲開放',
    type: 'break',
    from: '12:45',
    to: '13:45',
    rooms: ['hall', 'key'],
  },
  {
    id: 'error-correction',
    title: '量子錯誤更正',
    type: 'talk',
    from: '13:45',
    to: '14:15',
    rooms: ['hall'],
    speakers: ['guo-gao-yue'],
  },
  {
    id: 'quantum-journey',
    title: '量子之旅：學習量子心路歷程',
    type: 'talk',
    from: '13:45',
    to: '14:15',
    rooms: ['key'],
    speakers: ['zhang-ren-yu'],
  },
  {
    id: 'quantum-forum',
    title: '量子論壇',
    type: 'roundtable',
    from: '13:45',
    to: '15:00',
    rooms: ['room1'],
  },
  {
    id: 'workshop-1',
    title: 'NVIDIA 量子電腦工作坊 1',
    type: 'workshop',
    from: '13:45',
    to: '15:00',
    rooms: ['multi2'],
    speakers: ['nvidia'],
  },
  {
    id: 'talk-huang-yi-de',
    title: '黃亦得｜講題待公布',
    type: 'talk',
    from: '14:30',
    to: '15:00',
    rooms: ['hall'],
    speakers: ['huang-yi-de'],
    // 原文：（?）黃亦得
  },
  {
    id: 'quantum-games',
    title: '從遊戲認識量子：量子計算與通訊的互動學習',
    type: 'talk',
    from: '14:30',
    to: '15:00',
    rooms: ['key'],
    speakers: ['guo-shu-yu'],
  },
  {
    id: 'quantum-compilers',
    title: '量子軟體編譯與電子設計自動化',
    type: 'talk',
    from: '15:15',
    to: '15:45',
    rooms: ['hall'],
    speakers: ['jiang-jie-hong'],
  },
  {
    id: 'drug-discovery',
    title: '量子 in 藥物開發／分子模擬',
    type: 'talk',
    from: '15:15',
    to: '15:45',
    rooms: ['key'],
    note: '講題暫定。',
    // 原文：量子 in 藥物開發／分子模擬（暫定）／講者 ?
  },
  {
    id: 'free-chat',
    title: '自由交流',
    type: 'break',
    from: '15:15',
    to: '16:30',
    rooms: ['room1'],
  },
  {
    id: 'workshop-2',
    title: 'NVIDIA 量子電腦工作坊 2',
    type: 'workshop',
    from: '15:15',
    to: '16:30',
    rooms: ['multi2'],
    speakers: ['nvidia'],
  },
  {
    id: 'industry-and-study',
    title: '量子產業／升學 現況與未來',
    type: 'talk',
    from: '16:00',
    to: '16:30',
    rooms: ['hall'],
    speakers: ['zhang-ren-wei'],
  },
  {
    id: 'quantum-radar',
    title: '量子雷達',
    type: 'talk',
    from: '16:00',
    to: '16:30',
    rooms: ['key'],
    speakers: ['huang-cong-wei'],
  },
  {
    id: 'closing',
    title: '閉幕',
    type: 'plenary',
    from: '16:45',
    to: '17:15',
    rooms: 'all',
    note: '全體會眾至兩大演講廳參加閉幕。',
  },
  { id: 'departure', title: '賦歸', type: 'break', from: '17:15', to: '17:30', rooms: 'all' },
];

export const sessions: Session[] = drafts.map(({ from, to, speakers, ...rest }) => ({
  ...rest,
  start: at(from),
  end: at(to),
  speakerIds: speakers ?? [],
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
  roundtable: '論壇',
  activity: '活動',
  exhibit: '展示',
  screening: '放映',
  break: '休息',
};

export const isListed = (s: Session) => s.type !== 'break';
export const canBookmark = (s: Session) =>
  isListed(s) && s.rooms !== 'all' && s.type !== 'plenary';

export const phases = [
  { id: 'phase-arrival', label: '報到與開場', from: '08:00', to: '10:10' },
  { id: 'phase-morning', label: '上午分軌', from: '10:10', to: '12:15' },
  { id: 'phase-noon', label: '午間', from: '12:15', to: '13:45' },
  { id: 'phase-afternoon', label: '下午分軌', from: '13:45', to: '16:45' },
  { id: 'phase-closing', label: '閉幕與賦歸', from: '16:45', to: '17:30' },
] as const;
