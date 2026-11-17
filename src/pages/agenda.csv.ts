import type { APIRoute } from 'astro';
import { agendaEntries, spaces } from '../data/agenda';
import { site } from '../data/site';

export const prerender = true;

const csvCell = (value: string) => `"${value.replaceAll('"', '""')}"`;
const csvRow = (values: string[]) => values.map(csvCell).join(',');

export const GET: APIRoute = () => {
  const rows = [
    ['日期', '開始時間', '結束時間', '活動', '類型', '講者', '地點', '摘要', '備註'],
    ...agendaEntries.map((entry) => [
      site.date,
      entry.from,
      entry.to ?? '',
      entry.title,
      entry.type,
      entry.speaker,
      entry.place,
      entry.abstract,
      entry.note,
    ]),
    ...spaces.map((space) => [
      site.date,
      '',
      '',
      space.name,
      '常設空間',
      '',
      space.place,
      space.detail ?? '',
      '來源未列開放時間',
    ]),
  ];
  const body = `\uFEFF${rows.map(csvRow).join('\r\n')}\r\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="QRACON-2026-agenda.csv"',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};
