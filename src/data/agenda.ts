import { departure, spaces, timed } from './side-program';
import { isListed, sessions, typeLabels } from './sessions';
import { roomById } from './rooms';
import { speakerById } from './speakers';
import type { Session } from '../types/agenda';

export interface AgendaEntry {
  id: string;
  from: string;
  to?: string;
  title: string;
  type: string;
  speaker: string;
  place: string;
  abstract: string;
  note: string;
  kind: 'session' | 'program' | 'departure';
  session?: Session;
  hasDetails: boolean;
}

const sessionEntries: AgendaEntry[] = sessions.map((session) => ({
  id: session.id,
  from: session.start.slice(11, 16),
  to: session.end.slice(11, 16),
  title: session.title,
  type: typeLabels[session.type],
  speaker: session.speakerIds.map((id) => speakerById(id).name).join('、'),
  place:
    session.rooms === 'all'
      ? '全體'
      : session.rooms.map((id) => roomById(id).name).join('、'),
  abstract: session.abstract ?? '',
  note: session.note ?? '',
  kind: 'session',
  session,
  hasDetails: isListed(session),
}));

const programEntries: AgendaEntry[] = timed.map((program) => ({
  id: program.id,
  from: program.from,
  to: program.to,
  title: program.title,
  type: program.type,
  speaker: program.speaker ?? '',
  place: program.place,
  abstract: '',
  note: program.note ?? '',
  kind: 'program',
  hasDetails: false,
}));

const departureEntry: AgendaEntry = {
  id: 'departure',
  from: departure.from,
  title: departure.title,
  type: '流程',
  speaker: '',
  place: '',
  abstract: '',
  note: '',
  kind: 'departure',
  hasDetails: false,
};

export const agendaEntries = [...sessionEntries, ...programEntries, departureEntry].sort((a, b) => {
  const byStart = a.from.localeCompare(b.from);
  if (byStart) return byStart;
  if (a.kind === b.kind) return 0;
  return a.kind === 'session' ? -1 : 1;
});

export { spaces };
