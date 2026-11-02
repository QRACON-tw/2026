import { reducedMotion } from './motion';

export function initRoomScroll() {
  const board = document.querySelector<HTMLElement>('[data-timetable-board]');
  const track = board?.querySelector<HTMLElement>('[data-room-track]');
  const heads = [...(board?.querySelectorAll<HTMLElement>('.tt__room') ?? [])];
  const jump = document.querySelector<HTMLSelectElement>('[data-room-jump]');
  const previous = document.querySelector<HTMLButtonElement>('[data-room-prev]');
  const next = document.querySelector<HTMLButtonElement>('[data-room-next]');
  const position = document.querySelector<HTMLElement>('[data-room-position]');
  if (!board || !track || !heads.length || !jump || !previous || !next || !position) return;

  let current = 0;
  // A control-driven scroll must not be interpreted as a manual swipe, otherwise
  // the selected room snaps back to whichever column happens to sit at the left edge.
  let programmatic = false;

  const columnWidth = () => heads[0]!.getBoundingClientRect().width;
  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

  const syncControls = () => {
    jump.value = String(current);
    const label = `${current + 1}／${heads.length}`;
    if (position.textContent !== label) position.textContent = label;
    const atStart = current <= 0;
    const atEnd = current >= heads.length - 1;
    previous.disabled = atStart;
    next.disabled = atEnd;
    board.toggleAttribute('data-scroll-start', atStart);
    board.toggleAttribute('data-scroll-end', atEnd);
  };

  // Bring the room fully into view, scrolling as little as possible. At tablet
  // widths several rooms are visible at once, so aligning every selection to the
  // left edge would scroll past the last reachable column.
  const reveal = (index: number, behavior: ScrollBehavior) => {
    const width = columnWidth();
    if (!width || !track.clientWidth) return;
    const left = index * width;
    const right = left + width;
    const viewLeft = track.scrollLeft;
    const viewRight = viewLeft + track.clientWidth;
    let target = viewLeft;
    if (left < viewLeft) target = left;
    else if (right > viewRight) target = right - track.clientWidth;
    target = Math.max(0, Math.min(maxScroll(), target));
    if (Math.abs(target - viewLeft) > 0.5) {
      programmatic = true;
      track.scrollTo({ left: target, behavior });
    }
  };

  const selectRoom = (index: number) => {
    const target = Math.max(0, Math.min(heads.length - 1, index));
    if (!columnWidth()) return;
    current = target;
    reveal(target, reducedMotion() ? 'instant' : 'smooth');
    syncControls();
  };

  const update = () => {
    if (!track.clientWidth || !columnWidth()) {
      previous.disabled = true;
      next.disabled = true;
      return;
    }
    if (!programmatic) {
      current = Math.max(
        0,
        Math.min(heads.length - 1, Math.round(track.scrollLeft / columnWidth())),
      );
    }
    syncControls();
  };

  const release = () => {
    programmatic = false;
  };

  previous.addEventListener('click', () => selectRoom(current - 1));
  next.addEventListener('click', () => selectRoom(current + 1));
  jump.addEventListener('change', () => selectRoom(Number(jump.value)));
  track.addEventListener('scroll', update, { passive: true });
  track.addEventListener('pointerdown', release, { passive: true });
  track.addEventListener('wheel', release, { passive: true });
  track.addEventListener('keydown', release);

  // Keep the selected room when rotation changes the width of each column.
  let measuredColumnWidth = columnWidth();
  new ResizeObserver(() => {
    const width = columnWidth();
    if (!width || !track.clientWidth) return;
    if (measuredColumnWidth && Math.abs(width - measuredColumnWidth) > 0.5) {
      programmatic = true;
      reveal(current, 'instant');
    }
    measuredColumnWidth = width;
    update();
  }).observe(track);

  document.addEventListener('agenda:filters-changed', () => {
    const width = columnWidth();
    if (!width) return;
    const matches = [
      ...board.querySelectorAll<HTMLElement>('[data-session][data-listed="true"]:not([data-dim])'),
    ];
    const visible = matches.some((session) => {
      const from = (Number(session.dataset.c0) - 1) * width;
      const to = (Number(session.dataset.c1) - 1) * width;
      return from < track.scrollLeft + track.clientWidth && to > track.scrollLeft;
    });
    if (!visible && matches[0]) selectRoom(Number(matches[0].dataset.c0) - 1);
    else update();
  });

  update();
}
