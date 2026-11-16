// 場外活動與空間依「議程表 - 更新 1116.csv」整理；暫定項目及內部空間不公開。

export interface TimedProgram {
  id: string;
  /** HH:MM，頁面用 eventDateTime() 推導 <time datetime>。 */
  from: string;
  /** 未提供結束時間時保留空白，不自行推定。 */
  to?: string;
  title: string;
  place: string;
  type: string;
  speaker?: string;
  note?: string;
}

/** 依實際開始時間排序，時間不同的活動不塞入主議程的固定格線。 */
export const timed: TimedProgram[] = [
  {
    id: 'rules-quantum-tic-tac-toe',
    from: '08:00',
    to: '12:15',
    title: '規則展示：量子圈圈叉叉',
    place: '多功能會議室（1）',
    type: '規則展示',
  },
  {
    id: 'rules-quantum-gates',
    from: '08:00',
    to: '12:15',
    title: '規則展示：量子邏輯閘',
    place: '多功能會議室（3）',
    type: '規則展示',
  },
  {
    id: 'games-quantum-tic-tac-toe',
    from: '12:45',
    to: '16:30',
    title: '場外遊戲：量子圈圈叉叉',
    place: '多功能會議室（1）',
    type: '場外遊戲',
  },
  {
    id: 'games-quantum-gates',
    from: '12:45',
    to: '16:30',
    title: '場外遊戲：量子邏輯閘',
    place: '多功能會議室（3）',
    type: '場外遊戲',
  },
  {
    id: 'quantum-lab-tour-1',
    from: '14:00',
    to: '14:20',
    title: '量子實驗室參訪 1',
    place: 'QC-Fab & QC-Test',
    type: '參訪',
  },
  {
    id: 'game-experience',
    from: '14:15',
    to: '14:30',
    title: '遊戲體驗專區',
    place: '多功能會議室（2）',
    type: '體驗活動',
    speaker: '郭姝妤',
  },
  {
    id: 'quantum-lab-tour-2',
    from: '14:30',
    to: '14:50',
    title: '量子實驗室參訪 2',
    place: 'QC-Fab & QC-Test',
    type: '參訪',
  },
  {
    id: 'quantum-lab-tour-3',
    from: '15:00',
    to: '15:20',
    title: '量子實驗室參訪 3',
    place: 'QC-Fab & QC-Test',
    type: '參訪',
  },
  {
    id: 'quantum-lab-tour-4',
    from: '15:30',
    to: '15:50',
    title: '量子實驗室參訪 4',
    place: 'QC-Fab & QC-Test',
    type: '參訪',
  },
];

export interface SideSpace {
  name: string;
  detail: string | null;
  place: string;
}

/** CSV 有列出這些對外空間，但沒有提供個別開放起訖時間。 */
export const spaces: SideSpace[] = [
  { name: '入口拱門', detail: '量子冒險 & 穿隧', place: '2 樓咖啡廳' },
  { name: '海報展示', detail: '量子進程科普、研究生成果', place: '2 樓咖啡廳' },
  { name: '桌長分享', detail: null, place: '2 樓咖啡廳' },
  { name: '茶點區', detail: null, place: '2 樓咖啡廳' },
  { name: '配件區', detail: '可領取當前等級的對應配件', place: '2 樓咖啡廳' },
  { name: '充電區', detail: null, place: '2 樓走廊' },
  { name: '用餐區', detail: null, place: '2 樓走廊' },
];

/** 來源只標示起點，未列出結束時間。 */
export const departure = { from: '17:15', title: '賦歸' };
