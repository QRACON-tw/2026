import type { Session, SessionType } from '../types/agenda';
import { site } from './site';
import { departure } from './side-program';

const DAY = site.date;
const at = (hhmm: string) => `${DAY}T${hhmm}:00+08:00`;

type Draft = Omit<Session, 'start' | 'end' | 'speakerIds' | 'tags'> & {
  from: string;
  to: string;
  speakers?: string[];
};

// 依「議程表 - 更新 1116.csv」更新公開流程、講題、講者與場地；摘要另參考同批摘要表。
// 公開議程與場地活動皆依 CSV；暫定活動可顯示在表格，但不建立場次詳情頁。
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
    id: 'partner-zone-multi1-morning',
    title: '合作夥伴專區（暫定）',
    type: 'exhibit',
    from: '08:00',
    to: '14:15',
    rooms: ['multi1'],
    detailPage: false,
  },
  {
    id: 'rules-display-multi3',
    title: '規則展示：量子圈圈叉叉與量子邏輯閘',
    type: 'exhibit',
    from: '08:00',
    to: '12:45',
    rooms: ['multi3'],
    detailPage: false,
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
    speakers: ['ke-zhong-ting', 'huang-jing-yu'],
    abstract:
      '特邀兩位量子計算領域的理論派與實驗派代表學者，共同探討量子計算將如何影響我們的未來。一位從量子資訊與演算法出發，推演量子計算的潛力與極限；一位站在實驗室第一線，面對把量子位元真正做出來、穩定運作的種種挑戰。兩種視角將在對談中交會，帶領同學看見量子計算從紙上理論走進現實的完整樣貌。',
    keywords: ['量子計算', '量子資訊', '量子演算法', '量子位元'],
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
    id: 'quantum-annealing',
    title: '邁向實用量子最佳化：從生活問題認識量子退火',
    type: 'talk',
    from: '10:10',
    to: '10:40',
    rooms: ['hall', 'key'],
    speakers: ['ou-jia-he'],
    abstract:
      '如何搭配飲食，兼顧營養與預算？如何調度共享自行車，讓借還車更方便？如何用不重複的小照片拼成一幅大圖？這些問題背後，都有龐大的選擇組合。本演講將從已發表的研究案例出發，以淺顯的例子與直觀圖像介紹量子退火的基本想法，說明如何將生活需求轉換為最佳化問題，以及量子最佳化與相關方法如何參與求解。無須量子物理或程式設計背景，也能認識其應用潛力，以及從研究走向實用需要面對的挑戰。',
    keywords: ['組合最佳化', '量子退火', '問題建模', '目標與限制條件'],
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
    title: '走進量子計算的世界',
    type: 'talk',
    from: '11:00',
    to: '11:30',
    rooms: ['key'],
    speakers: ['huang-jing-yu'],
    abstract:
      '量子電腦為何能突破傳統超級電腦的運算極限？這場演講將以直觀的物理圖像帶同學認識量子位元（Qubit）的核心特性，包含量子疊加與量子糾纏如何賦予量子計算獨特的平行處理潛力。接著，我們將透過建構量子電腦的關鍵指標，帶領大家認識目前全球科研與產業界主流的超導、離子阱與中性原子等硬體技術路線，剖析不同系統各自的物理優勢與工程挑戰，讓同學全面理解量子科技的現況與未來發展。',
    keywords: ['量子疊加', '量子糾纏', '相干時間'],
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
    title: '邁向高效能量子運算的挑戰與未來展望',
    type: 'keynote',
    from: '11:45',
    to: '12:15',
    rooms: ['hall', 'key'],
    speakers: ['li-tai-yue'],
    abstract:
      '隨著量子科技快速發展，量子運算被視為下一代重要的運算技術。然而，現階段量子硬體仍面臨量子位元規模、雜訊干擾及運算穩定性等挑戰。因此，整合量子運算（QC）與高效能運算（HPC），將是推動量子運算實用化的重要方向。本演講將介紹高效能量子運算的基本概念與技術挑戰，以及超級電腦在量子模擬與混合運算中的關鍵角色，並從國網中心的角度，分享臺灣在量子運算領域的發展策略、技術布局與未來展望。',
    keywords: ['高效能運算', '量子計算', '量子與高效能運算整合', '量子電路模擬'],
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
    id: 'games-multi3',
    title: '場外遊戲：量子圈圈叉叉與量子邏輯閘',
    type: 'activity',
    from: '12:45',
    to: '16:45',
    rooms: ['multi3'],
    detailPage: false,
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
    from: '14:30',
    to: '15:00',
    rooms: ['key'],
    note: '青年百億分享',
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
    id: 'partner-game-experience-multi1',
    title: '合作夥伴＋遊戲體驗',
    type: 'activity',
    from: '14:15',
    to: '16:45',
    rooms: ['multi1'],
    speakers: ['guo-shu-yu'],
    abstract: '依 CSV，此時段包含暫定的合作夥伴專區，以及由郭姝妤負責的遊戲體驗專區。',
    note: '合作夥伴專區暫定；遊戲體驗專區：郭姝妤。',
  },
  {
    id: 'talk-huang-yi-de',
    title: 'Amazon Braket & Microsoft Azure Quantum 雲端量子電腦介紹',
    type: 'talk',
    from: '14:30',
    to: '15:00',
    rooms: ['hall'],
    speakers: ['huang-yi-de'],
    abstract:
      '量子電腦利用量子位元的疊加和糾纏性質，配合演算法控制量子位元的狀態使其成為特定數學問題的輸出結果，這樣非古典物理學的運算過程展現出量子電腦強大的計算能力。Amazon Braket 以及 Microsoft Azure Quantum 皆為提供各種不同量子電腦的雲端平台，包含：超導、離子阱、中性原子等量子電腦。這種多元的量子平台服務，讓使用者可以根據問題與演算法的種類，在相同使用方式下彈性地選擇不同形式的量子電腦。',
    keywords: ['量子電腦', '量子電路', '量子模擬'],
  },
  {
    id: 'quantum-games',
    title: '從遊戲認識量子：量子計算與通訊的互動學習',
    type: 'talk',
    from: '13:45',
    to: '14:15',
    rooms: ['key'],
    speakers: ['guo-shu-yu'],
    abstract:
      '量子計算與通訊近年快速發展，在複雜問題求解與資訊安全等領域展現應用潛力。本演講將介紹團隊於量子計算、量子通訊及量子啟發式最佳化的研究與應用，並結合互動視覺化工具與遊戲示範，呈現量子可逆電路的運作、電路合成與最佳化，以及量子通訊安全的核心概念。透過具體案例與操作展示，協助同學建立直觀理解，認識量子科技如何連結實際問題，以及互動學習在量子教育中的應用。',
    keywords: ['可逆運算', '電路合成與最佳化', '量子通訊安全', '量子啟發式最佳化'],
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
    title: '當量子遇見生命：從大自然的量子把戲，到用量子電腦讀懂大腦',
    type: 'talk',
    from: '15:15',
    to: '15:45',
    rooms: ['key'],
    speakers: ['chen-qi-sheng'],
    abstract:
      '量子力學只存在於極低溫的實驗室裡嗎？大自然可能早就在使用量子：植物光合作用的能量傳遞、候鳥導航的「量子羅盤」、酵素中的量子穿隧，都是科學家仍在熱烈研究與爭論的題目。反過來，我們也能用量子電腦研究生命。本場演講將從這些自然現象出發，介紹講者如何把腦波訊號送進量子電路進行辨識與生成，以及如何結合量子計算與 AI 尋找新的藥物標靶。最後，我們將誠實地談談：今天的量子電腦在生醫領域能做到什麼、還做不到什麼。',
    keywords: [
      '生物系統中的量子效應',
      '參數化量子電路',
      '資料編碼',
      '蛋白質異構調控（allostery）',
      '量子優勢不等於「現在就比較快」',
    ],
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
    id: 'industry-and-study',
    title: '量子產業 ∕ 升學 現況與未來',
    type: 'talk',
    from: '16:00',
    to: '16:30',
    rooms: ['hall'],
    speakers: ['zhang-ren-yu'],
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
    id: 'break-before-closing',
    title: '休息（含移動）',
    type: 'break',
    from: '16:30',
    to: '16:45',
    rooms: ['hall', 'key'],
  },
  {
    id: 'closing',
    title: '閉幕',
    type: 'plenary',
    from: '16:45',
    to: '17:15',
    rooms: ['hall', 'key'],
  },
  {
    id: 'move-to-closing',
    title: '移動至閉幕場所',
    type: 'break',
    from: '16:45',
    to: '17:15',
    rooms: ['multi1', 'multi3'],
    detailPage: false,
  },
  {
    id: 'departure',
    title: departure.title,
    type: 'departure',
    from: departure.from,
    to: '17:30',
    rooms: ['hall', 'key', 'multi1', 'multi3'],
    detailPage: false,
  },
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
  departure: '賦歸',
};

export const isListed = (s: Session) => s.type !== 'break' && s.type !== 'departure';
export const hasDetailPage = (s: Session) => s.detailPage ?? isListed(s);
export const canBookmark = (s: Session) =>
  hasDetailPage(s) && s.rooms !== 'all' && s.type !== 'plenary';

export const phases = [
  { id: 'phase-arrival', label: '報到與開場', from: '08:00', to: '10:10' },
  { id: 'phase-morning', label: '上午分軌', from: '10:10', to: '12:15' },
  { id: 'phase-noon', label: '午間', from: '12:15', to: '13:45' },
  { id: 'phase-afternoon', label: '下午分軌', from: '13:45', to: '16:45' },
  { id: 'phase-closing', label: '閉幕與賦歸', from: '16:45', to: '17:30' },
] as const;
