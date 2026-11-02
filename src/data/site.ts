
import { lowestFare } from './tickets';

export type RegistrationStatus = 'soon' | 'open' | 'closed';

interface SiteInfo {
  name: string;
  nameZh: string;
  nameEn: string;
  edition: number;
  editionLabel: string;
  
  date: string;
  dateLabel: string;
  weekday: string;
  weekdayEn: string;
  
  rocDate: string;
  checkIn: string;
  eventStart: string;
  timeZone: string;
  venue: { org: string; name: string; city: string; address: string | null };
  advisor: string;
  organizers: string[] | null;
  theme: { title: string | null; tagline: string | null };
  registration: { status: RegistrationStatus; url: string | null; price: string | null };
  contactEmail: string | null;
  social: { label: string; url: string }[];
  description: string;
}

export const site: SiteInfo = {
  name: 'QRACON 2026',
  nameZh: '學生量子電腦年會',
  nameEn: 'Quantum Revolution Assembly CONvention',
  edition: 4,
  editionLabel: '第四屆',
  date: '2026-12-13',
  dateLabel: '2026.12.13',
  weekday: '日',
  weekdayEn: 'SUN',
  rocDate: '115.12.13',
  checkIn: '08:00',
  // KKTIX 活動開始時間；08:00 是網站議程表的報到時間。
  eventStart: '08:30',
  timeZone: 'Asia/Taipei',
  venue: {
    org: '中央研究院',
    name: '南部院區',
    city: '臺南',
    // TODO(venue): 門牌地址待主辦團隊確認。
    address: null,
  },
  advisor: 'EntangleTech',
  organizers: ['EntangleTech 前瞻量子教育平台'],
  theme: {
    title: '薛丁格的貓',
    tagline: '量子冒險者',
  },
  registration: {
    // 售票頁：KKTIX（2026-11-01 核對，已開賣）。
    status: 'open',
    url: 'https://sqcs.kktix.cc/events/qracon2026',
    // 票種多於一種，這裡只放最低價；完整票種表見 src/data/tickets.ts。
    price: lowestFare.toLocaleString('en-US'),
  },
  contactEmail: 'sqcs12345@gmail.com',
  social: [{ label: 'Instagram', url: 'https://www.instagram.com/entangletech.2023' }],
  description:
    'QRACON 2026 學生量子電腦年會，2026 年 12 月 13 日（日）在中央研究院南部院區舉行。第四屆，由學生主導，讓量子科技的學術界、產業界與教育端在同一天交流。',
};

