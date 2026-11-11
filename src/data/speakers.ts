// 講者名單轉錄自 2026-11-07 議程草案與 11/10 修訂；職稱、單位與頭像尚未提供。
export interface Speaker {
  id: string;
  name: string;
}

export const speakers: Speaker[] = [
  { id: 'ke-zhong-ting', name: '柯忠廷' },
  { id: 'ou-jia-he', name: '歐家和' },
  { id: 'li-tai-yue', name: '李泰岳' },
  { id: 'huang-yi-de', name: '黃亦得' },
  { id: 'huang-jing-yu', name: '黃靜瑜' },
  { id: 'guo-gao-yue', name: '郭高岳' },
  { id: 'zhang-ren-yu', name: '張仁瑀' },
  { id: 'guo-shu-yu', name: '郭姝妤' },
  { id: 'jiang-jie-hong', name: '江介宏' },
  { id: 'chen-qi-sheng', name: '陳麒升' },
  { id: 'zhang-ren-wei', name: '張仁瑋' },
  { id: 'huang-cong-wei', name: '黃琮暐' },
  { id: 'nvidia', name: 'NVIDIA' },
];

export function speakerById(id: string): Speaker {
  const speaker = speakers.find((s) => s.id === id);
  if (!speaker) throw new Error(`Unknown speaker: ${id}`);
  return speaker;
}
