import { sortBy } from '@/utils/sort';
import { matches } from '@/config/private-label';

const packages = [];
let nextId = 1;

/* Item options: {
  label, // Static text, overrides translationKey
  translationKey, // Get the label from a translation
  path: // Base URL path for the router
  countsType, // If this resource is listed in the counts API, what its name is
  weight = 1
  pl = ANY
} */

export function addPackage(item) {
  item.weight = item.weight || 1;
  item.id = nextId++;

  packages.push(item);
}

// ---------------------------------------

export function getPackages() {
  const left = packages.filter(matches(x.pl));

  return sortBy(left, ['weight:desc', 'id']);
}
