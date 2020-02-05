// Note: 'id' is always the last sort, so you don't have to specify it here.

export const STATE = {
  name:      'state',
  label:     'State',
  sort:      ['stateSort', 'nameSort'],
  value:     'stateDisplay',
  width:     75,
  default:   'unknown',
  formatter: 'BadgeState',
};

export const NAME = {
  name:      'name',
  label:     'Name',
  value:     'nameDisplay',
  sort:      ['nameSort'],
  formatter: 'LinkDetail',
};

export const NAME_UNLINKED = {
  name:      'name',
  label:     'Name',
  value:     'nameDisplay',
  sort:      ['nameSort'],
};

export const NAMESPACE_NAME = {
  name:      'namespace-name',
  label:     'Name',
  value:     'namespaceNameDisplay',
  sort:      ['namespaceNameSort'],
  formatter: 'LinkDetail',
};

export const NAMESPACE_NAME_UNLINKED = {
  name:      'namespace-name',
  label:     'Name',
  value:     'namespaceNameDisplay',
  sort:      ['namespaceNameSort'],
};

export const NAMESPACE_NAME_IMAGE = {
  name:      'namespace-name-image',
  label:     'Name',
  value:     'namespaceNameDisplay',
  sort:      ['namespaceNameSort'],
  formatter: 'LinkDetailImage',
};

export const NAME_IMAGE = {
  name:      'name-image',
  label:     'Name',
  value:     'nameDisplay',
  sort:      ['nameSort'],
  formatter: 'LinkDetailImage',
};

export const AGE = {
  name:       'age',
  label:      'Age',
  value:      'metadata.creationTimestamp',
  sort:       ['createdTs', 'nameSort'],
  search:     false,
  formatter:  'LiveDate',
  width:      75,
  align:     'right'
};

export const CREATED = {
  name:       'created',
  label:      'Created',
  value:      'metadata.creationTimestamp',
  sort:       ['created', 'name'],
  search:     false,
  formatter:  'LiveDate',
  align:     'right'
};

export const IMAGE = {
  name:  'image',
  label: 'Image',
  value: 'image',
  sort:  ['image', 'nameSort'],
};
