// 轉錄自「議程表 - 更新 1110」試算表分頁（gid 423741764，與 sessions.ts 同一張表）：
// https://docs.google.com/spreadsheets/d/1fpkpSfhEPo5EH7iVfdfQhRpGMlQezFUQc2ZKlPb0MNg/edit#gid=423741764
// 表上比公開海報多出三個欄位：多功能（1）／（3）的定時節目、量子實驗室參訪，以及 2 樓的常設空間。
// 時刻表的欄位是照海報的四個場地設計的，硬加會變 7 欄，所以這些節目收在議程頁的「場外活動」區塊。
// 活動名稱與位置照原文；量子實驗室參訪的地點在表上沒有欄名，是依活動名稱填的。

export interface TimedProgram {
  /** HH:MM，頁面用 eventDateTime() 推導 <time datetime>。 */
  from: string;
  /** HH:MM，與 from 同一天。 */
  to: string;
  title: string;
  place: string;
}

/** 會在特定時間發生的場外節目，順序照試算表由上而下。 */
export const timed: TimedProgram[] = [
  { from: '08:00', to: '12:15', title: '規則展示：量子圈圈叉叉', place: '多功能會議室（1）' },
  { from: '08:00', to: '12:15', title: '規則展示：量子邏輯閘', place: '多功能會議室（3）' },
  { from: '12:45', to: '16:30', title: '場外遊戲：量子圈圈叉叉', place: '多功能會議室（1）' },
  { from: '12:45', to: '16:30', title: '場外遊戲：量子邏輯閘', place: '多功能會議室（3）' },
  { from: '13:45', to: '14:15', title: '量子實驗室參訪 1', place: '量子實驗室' },
  { from: '14:30', to: '15:00', title: '量子實驗室參訪 2', place: '量子實驗室' },
  { from: '15:15', to: '15:45', title: '量子實驗室參訪 3', place: '量子實驗室' },
  { from: '16:00', to: '16:30', title: '量子實驗室參訪 4', place: '量子實驗室' },
];

export interface SideSpace {
  name: string;
  /** 表上「空間」欄在「：」後面的內容，原樣搬過來；沒有就 null。 */
  detail: string | null;
  place: string;
}

// 原文：入口拱門：量子穿隧｜海報展示：量子進程科普、量子心路歷程、研究生成果｜茶點區｜
// 配件區：可領取當前等級的對應配件｜充電區｜用餐區（位置分別是 2 樓咖啡廳、2 樓走廊）。
// 工作人員用的工人休息室與器材室不對外，不收錄。
export const spaces: SideSpace[] = [
  { name: '入口拱門', detail: '量子穿隧', place: '2 樓咖啡廳' },
  { name: '海報展示', detail: '量子進程科普、量子心路歷程、研究生成果', place: '2 樓咖啡廳' },
  { name: '茶點區', detail: null, place: '2 樓咖啡廳' },
  { name: '配件區', detail: '可領取當前等級的對應配件', place: '2 樓咖啡廳' },
  { name: '充電區', detail: null, place: '2 樓走廊' },
  { name: '用餐區', detail: null, place: '2 樓走廊' },
];
