// 籌備團隊名單（2026-11-01 由主辦提供，照原順序轉錄）。
// 同一人跨組時在兩個組別都列一次；`headcount` 以去重後的人數計。
// 頭像原始來源主要為主辦提供的 Drive 資料夾；曾慶語使用 QRACON 主視覺風格的 imagegen 滿版圖。檔名就是姓名；缺少個人照片時使用共用示意頭像。

import type { ImageMetadata } from 'astro';

const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/team/*.jpg', {
  eager: true,
});

/** 依姓名取頭像；沒有照片的人回 null，由頁面改用共用示意頭像。 */
export const photoOf = (name: string): ImageMetadata | null =>
  photos[`../assets/team/${name}.jpg`]?.default ?? null;

export interface TeamGroup {
  id: string;
  name: string;
  en: string;
  blurb: string;
  members: string[];
}

export const teamGroups: TeamGroup[] = [
  {
    id: 'core',
    name: '召組',
    en: 'CORE',
    blurb: '統籌年會方向與跨組協調。',
    members: ['林恩慈', '賴品彤', '林昀儒'],
  },
  {
    id: 'marketing',
    name: '行銷組',
    en: 'MARKETING',
    blurb: '社群經營、對外宣傳與報名推廣。',
    members: ['李中原', '劉苡媗', '王璿雅', '石荃安', '程品叡', '郭芮綺'],
  },
  {
    id: 'finance',
    name: '財務組',
    en: 'FINANCE',
    blurb: '預算、收支與票務帳務。',
    members: ['黃宥睿'],
  },
  {
    id: 'design',
    name: '設計組',
    en: 'DESIGN',
    blurb: '主視覺、網站與現場輸出物的視覺設計。',
    members: ['嚴郁琇', '吳哲宇', '李庭彣', '劉翁凱', '黃鈺翎', '曾慶語', '林樂穎'],
  },
  {
    id: 'program',
    name: '議程組',
    en: 'PROGRAM',
    blurb: '議程規劃、講者邀請與場次安排。',
    members: ['張銘珈', '嚴郁琇', '廖國豪', '石艾儒', '童湘芩', '沈書瑜'],
  },
  {
    id: 'photo',
    name: '攝影組',
    en: 'PHOTO',
    blurb: '活動記錄與影像素材。',
    members: ['馬子翔', '吳佳軒', '邱沛琳', '林子茵', '簡秀臻'],
  },
  {
    id: 'flex',
    name: '機動組',
    en: 'FLEX',
    blurb: '報到、動線與現場支援。',
    members: [
      '林樂穎',
      '謝依伶',
      '林家佑',
      '陳星穎',
      '郭旻宗',
      '洪毓傑',
      '黃宥睿',
      '李曜丞',
      '林孟詮',
      '曾慶語',
      '蘇奇彬',
    ],
  },
];

export const teamHeadcount = new Set(teamGroups.flatMap((group) => group.members)).size;
