import { sessions } from '../data/sessions';
import { rooms, roomIndex, roomById } from '../data/rooms';
import { site } from '../data/site';
import { minutesOf, toMinutes } from './time';
import type { Session } from '../types/agenda';

const DAY_START = toMinutes('08:00');
const DAY_END = toMinutes('17:30');
// 5-minute slots keep 09:15 / 09:30 / 10:10 / 10:40 on grid lines.
// --slot and --slot-band remain the heights of a 15-minute slot; each row is a third.
const SLOT = 5;
const ROWS = (DAY_END - DAY_START) / SLOT;
// Grid gridRow 1 contains room headings; session rows start at 2.
export const gridRow = (minutes: number) => 2 + (minutes - DAY_START) / SLOT;
const firstRoom = (session: Session) =>
  session.rooms === 'all' ? -1 : (roomIndex.get(session.rooms[0]!) ?? 0);
export const sessionColumns = (session: Session): [number, number] => {
  if (session.rooms === 'all') return [1, rooms.length + 1];
  const indices = session.rooms.map((id) => roomIndex.get(id) ?? 0);
  return [1 + Math.min(...indices), 2 + Math.max(...indices)];
};
export const sessionRoomLabel = (session: Session) =>
  session.rooms === 'all' ? '全體' : session.rooms.map((id) => roomById(id).name).join('、');
export const orderedSessions = [...sessions].sort(
  (a, b) => minutesOf(a.start) - minutesOf(b.start) || firstRoom(a) - firstRoom(b),
);
// Consecutive all-room slots use a shorter gridRow height.
const rowRuns: { band: boolean; count: number }[] = [];
for (let i = 0; i < ROWS; i++) {
  const from = DAY_START + i * SLOT;
  const covering = sessions.filter(
    (session) => minutesOf(session.start) < from + SLOT && minutesOf(session.end) > from,
  );
  const band = covering.length > 0 && covering.every((session) => session.rooms === 'all');
  const last = rowRuns.at(-1);
  if (last && last.band === band) last.count += 1;
  else rowRuns.push({ band, count: 1 });
}
export const rowTemplate = rowRuns
  .map((run) => `repeat(${run.count}, calc(var(${run.band ? '--slot-band' : '--slot'}) / 3))`)
  .join(' ');
export const markerRows = 30 / SLOT;
export const timeMarkers = Array.from(
  { length: (DAY_END - DAY_START) / 30 },
  (_, index) => DAY_START + index * 30,
);
export const formatMinutes = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
export const eventDateTime = (minutes: number) =>
  `${site.date}T${formatMinutes(minutes)}:00+08:00`;
