// 場地與活動依 Downloads 的「議程表 - 更新 1116.csv」欄位順序整理。

export interface TimedProgram {
  id: string;
  /** CSV 有標示活動時間時才填入；不推定未提供的時間。 */
  from?: string;
  to?: string;
  title: string;
  detail?: string;
  note?: string;
}

export interface SideSpace {
  title: string;
  detail?: string;
}

export interface SideVenue {
  name: string;
  notice?: string;
  programs?: TimedProgram[];
  spaces?: SideSpace[];
}

/** 列出主議程四個場地以外的公開場地；依 CSV 欄位順序排列。 */
export const sideVenues: SideVenue[] = [
  {
    name: 'QC-Fab & QC-Test',
    programs: [
      { id: 'quantum-lab-tour-1', from: '14:00', to: '14:20', title: '量子實驗室參訪 1' },
      { id: 'quantum-lab-tour-2', from: '14:30', to: '14:50', title: '量子實驗室參訪 2' },
      { id: 'quantum-lab-tour-3', from: '15:00', to: '15:20', title: '量子實驗室參訪 3' },
      { id: 'quantum-lab-tour-4', from: '15:30', to: '15:50', title: '量子實驗室參訪 4' },
    ],
  },
  {
    name: '多功能會議室 (2)',
    programs: [
      {
        id: 'quantum-computer-workshop',
        from: '13:45',
        to: '15:00',
        title: '量子電腦工作坊',
        note: 'NVIDIA・暫定',
      },
      { id: 'free-chat', from: '15:00', to: '16:45', title: '自由交流' },
    ],
  },
  {
    name: '2 樓咖啡廳',
    spaces: [
      { title: '入口拱門', detail: '量子冒險 & 穿隧' },
      { title: '海報展示', detail: '量子進程科普、研究生成果' },
      { title: '桌長分享' },
      { title: '茶點區' },
      { title: '配件區', detail: '可領取當前等級的對應配件' },
    ],
  },
  {
    name: '2 樓走廊',
    spaces: [{ title: '充電區' }, { title: '用餐區' }],
  },
];

/** 來源只標示起點，未列出結束時間。 */
export const departure = { from: '17:15', title: '賦歸' };
