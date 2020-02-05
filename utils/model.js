const cache = {};

export function lookup(type) {
  let impl = cache[type];

  if ( impl ) {
    return impl.default;
  } else if ( typeof impl !== 'undefined' ) {
    return null;
  }

  try {
    impl = require(`@/models/${ type }`);
    cache[type] = impl;

    return impl.default;
  } catch (e) {
  }

  cache[type] = null;

  return null;
}
