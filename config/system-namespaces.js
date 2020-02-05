import { addObject } from '@/utils/array';

const namespaces = [
  'kube-system',
  'kube-node-lease',
  'kube-public',
];

export function add(name) {
  addObject(namespaces, name);
}

export default namespaces;
