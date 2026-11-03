import { line, plane, type PatternArtwork } from './types'

export const capitalArc = {
  'capital-arc-01': {
    desktop: [
      plane('M0 552 C220 650 410 640 655 540 S1010 330 1230 358 L1230 620 H0Z', 'veil', .55),
      ...Array.from({ length: 5 }, (_, i) => line(`M-40 ${530 + i * 12} C200 ${655 + i * 6} 410 ${647 + i * 8} 655 ${526 + i * 10} S1000 ${304 + i * 21} 1240 ${330 + i * 23}`, 1 - i * .13)),
    ],
    mobile: Array.from({ length: 3 }, (_, i) => line(`M-20 ${318 + i * 12} C100 ${393 + i * 4} 240 ${357 + i * 7} 430 ${259 + i * 15}`, 1 - i * .22)),
  },
  'capital-arc-02': {
    desktop: [
      plane('M680 620 C940 550 900 160 1240 35 L1240 620Z', 'veil', .65),
      ...Array.from({ length: 6 }, (_, i) => line(`M${760 + i * 20} 640 C${1000 + i * 5} 510 ${800 + i * 64} ${220 - i * 18} 1260 ${20 + i * 52}`, 1 - i * .1)),
    ],
    mobile: Array.from({ length: 3 }, (_, i) => line(`M${160 + i * 22} 390 C${385 + i * 5} 286 ${180 + i * 70} ${80 - i * 8} 440 ${22 + i * 64}`, 1 - i * .18)),
  },
  'capital-arc-03': {
    desktop: [
      ...Array.from({ length: 4 }, (_, i) => line(`M-40 ${150 + i * 17} C100 ${155 + i * 22} 145 ${382 + i * 13} ${375 - i * 28} 440`, .45 + i * .12)),
      ...Array.from({ length: 5 }, (_, i) => line(`M${805 + i * 27} 465 C${1000 + i * 20} 455 1030 ${190 + i * 16} 1250 ${170 + i * 17}`, 1 - i * .14)),
    ],
    mobile: Array.from({ length: 3 }, (_, i) => line(`M${230 + i * 30} 324 C${330 + i * 27} 290 300 ${148 + i * 24} 440 ${127 + i * 24}`, 1 - i * .2)),
  },
  'capital-arc-04': {
    desktop: Array.from({ length: 3 }, (_, i) => line(`M-10 ${102 + i * 10} C110 ${102 + i * 10} 160 ${62 + i * 10} 300 ${62 + i * 10} H470 M665 ${62 + i * 10} H880 C1010 ${62 + i * 10} 1050 ${102 + i * 10} 1210 ${102 + i * 10}`, 1 - i * .26)),
    mobile: [line('M-10 67 C40 67 55 44 110 44 H155 M235 44 H290 C345 44 360 67 410 67')],
  },
} satisfies Record<string, PatternArtwork>
