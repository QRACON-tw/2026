// 票種與票價：逐項轉錄自 KKTIX 活動頁（https://sqcs.kktix.cc/events/qracon2026，2026-11-01 核對）。
// 改價或增減票種時只改這個檔；首頁票種表與車票的「最低票價」都由此推得。

export interface TicketRow {
  name: string;
  note?: string;
  price: number;
}

export interface TicketGroup {
  id: 'online' | 'door' | 'sponsor';
  name: string;
  note?: string;
  rows: TicketRow[];
}

export const ticketGroups: TicketGroup[] = [
  {
    id: 'online',
    name: '線上購票',
    rows: [
      { name: '一般票', price: 200 },
      { name: '學生票', note: '進場出示學生證', price: 150 },
      { name: '3 人團體一般票', price: 450 },
      { name: '3 人團體學生票', note: '進場出示學生證', price: 300 },
      { name: '15 人團體一般票', price: 1800 },
      { name: '15 人團體學生票', note: '進場出示學生證', price: 1200 },
      { name: '餐券', note: '加購，不含入場', price: 60 },
    ],
  },
  {
    id: 'door',
    name: '現場購票',
    note: '報名截止後依售票情況決定是否開放',
    rows: [{ name: '現場票', price: 220 }],
  },
  {
    id: 'sponsor',
    name: '贊助票',
    note: '憑票券於報到處領取 QRACON 紀念品',
    rows: [
      { name: '黃金贊助', price: 1000 },
      { name: '白金贊助', price: 3000 },
      { name: '鑽石贊助', price: 5000 },
    ],
  },
];

/** 最低入場票價（不含餐券加購），車票上的「票價」用這個數。 */
export const lowestFare = Math.min(
  ...ticketGroups
    .filter((group) => group.id !== 'sponsor')
    .flatMap((group) => group.rows.filter((row) => row.name !== '餐券').map((row) => row.price)),
);
