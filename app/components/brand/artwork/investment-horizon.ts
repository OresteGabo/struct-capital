import { disc, line, plane, type PatternArtwork } from './types'

export const investmentHorizon = {
  'investment-horizon-01': {
    desktop: [
      plane('M430 610 C620 450 695 626 880 500 S1115 500 1230 461 V620Z', 'veil'),
      plane('M560 620 C730 505 800 601 965 542 S1110 539 1230 562 V620Z'),
      line('M560 620 C730 505 800 601 965 542 S1110 539 1230 562', .3, 'gold'),
    ],
    mobile: [plane('M-25 365 C75 290 126 380 238 320 S354 323 425 337 V380Z'), line('M-25 365 C75 290 126 380 238 320 S354 323 425 337', .3, 'gold')],
  },
  'investment-horizon-02': {
    desktop: [
      disc(976, 310, 102),
      plane('M620 620 C760 520 872 320 1012 387 S1140 474 1240 420 V620Z'),
      plane('M760 620 C930 492 1020 562 1240 529 V620Z', 'veil'),
      line('M620 620 C760 520 872 320 1012 387 S1140 474 1240 420', .35, 'gold'),
    ],
    mobile: [disc(345, 228, 64), plane('M120 380 C230 355 247 234 330 271 S390 329 430 287 V380Z')],
  },
  'investment-horizon-03': {
    desktop: [
      plane('M-20 480 C128 426 260 577 490 620 H-20Z', 'veil'),
      plane('M755 620 C919 536 990 394 1240 461 V620Z'),
      line('M755 620 C919 536 990 394 1240 461', .35, 'gold'),
    ],
    mobile: [plane('M200 380 C280 326 314 270 430 289 V380Z'), line('M200 380 C280 326 314 270 430 289', .35, 'gold')],
  },
  'investment-horizon-04': {
    desktop: [
      plane('M-20 30 Q160 8 420 28 H750 L714 42 H-20Z', 'veil'),
      plane('M440 77 Q760 57 1220 80 V93 H500Z'),
      plane('M140 132 Q370 118 820 135 L785 147 H160Z', 'veil', .6),
    ],
    mobile: [plane('M-20 28 Q100 13 265 28 L242 39 H-20Z', 'veil'), plane('M137 73 Q265 58 430 73 V85 H157Z')],
  },
} satisfies Record<string, PatternArtwork>
