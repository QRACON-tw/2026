import { setFlap } from '../flap';
import { site } from '../../data/site';
import { reducedMotion, ms } from './motion';

const EVENT_DATE = site.date;
const TIME_ZONE = 'Asia/Taipei';
const SOON_MINUTES = 30;

type State = 'upcoming' | 'soon' | 'now' | 'past';

const STATUS_TEXT: Record<State, string> = {
  upcoming: '',
  soon: '即將開始',
  now: '進行中',
  past: '已結束',
};

const toMinutes = (hhmm: string) => {
  const [h = 0, m = 0] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const clock = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

function currentMinutes(): { minutes: number; preview: boolean } | null {
  const query = new URLSearchParams(window.location.search).get('now');
  if (query && /^\d{2}:\d{2}$/.test(query)) return { minutes: toMinutes(query), preview: true };

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  if (`${parts.year}-${parts.month}-${parts.day}` !== EVENT_DATE) return null;
  return { minutes: Number(parts.hour) * 60 + Number(parts.minute), preview: false };
}

function lightUp(el: HTMLElement) {
  if (reducedMotion()) return;
  const hold = 'steps(1, end)';
  el.animate(
    [
      { opacity: 0.25, offset: 0, easing: hold },
      { opacity: 1, offset: 0.2, easing: hold },
      { opacity: 0.45, offset: 0.34, easing: hold },
      { opacity: 1, offset: 0.5 },
      { opacity: 1, offset: 1 },
    ],
    { duration: ms('--dur-slow') },
  );
}

export function initNow(sessions: HTMLElement[]) {
  const board = document.querySelector<HTMLElement>('[data-now-board]');
  const nowList = board?.querySelector<HTMLElement>('[data-now-list]');
  const nextList = board?.querySelector<HTMLElement>('[data-next-list]');
  const clockEl = board?.querySelector<HTMLElement>('[data-now-clock]');
  const previewEl = board?.querySelector<HTMLElement>('[data-now-preview]');
  const nowCount = board?.querySelector<HTMLElement>('[data-now-count]');
  const nextCount = board?.querySelector<HTMLElement>('[data-next-count]');
  let lastNowSignature = '';
  let lastNextSignature = '';

  const render = () => {
    const now = currentMinutes();
    if (!now) {
      if (board) board.hidden = true;
      return;
    }

    const running: HTMLElement[] = [];
    let nextStart = Infinity;
    const filtering = Boolean(
      document.querySelector<HTMLElement>(
        '[data-filter-type][aria-pressed="true"], [data-filter-punched][aria-pressed="true"]',
      ),
    );

    for (const el of sessions) {
      const start = Number(el.dataset.start);
      const end = Number(el.dataset.end);
      const dimmed = el.hasAttribute('data-dim');
      let state: State = 'upcoming';
      if (now.minutes >= end) state = 'past';
      else if (now.minutes >= start) state = 'now';
      else if (start - now.minutes <= SOON_MINUTES) state = 'soon';
      if (state === 'now' && !dimmed && el.dataset.state !== 'now') lightUp(el);
      el.dataset.state = state;

      const status = el.querySelector<HTMLElement>('[data-status]');
      if (status) {
        status.textContent = STATUS_TEXT[state];
        status.hidden = !STATUS_TEXT[state];
      }
      if (state === 'now' && !dimmed) running.push(el);
      if (!dimmed && start > now.minutes) nextStart = Math.min(nextStart, start);
    }

    if (!board || !nowList || !nextList || !clockEl) return;
    board.hidden = false;
    const flap = clockEl.querySelector<HTMLElement>('[data-flap-live]');
    if (flap) setFlap(flap, clock(now.minutes));
    else clockEl.textContent = clock(now.minutes);
    clockEl.setAttribute('datetime', `${EVENT_DATE}T${clock(now.minutes)}+08:00`);
    if (previewEl) previewEl.hidden = !now.preview;

    const item = (el: HTMLElement) => {
      const li = document.createElement('li');
      const titleEl = el.querySelector<HTMLElement>('.s__title');
      const link = titleEl?.querySelector<HTMLAnchorElement>('a');
      const label =
        titleEl?.querySelector<HTMLElement>('.words')?.textContent?.trim() ??
        titleEl?.textContent?.trim() ??
        '';
      const title = link ? document.createElement('a') : document.createElement('span');
      title.className = 'now-board__item-title';
      if (title instanceof HTMLAnchorElement && link) {
        title.href = link.href;
        title.setAttribute('aria-haspopup', 'dialog');
      }
      title.textContent = label;
      const meta = document.createElement('span');
      meta.className = 'now-board__item-meta';
      meta.textContent = `${clock(Number(el.dataset.start))}–${clock(Number(el.dataset.end))}・${el.dataset.rooms ?? ''}`;
      li.append(title, meta);
      return li;
    };
    const emptyItem = (text: string) => {
      const li = document.createElement('li');
      li.textContent = text;
      return li;
    };

    const upcoming = sessions.filter(
      (el) => !el.hasAttribute('data-dim') && Number(el.dataset.start) === nextStart,
    );
    const filterSignature = filtering ? 'filtered' : 'all';
    const nowSignature =
      `${filterSignature}:${running.map((el) => el.dataset.id ?? '').join('|')}` || 'empty';
    const nextSignature =
      `${filterSignature}:${upcoming.map((el) => el.dataset.id ?? '').join('|')}` || 'empty';
    const active = document.activeElement;
    const activeHref =
      active instanceof HTMLAnchorElement &&
      (nowList.contains(active) || nextList.contains(active))
        ? active.href
        : null;

    // Only replace a list when its contents actually change. The clock still
    // ticks every minute, without stealing focus or resetting a swipe.
    if (nowSignature !== lastNowSignature) {
      const left = nowList.scrollLeft;
      nowList.replaceChildren(
        ...(running.length
          ? running.map(item)
          : [
              emptyItem(
                filtering ? '目前沒有符合條件的進行中場次' : '目前沒有進行中的場次',
              ),
            ]),
      );
      nowList.scrollLeft = left;
      lastNowSignature = nowSignature;
    }
    if (nextSignature !== lastNextSignature) {
      const left = nextList.scrollLeft;
      nextList.replaceChildren(
        ...(upcoming.length
          ? upcoming.map(item)
          : [
              emptyItem(filtering ? '接下來沒有符合條件的場次' : '今天的場次都結束了'),
            ]),
      );
      nextList.scrollLeft = left;
      lastNextSignature = nextSignature;
    }
    if (activeHref) {
      [
        ...nowList.querySelectorAll<HTMLAnchorElement>('a'),
        ...nextList.querySelectorAll<HTMLAnchorElement>('a'),
      ]
        .find((link) => link.href === activeHref)
        ?.focus({ preventScroll: true });
    }

    if (nowCount) {
      nowCount.textContent = running.length ? `${running.length} 場` : '';
      nowCount.hidden = running.length === 0;
    }
    if (nextCount) {
      nextCount.textContent = upcoming.length ? `${upcoming.length} 場` : '';
      nextCount.hidden = upcoming.length === 0;
    }
    const nextLabel = board.querySelector<HTMLElement>('[data-next-time]');
    if (nextLabel) nextLabel.textContent = Number.isFinite(nextStart) ? clock(nextStart) : '';
  };

  render();
  document.addEventListener('agenda:filters-changed', render);
  if (currentMinutes() && !currentMinutes()?.preview) window.setInterval(render, 60_000);
}
