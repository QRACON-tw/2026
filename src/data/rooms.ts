import type { Room, RoomId } from '../types/agenda';

export const rooms: Room[] = [
  { id: 'hall', name: '國際會議廳', short: '國際會議廳', kind: 'hall', capacity: 300 },
  { id: 'key', name: '關鍵中心演講廳', short: '關鍵中心', kind: 'center', capacity: 100 },
  {
    id: 'multi12',
    name: '多功能會議室（1）+（2）',
    short: '多功能 1+2',
    kind: 'meeting',
    capacity: 100,
  },
  { id: 'multi3', name: '多功能會議室（3）', short: '多功能 3', kind: 'meeting', capacity: 50 },
  { id: 'room1', name: '第一會議室', short: '第一會議室', kind: 'meeting', capacity: 27 },
];

export const roomIndex = new Map<RoomId, number>(rooms.map((room, i) => [room.id, i]));

export function roomById(id: RoomId): Room {
  const room = rooms.find((r) => r.id === id);
  if (!room) throw new Error(`Unknown room: ${id}`);
  return room;
}
