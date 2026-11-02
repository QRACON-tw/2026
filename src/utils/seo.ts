import { roomById } from '../data/rooms';
import { isListed, sessions } from '../data/sessions';
import { site } from '../data/site';
import { lowestFare } from '../data/tickets';
import type { Session } from '../types/agenda';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export type StructuredData = Record<string, unknown>;

const absoluteUrl = (path: string, siteUrl: URL) => new URL(path, siteUrl).href;

export const organizationId = (siteUrl: URL) => absoluteUrl('/#organization', siteUrl);
export const websiteId = (siteUrl: URL) => absoluteUrl('/#website', siteUrl);
export const eventId = (siteUrl: URL) => absoluteUrl('/#event', siteUrl);

export const INDEXABLE_PAGES = [
  '/',
  '/about/',
  '/agenda/',
  '/team/',
] as const;

// A session needs both a unique abstract and a named speaker before it earns an index entry.
export const isIndexableSession = (session: Session) =>
  isListed(session) && Boolean(session.abstract?.trim() && session.speakerIds.length);

export function getIndexablePaths(): string[] {
  return [
    ...INDEXABLE_PAGES,
    ...sessions.filter(isIndexableSession).map((session) => `/agenda/${session.id}/`),
  ];
}

export function buildSiteStructuredData(siteUrl: URL): StructuredData[] {
  const homepage = absoluteUrl('/', siteUrl);
  const orgId = organizationId(siteUrl);

  return [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: site.organizers?.[0] ?? site.advisor,
      alternateName: site.advisor,
      url: homepage,
      email: site.contactEmail ? `mailto:${site.contactEmail}` : undefined,
      sameAs: site.social.map((item) => item.url),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId(siteUrl),
      url: homepage,
      name: `${site.name} ${site.nameZh}`,
      alternateName: site.nameEn,
      description: site.description,
      inLanguage: 'zh-Hant-TW',
      publisher: { '@id': orgId },
    },
  ];
}

export function buildEventStructuredData(siteUrl: URL): StructuredData {
  const homepage = absoluteUrl('/', siteUrl);
  const endTime = sessions.reduce(
    (latest, session) => (session.end > latest ? session.end : latest),
    `${site.date}T17:30:00+08:00`,
  );
  const availability =
    site.registration.status === 'open'
      ? 'https://schema.org/InStock'
      : site.registration.status === 'closed'
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/PreOrder';

  return {
    '@type': 'Event',
    '@id': eventId(siteUrl),
    name: `${site.name} ${site.nameZh}`,
    alternateName: site.nameEn,
    description: site.description,
    url: homepage,
    image: [absoluteUrl('/og-image.png', siteUrl)],
    startDate: `${site.date}T${site.eventStart}:00+08:00`,
    endDate: endTime,
    doorTime: `${site.date}T${site.checkIn}:00+08:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    inLanguage: 'zh-Hant-TW',
    isAccessibleForFree: false,
    keywords: ['QRACON', '量子電腦', '量子科技', '學生年會', '臺南'],
    location: {
      '@type': 'Place',
      name: `${site.venue.org}${site.venue.name}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.venue.city,
        addressCountry: 'TW',
      },
    },
    organizer: { '@id': organizationId(siteUrl) },
    offers: {
      '@type': 'Offer',
      url: site.registration.url ?? homepage,
      price: lowestFare,
      priceCurrency: 'TWD',
      availability,
      category: '學生票',
    },
  };
}

export function buildBreadcrumbStructuredData(
  items: BreadcrumbItem[],
  siteUrl: URL,
): StructuredData {
  const currentUrl = absoluteUrl(items.at(-1)?.href ?? '/', siteUrl);

  return {
    '@type': 'BreadcrumbList',
    '@id': `${currentUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href, siteUrl),
    })),
  };
}

export function buildSessionStructuredData(session: Session, siteUrl: URL): StructuredData {
  const sessionUrl = absoluteUrl(`/agenda/${session.id}/`, siteUrl);
  const roomNames =
    session.rooms === 'all' ? '全體' : session.rooms.map((id) => roomById(id).name).join('、');

  return {
    '@type': 'Event',
    '@id': `${sessionUrl}#event`,
    name: session.title,
    description:
      session.abstract?.trim() ||
      `${session.title}，QRACON 2026 議程草案場次，時間為 ${site.dateLabel}。`,
    url: sessionUrl,
    image: [absoluteUrl('/og-image.png', siteUrl)],
    startDate: session.start,
    endDate: session.end,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: roomNames,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.venue.city,
        addressCountry: 'TW',
      },
    },
    organizer: { '@id': organizationId(siteUrl) },
    superEvent: { '@id': eventId(siteUrl) },
  };
}
