import { sortBy } from '@/utils/sort';
import { matches } from '@/config/private-label';

export const LEFT = 'left';
export const RIGHT = 'right';

const items = [];
let nextId = 1;

/* Item options: {
  label, // Static text, overrides translationKey
  translationKey, // Get the label from a translation
  url,
  side = LEFT,
  external = true,
  weight = 1
  pl = ANY
} */

export function addFooter(item) {
  item.side = item.side || LEFT;
  item.weight = item.weight || 1;
  item.id = nextId++;

  items.push(item);
}

// ---------------------------------------

export function leftItems() {
  const left = items.filter(x => x.side === LEFT && matches(x.pl));

  return sortBy(left, ['weight:desc', 'id']);
}

export function rightItems() {
  const left = items.filter(x => x.side === RIGHT && matches(x.pl));

  return sortBy(left, ['weight', 'id:desc']);
}
