import type { Session, SessionType } from '../types/agenda';
import { site } from './site';

const DAY = site.date;
const at = (hhmm: string) => `${DAY}T${hhmm}:00+08:00`;

type Draft = Omit<Session, 'start' | 'end' | 'speakerIds' | 'tags'> & {
  from: string;
  to: string;
  speakers?: string[];
};

// 逐格轉錄自「議程表 - 更新 1110」試算表（2026-11-10）：
// https://docs.google.com/spreadsheets/d/1fpkpSfhEPo5EH7iVfdfQhRpGMlQezFUQc2ZKlPb0MNg/edit#gid=423741764
// 只取公開海報也有的四個場地欄位；休息、含移動的休息與移動至閉幕場所照表列。
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
    abstract:
      '特邀兩位量子計算領域的理論派與實驗派代表學者，共同探討量子計算將如何影響我們的未來。一位從量子資訊與演算法出發，推演量子計算的潛力與極限；一位站在實驗室第一線，面對把量子位元真正做出來、穩定運作的種種挑戰。兩種視角將在對談中交會，帶領同學看見量子計算從紙上理論走進現實的完整樣貌。',
    // 原文：柯忠廷｜?｜主持人?
  },
  {
    id: 'break-1000',
    title: '休息',
    type: 'break',
    from: '10:00',
    to: '10:10',
    rooms: ['hall', 'key'],
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
    id: 'break-1040',
    title: '休息（含移動）',
    type: 'break',
    from: '10:40',
    to: '11:00',
    rooms: ['hall', 'key'],
  },
  {
    id: 'quantum-basics',
    title: '黃靜瑜｜講題待公布',
    type: 'talk',
    from: '11:00',
    to: '11:30',
    rooms: ['key'],
    speakers: ['huang-jing-yu'],
    // 依最新議程修訂：講者為黃靜瑜，講題待公布。
  },
  {
    id: 'talk-ke-zhong-ting',
    title: '超導量子電腦的進展與未來展望：揭開低溫腔體裡的晶片物理',
    type: 'talk',
    from: '11:00',
    to: '11:30',
    rooms: ['hall'],
    speakers: ['ke-zhong-ting'],
    abstract:
      '超導量子計算正從實驗室驗證邁向可擴展的實用時代。要實現容錯量子計算，核心關鍵在於打造極低損耗的高同調量子位元。本演講將帶領大家走入稀釋冷凍機的毫開爾文（mK）極低溫世界，揭開超導晶片的真實物理：從微奈米約瑟夫森接面製程、材料介電損耗與準粒子污染的抑制，到多位元微波調控的工程挑戰。最後，我們將分享結合 AI 自動化與強化學習的方式進行量子位元校正與邏輯閘最佳化。',
    keywords: ['超導量子位元', '約瑟夫森結', '高同調位元', 'AI-量測'],
    // 11/07 原文：（?）柯忠廷；11/10 原文：講題待定／柯忠廷
  },
  {
    id: 'break-1130',
    title: '休息',
    type: 'break',
    from: '11:30',
    to: '11:45',
    rooms: ['hall', 'key'],
  },
  {
    id: 'high-speed-computing',
    title: '量子高速運算',
    type: 'keynote',
    from: '11:45',
    to: '12:15',
    rooms: ['hall', 'key'],
    speakers: ['li-tai-yue'],
    // 11/07 原文：台灣量子電腦之研究方向與產業佈局（暫定）／講者 ?；11/10 換題換講者。
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
    abstract:
      '探討量子穩定碼與解碼技術。由於量子態極易隨時間退相干，我們透過量子碼引入冗餘資訊，將 k 個量子位元編碼為 n 個量子位元進行保護（n > k）。演講將說明如何利用量測電路擷取 n - k 位元的症候群（Syndrome），在不破壞量子資訊的前提下判斷量子錯誤，並以表面碼說明即時解碼機制。此外，我們將介紹信念傳播（Belief Propagation）解碼器及其對應的伊辛模型（Ising Model）能量極小化原理，強調開發具備線性時間複雜度解碼器的重要性，以防止量子資訊在等待解碼時衰減。',
    keywords: ['量子錯誤更正', '症候群量測', '穩定碼與表面碼', '信念傳播解碼', '線性時間解碼'],
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
    id: 'break-1415',
    title: '休息（含移動）',
    type: 'break',
    from: '14:15',
    to: '14:30',
    rooms: ['hall', 'key'],
  },
  {
    id: 'talk-huang-yi-de',
    title: '黃亦得｜講題待公布',
    type: 'talk',
    from: '14:30',
    to: '15:00',
    rooms: ['key'],
    speakers: ['huang-yi-de'],
    // 11/07 原文：（?）黃亦得；11/10 原文：講題待定／黃亦得
  },
  {
    id: 'quantum-games',
    title: '從遊戲認識量子：量子計算與通訊的互動學習',
    type: 'talk',
    from: '14:30',
    to: '15:00',
    rooms: ['hall'],
    speakers: ['guo-shu-yu'],
    abstract:
      '量子計算與通訊近年快速發展，在複雜問題求解與資訊安全等領域展現應用潛力。本演講將介紹團隊於量子計算、量子通訊及量子啟發式最佳化的研究與應用，並結合互動視覺化工具與遊戲示範，呈現量子可逆電路的運作、電路合成與最佳化，以及量子通訊安全的核心概念。透過具體案例與操作展示，協助同學建立直觀理解，認識量子科技如何連結實際問題，以及互動學習在量子教育中的應用。',
    keywords: ['可逆運算', '電路合成與最佳化'],
  },
  {
    id: 'break-1500',
    title: '休息（含移動）',
    type: 'break',
    from: '15:00',
    to: '15:15',
    rooms: ['hall', 'key'],
  },
  {
    id: 'flex-break',
    title: '彈性休息',
    type: 'break',
    from: '15:00',
    to: '15:15',
    rooms: ['room1', 'multi2'],
  },
  {
    id: 'quantum-compilers',
    title: '量子軟體編譯與電子設計自動化',
    type: 'talk',
    from: '15:15',
    to: '15:45',
    rooms: ['hall'],
    speakers: ['jiang-jie-hong'],
    abstract:
      '將帶你入門量子電腦的「幕後指揮官」！聚焦於量子計算如何從抽象演算法轉化為實體硬體控制。我們將以淺顯易懂的方式解析量子計算分層架構／量子軟硬體分層、軟體編譯流程，帶你迅速掌握量子軟體的核心觀念與電子設計自動化（EDA）的關聯！',
    keywords: ['量子軟體', '程式編譯', '量子電路合成、模擬、驗證', '電子設計自動化'],
  },
  {
    id: 'quantum-biology',
    title: '量子生物',
    type: 'talk',
    from: '15:15',
    to: '15:45',
    rooms: ['key'],
    speakers: ['chen-qi-sheng'],
    // 11/07 原文：量子 in 藥物開發／分子模擬（暫定）／講者 ?；11/10 換題換講者。
  },
  {
    id: 'break-1545',
    title: '休息（含移動）',
    type: 'break',
    from: '15:45',
    to: '16:00',
    rooms: ['hall', 'key'],
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
    title: '量子雷達簡介',
    type: 'talk',
    from: '16:00',
    to: '16:30',
    rooms: ['key'],
    speakers: ['huang-cong-wei'],
    abstract:
      '匿蹤戰機真的能躲過所有雷達的偵測嗎？當傳統雷達面對微弱反射訊號與強烈背景雜訊時，量子科技是否能帶來突破？本演講將從神祕的量子糾纏現象出發，介紹量子照明（Quantum Illumination）的基本原理，探索如何利用訊號光子與閒置光子之間的量子關聯，從大量雜訊中辨識隱藏目標。更令人驚訝的是，即使量子糾纏在傳播過程中消失，量子照明在特定條件下仍可能保有偵測優勢。最後，我們將探討量子雷達是否真的能偵測匿蹤戰機，以及這項前沿科技的潛力與現實挑戰。',
    keywords: ['量子雷達與傳統雷達的差異', '量子糾纏', '量子照明', '訊號光源與閒置光源', '可以偵測匿蹤戰機嗎？'],
  },
  {
    id: 'move-closing',
    title: '移動至閉幕場所',
    type: 'break',
    from: '16:30',
    to: '16:45',
    rooms: 'all',
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
