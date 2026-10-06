/**
 * UDAAN LIVE EVENT LIFECYCLE ENGINE
 * Timezone standard: Asia/Kolkata (IST: UTC+05:30)
 * 
 * Determines event state:
 * - UPCOMING : Current time < startDate
 * - LIVE     : Current time >= startDate && Current time <= endDate
 * - ARCHIVED : Current time > endDate
 * 
 * Supports administrative overrides ('MANUAL' mode) for postponements or demonstrations.
 */

export const LIFECYCLE_STATES = {
  UPCOMING: 'UPCOMING',
  LIVE: 'LIVE',
  ARCHIVED: 'ARCHIVED',
};

/**
 * Returns current timestamp adjusted to Asia/Kolkata
 */
export function getKolkataTime() {
  const now = new Date();
  // Return standard Date object
  return now;
}

/**
 * Evaluates the lifecycle state of an event record.
 * 
 * @param {Object} event - Event record from single source of truth
 * @param {string|null} forcedOverride - Optional admin simulation override ('UPCOMING' | 'LIVE' | 'ARCHIVED')
 * @returns {string} 'UPCOMING' | 'LIVE' | 'ARCHIVED'
 */
export function getEventLifecycleState(event, forcedOverride = null) {
  if (!event) return LIFECYCLE_STATES.UPCOMING;

  // 1. Explicit admin/developer simulation override
  if (forcedOverride && Object.values(LIFECYCLE_STATES).includes(forcedOverride)) {
    return forcedOverride;
  }

  // 2. Manual status override in event record
  if (event.statusMode === 'MANUAL' && event.statusOverride) {
    return event.statusOverride.toUpperCase();
  }

  // 3. Fallback to static status if dates missing
  if (!event.startDate || !event.endDate) {
    if (event.status === 'past') return LIFECYCLE_STATES.ARCHIVED;
    if (event.status === 'live' || event.status === 'current') return LIFECYCLE_STATES.LIVE;
    return LIFECYCLE_STATES.UPCOMING;
  }

  // 4. Time-based automatic state engine (Asia/Kolkata)
  const now = new Date().getTime();
  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();

  if (now < start) {
    return LIFECYCLE_STATES.UPCOMING;
  } else if (now >= start && now <= end) {
    return LIFECYCLE_STATES.LIVE;
  } else {
    return LIFECYCLE_STATES.ARCHIVED;
  }
}

/**
 * Returns emotional tone, labels, and badges based on state
 */
export function getStatePresentation(state, event) {
  switch (state) {
    case LIFECYCLE_STATES.LIVE:
      return {
        state: LIFECYCLE_STATES.LIVE,
        statusLabel: 'LIVE NOW',
        badgeLabel: 'LIVE NOW',
        pulse: true,
        mood: 'presence',
        heroHeadlinePrefix: 'UDAAN',
        heroHeadlineEmphasized: 'IS LIVE.',
        heroSub: `${event?.venue?.name || event?.venue || 'Patna'} • Ground Floor Exhibition Hall`,
        primaryCtaLabel: 'REGISTER TO VISIT',
        primaryCtaPath: '/visitors',
        secondaryCtaLabel: 'GET DIRECTIONS',
        secondaryCtaPath: event?.venue?.googleMapsUrl || '#venue-info',
        themeAccent: '#D9A441',
        themeBg: 'bg-[#2A0E15]',
      };

    case LIFECYCLE_STATES.ARCHIVED:
      return {
        state: LIFECYCLE_STATES.ARCHIVED,
        statusLabel: 'FROM THE ARCHIVE',
        badgeLabel: 'ARCHIVED CHAPTER',
        pulse: false,
        mood: 'memory',
        heroHeadlinePrefix: 'THE MOMENT',
        heroHeadlineEmphasized: 'BECAME A MEMORY.',
        heroSub: `Documented Heritage • ${event?.dateDisplay || event?.date || event?.dates}`,
        primaryCtaLabel: 'EXPLORE ARCHIVE GALLERY',
        primaryCtaPath: '#archive-gallery',
        secondaryCtaLabel: 'EXPLORE UPCOMING EVENTS',
        secondaryCtaPath: '/events',
        themeAccent: '#B8801F',
        themeBg: 'bg-[#1C1117]',
      };

    case LIFECYCLE_STATES.UPCOMING:
    default:
      return {
        state: LIFECYCLE_STATES.UPCOMING,
        statusLabel: event?.bookingStatus || 'STALL BOOKINGS OPEN',
        badgeLabel: 'COMING SOON',
        pulse: false,
        mood: 'anticipation',
        heroHeadlinePrefix: 'THE NEXT CHAPTER',
        heroHeadlineEmphasized: 'IS ALMOST HERE.',
        heroSub: `${event?.dateDisplay || event?.date || event?.dates} • ${event?.city || 'Patna'}`,
        primaryCtaLabel: 'BOOK YOUR STALL',
        primaryCtaPath: '/book-a-stall',
        secondaryCtaLabel: 'PLAN YOUR VISIT',
        secondaryCtaPath: '/visitors',
        themeAccent: '#D9A441',
        themeBg: 'bg-[#171416]',
      };
  }
}

/**
 * Calculates countdown strictly when confirmed start date is present.
 */
export function getConfirmedCountdown(startDateString) {
  if (!startDateString) return null;
  const start = new Date(startDateString).getTime();
  const now = new Date().getTime();
  const diff = start - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
