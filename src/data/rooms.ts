import type { Room, RoomId } from '../types/agenda';

// 場地總表供會場頁與議程內容辨識使用。
export const rooms: Room[] = [
  { id: 'hall', name: '國際會議廳', short: '國際會議廳', kind: 'hall', capacity: 300 },
  { id: 'key', name: '關鍵中心演講廳', short: '關鍵中心演講廳', kind: 'center', capacity: 100 },
  { id: 'multi1', name: '多功能會議室 (1)', short: '多功能會議室 (1)', kind: 'meeting' },
  { id: 'multi2', name: '多功能會議室（2）', short: '多功能會議室 2', kind: 'meeting' },
  { id: 'multi3', name: '多功能會議室 (3)', short: '多功能會議室 (3)', kind: 'meeting' },
  { id: 'cafe', name: '2 樓咖啡廳', short: '2 樓咖啡廳', kind: 'cafe' },
];

// 主議程表列出四個有場次或活動的場地；其他場地列在表格下方。
const timetableRoomIds: RoomId[] = ['hall', 'key', 'multi1', 'multi3'];
export const timetableRooms: Room[] = timetableRoomIds.map((id) => roomById(id));
export const roomIndex = new Map<RoomId, number>(timetableRooms.map((room, i) => [room.id, i]));

export function roomById(id: RoomId): Room {
  const room = rooms.find((r) => r.id === id);
  if (!room) throw new Error(`Unknown room: ${id}`);
  return room;
}
