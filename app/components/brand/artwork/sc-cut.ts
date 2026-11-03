import { line, plane, type PatternArtwork } from './types'

// Related ~30° cuts and softened returns; these are decorative shapes, not redrawn logos.
export const scCut = {
  'sc-cut-01': {
    desktop: [
      plane('M720 580 V274 Q720 251 740 239 L849 176 V505Z', 'veil'),
      plane('M884 527 V104 Q884 80 905 68 L1039 -9 V438Z'),
      plane('M1091 630 V349 Q1091 326 1111 314 L1245 237 V541Z', 'return'),
      line('M720 580 V274 Q720 251 740 239 L849 176 M884 527 V104 Q884 80 905 68 L1039 -9', .55, 'gold'),
    ],
    mobile: [
      plane('M192 374 V122 Q192 105 207 96 L278 55 V324Z'),
      plane('M320 407 V237 Q320 218 337 208 L423 158 V348Z', 'veil'),
      line('M192 374 V122 Q192 105 207 96 L278 55', .5, 'gold'),
    ],
  },
  'sc-cut-02': {
    desktop: [
      plane('M1230 48 L845 270 Q823 283 823 307 V439 Q823 462 845 475 L1090 617 V470 L960 395 V350 L1230 194Z'),
      plane('M823 439 Q823 462 845 475 L1090 617 V470 L845 329 Q823 317 823 307Z', 'return', .7),
      line('M1230 48 L845 270 Q823 283 823 307', .55, 'gold'),
    ],
    mobile: [
      plane('M430 60 L252 163 Q236 172 236 190 V257 Q236 275 252 284 L355 344 V264 L310 238 V215 L430 146Z'),
      plane('M236 257 Q236 275 252 284 L355 344 V264 L252 204 Q236 195 236 190Z', 'return', .7),
    ],
  },
  'sc-cut-03': {
    desktop: [
      plane('M800 320 L1054 173 V253 L800 400Z', 'veil'),
      plane('M1092 301 L1200 239 V315 L1092 377Z', 'return'),
      line('M800 320 L1054 173 M1092 301 L1200 239', .65, 'gold'),
    ],
    mobile: [plane('M294 237 L400 176 V245 L294 306Z', 'return'), line('M294 237 L400 176', .65, 'gold')],
  },
  'sc-cut-04': {
    desktop: [
      line('M110 84 H475 M725 84 H1090', .55),
      plane('M509 102 L572 66 H591 L528 102Z', 'return'),
      plane('M554 102 L617 66 H633 L570 102Z'),
      plane('M593 102 L656 66 H670 L607 102Z', 'veil'),
    ],
    mobile: [
      line('M20 51 H112 M292 51 H380', .55),
      plane('M136 65 L178 41 H192 L150 65Z', 'return'),
      plane('M169 65 L211 41 H222 L180 65Z'),
      plane('M199 65 L241 41 H252 L210 65Z', 'veil'),
    ],
  },
} satisfies Record<string, PatternArtwork>
