import { site } from './site';

const destination = `${site.venue.org} ${site.venue.name} ${site.venue.address}`;
const directionsUrl = (travelmode: 'walking' | 'driving', origin?: string) => {
  const params = new URLSearchParams({ api: '1', destination, travelmode });
  if (origin) params.set('origin', origin);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
};

export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`;

export const transportModes = [
  {
    id: 'bus',
    label: '市區公車',
    icon: 'bus',
    kind: 'public',
    title: '紅 14 線',
    description: '搭乘紅 14 線，於「中央研究院南部院區站」下車，步行約 1 分鐘抵達。',
    mapLinks: [
      { label: '從南部院區站步行導航', href: directionsUrl('walking', '中央研究院南部院區站') },
    ],
  },
  {
    id: 'thsr',
    label: '高鐵',
    icon: 'train-fast',
    kind: 'public',
    title: '高鐵臺南站',
    description: '從高鐵臺南站步行至南部院區，約 10–15 分鐘。',
    mapLinks: [
      { label: '從高鐵臺南站步行導航', href: directionsUrl('walking', '高鐵臺南站') },
    ],
  },
  {
    id: 'tra',
    label: '臺鐵',
    icon: 'train',
    kind: 'public',
    title: '臺鐵沙崙站',
    description: '從臺鐵沙崙站步行至南部院區，約 10–15 分鐘。',
    mapLinks: [
      { label: '從臺鐵沙崙站步行導航', href: directionsUrl('walking', '臺鐵沙崙站') },
    ],
  },
  {
    id: 'car',
    label: '開車',
    icon: 'car',
    kind: 'driving',
    title: '自行開車',
    mapLinks: [
      { label: '以 Google 地圖規劃開車路線', href: directionsUrl('driving') },
    ],
  },
  {
    id: 'shuttle',
    label: '接駁車',
    kind: 'pending',
  },
] as const;

export const drivingRoutes = [
  {
    id: 'highway-1',
    title: '國道 1 號',
    directions: [
      {
        label: '南下／北上',
        steps: [
          '國道 1 號於仁德系統接台 86 線，往臺南／關廟方向',
          '大潭交流道下，往高鐵站方向行駛',
        ],
      },
    ],
  },
  {
    id: 'highway-3',
    title: '國道 3 號',
    directions: [
      {
        label: '南下',
        steps: [
          '國道 3 號於關廟系統接台 86 線，往東通往歸仁方向',
          '大潭交流道下',
        ],
      },
      {
        label: '北上',
        steps: [
          '國道 3 號接台 86 線，往東通往歸仁方向',
          '大潭交流道下',
        ],
      },
    ],
  },
  {
    id: 'city-roads',
    title: '市區道路',
    directions: [
      {
        label: '路線 1・往大潭方向',
        steps: [
          '中正南路二段',
          '左轉歸仁八路',
          '直行通過歸仁大道至歸仁五路',
          '右轉高發二路',
          '左轉歸仁十三路一段，抵達南部院區',
        ],
      },
      {
        label: '路線 2・往高鐵站方向',
        steps: [
          '右轉高發二路',
          '左轉歸仁十三路一段，抵達南部院區',
        ],
      },
    ],
  },
] as const;
