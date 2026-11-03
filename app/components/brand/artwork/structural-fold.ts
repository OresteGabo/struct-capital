import { line, plane, type PatternArtwork } from './types'

export const structuralFold = {
  'structural-fold-01': {
    desktop: [
      plane('M690 205 Q690 180 714 166 L1240 -138 V55 L748 339 Q690 370 690 321Z', 'veil'),
      plane('M525 601 L1240 188 V365 L650 706Z'),
      plane('M760 465 V340 Q760 319 782 306 L1020 169 V324 Q1020 344 998 357Z', 'return'),
      line('M525 601 L1240 188', .7, 'gold'),
      line('M760 465 V340 Q760 319 782 306 L1020 169', .55, 'quiet'),
    ],
    mobile: [
      plane('M70 366 L440 152 V247 L165 406Z'),
      plane('M260 256 V173 Q260 159 274 151 L410 73 V169Z', 'return'),
      line('M70 366 L440 152', .7, 'gold'),
    ],
  },
  'structural-fold-02': {
    desktop: [
      plane('M828 610 V276 Q828 251 850 238 L1060 117 V448Z', 'veil'),
      plane('M1030 548 V129 Q1030 105 1052 92 L1235 -14 V430Z'),
      plane('M1030 338 L1160 413 V226 L1030 151Z', 'return'),
      line('M1030 548 V129 Q1030 105 1052 92 L1235 -14', .7, 'gold'),
      line('M1030 338 L1160 413', .5, 'quiet'),
    ],
    mobile: [
      plane('M291 395 V123 Q291 106 306 97 L430 26 V314Z'),
      plane('M291 240 L370 286 V170 L291 124Z', 'return'),
      line('M291 395 V123 Q291 106 306 97 L430 26', .7, 'gold'),
    ],
  },
  'structural-fold-03': {
    desktop: [
      plane('M630 -40 H1230 V75 L776 337 Q750 352 750 322 V190Z', 'veil'),
      plane('M800 -20 H1230 V156 L966 308 Q945 320 945 295 V147Z'),
      plane('M945 147 L1050 208 V25 L945 -36Z', 'return'),
      line('M750 322 V190 L630 -40 M945 295 V147 L800 -20', .4, 'quiet'),
    ],
    mobile: [
      plane('M252 -20 H430 V120 L342 171 Q326 181 326 161 V77Z'),
      plane('M326 77 L391 115 V-20 H270Z', 'return', .55),
      line('M326 161 V77 L252 -20', .55, 'gold'),
    ],
  },
  'structural-fold-04': {
    desktop: [
      plane('M80 111 L252 12 H1050 L878 111Z', 'veil'),
      plane('M80 111 H878 L932 142 H134Z', 'return'),
      line('M80 111 H878', .85, 'gold'),
    ],
    mobile: [
      plane('M92 54 L170 9 H430 L352 54Z', 'veil'),
      plane('M92 54 H352 L383 72 H123Z', 'return'),
      line('M92 54 H352', .85, 'gold'),
    ],
  },
} satisfies Record<string, PatternArtwork>
