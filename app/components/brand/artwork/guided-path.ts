import { line, plane, ring, type PatternArtwork } from './types'

export const guidedPath = {
  'guided-path-01': {
    desktop: [
      line('M790 615 H866 Q913 615 913 568 V184 Q913 148 949 148 H1230', 1),
      line('M932 620 V204 Q932 168 968 168 H1230', .35, 'quiet'),
      ring(913, 441), ring(1088, 148),
    ],
    mobile: [line('M205 390 H281 Q317 390 317 354 V167 Q317 135 349 135 H430'), ring(317, 277, 5)],
  },
  'guided-path-02': {
    desktop: [
      line('M45 380 H265 Q310 380 310 335 V302 Q310 257 355 257 H510 Q555 257 555 302 V360 Q555 405 600 405 H777 Q822 405 822 360 V330 Q822 285 867 285 H1170'),
      ring(453, 257), ring(689, 405),
    ],
    mobile: [line('M330 30 V78 Q330 104 304 104 H292 Q266 104 266 130 V202 Q266 228 292 228 H310 Q336 228 336 254 V337'), ring(266, 166, 5)],
  },
  'guided-path-03': {
    desktop: [
      line('M785 591 V426 Q785 409 800 400 L1018 274 V151 Q1018 134 1033 125 L1220 17'),
      plane('M1001 258 L1034 239 V259 L1001 278Z', 'return'),
      line('M804 600 V442 L1000 329', .35, 'quiet'),
    ],
    mobile: [line('M275 379 V246 Q275 232 287 225 L412 153'), plane('M300 208 L327 192 V211 L300 227Z', 'return')],
  },
  'guided-path-04': {
    desktop: [line('M100 93 H480 Q505 93 518 71 L527 55 Q540 33 565 33 H660 Q685 33 698 55 L707 71 Q720 93 745 93 H1100'), ring(609, 33, 5)],
    mobile: [line('M18 68 H124 Q140 68 148 54 L154 44 Q162 30 178 30 H222 Q238 30 246 44 L252 54 Q260 68 276 68 H382'), ring(200, 30, 4)],
  },
} satisfies Record<string, PatternArtwork>
