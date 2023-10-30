import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
  state,
} from '@angular/animations';

// Sidebar Menu
export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('250ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('250ms', style({ opacity: 0 })),
  ]),
]);
export const rotate = trigger('rotate', [
  transition(':enter', [
    animate(
      '1000ms',
      keyframes([
        style({ transform: 'rotate(0deg)', offset: 0 }),
        style({ transform: 'rotate(2turn)', offset: 1 }),
      ])
    ),
  ]),
]);
// Sublevel Menu
export const slideInOut = trigger('slideInOut', [
  state(
    'hidden',
    style({
      height: '0',
      overflow: 'hidden',
    })
  ),
  state(
    'visible',
    style({
      height: '*',
    })
  ),
  transition('visible <=> hidden', [
    style({ overflow: 'hidden' }),
    animate('{{transitionParams}}'),
  ]),
  transition('void => *', animate(0)),
]);
