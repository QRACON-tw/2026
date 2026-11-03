export interface TicketRow {
  name: string;
  note?: string;
  price: number;
}

export interface TicketGroup {
  id: 'online' | 'free' | 'door' | 'sponsor';
  name: string;
  note?: string;
  rows: TicketRow[];
}

export const ticketGroups: TicketGroup[] = [
  {
    id: 'online',
    name: '線上購票',
    note: '一般票、學生票與 3 人團體票販售至 12 月 13 日 17:00；含餐券票種販售至 12 月 11 日 00:00。餐券不單獨販售。',
    rows: [
      { name: '一般票', price: 200 },
      { name: '學生票', note: '進場出示學生證', price: 150 },
      { name: '3 人團體一般票', price: 450 },
      { name: '3 人團體學生票', note: '進場出示學生證', price: 300 },
      { name: '一般票（含餐券）', note: '內含 60 元餐券', price: 260 },
      { name: '學生票（含餐券）', note: '進場出示學生證；內含 60 元餐券', price: 210 },
      { name: '3 人團體一般票（含餐券）', note: '內含 60 元餐券', price: 630 },
      {
        name: '3 人團體學生票（含餐券）',
        note: '進場出示學生證；內含 60 元餐券',
        price: 480,
      },
    ],
  },
  {
    id: 'free',
    name: '免費票券',
    note: '公關票供校園推廣與公關合作使用，請來信洽談；資格與名額依主辦單位確認為準。',
    rows: [
      {
        name: '公關票',
        note: '校園推廣或公關合作',
        price: 0,
      },
    ],
  },
  {
    id: 'door',
    name: '現場購票',
    note: '活動報名截止後，依售票情況決定是否開放',
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

export const lowestFare = Math.min(
  ...ticketGroups
    .filter((group) => group.id === 'online' || group.id === 'door')
    .flatMap((group) => group.rows.map((row) => row.price)),
);
