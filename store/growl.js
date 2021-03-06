export const state = function() {
  return {};
};

export const actions = {
  fromError({ commit }, { title, err }) {
    // @TODO actual growls...
    alert(`${ title }: ${ stringify(err) }`);
  }
};

export function stringify(err) {
  let str;

  if ( typeof err === 'string' ) {
    str = err;
  } else if ( typeof err === 'object' ) {
    if ( err.message ) {
      str = err.message;
      if ( err.detail ) {
        if ( str ) {
          str += ` (${ err.detail })`;
        } else {
          str = err.detail;
        }
      }
    } else if ( err.detail ) {
      str = err.detail;
    }
  } else {
    // Good luck...
    str = `${ err }`;
  }

  return str;
}
