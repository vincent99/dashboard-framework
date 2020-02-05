const preloads = [];
const switches = [];

export function addPreload(method, name, arg) {
  preloads.push({
    method, name, arg
  });
}

export function addSwitchHandler(method, arg, name) {
  switches.push({
    method, name, arg
  });
}

// ----------------------------------

export function preloadHandlers(context) {
  return preloads.map((item) => {
    return context[item.method](item.name, item.arg);
  });
}

export function switchHandlers(context) {
  return switches.map((item) => {
    return context[item.method](item.name, item.arg);
  });
}
