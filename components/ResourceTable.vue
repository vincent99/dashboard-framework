<script>
import { get } from '@/utils/object';
import { mapPref, GROUP_RESOURCES } from '@/store/prefs';
import ButtonGroup from '@/components/ButtonGroup';
import SortableTable from '@/components/SortableTable';
import {
  NAME, NAME_UNLINKED,
  NAMESPACE_NAME, NAMESPACE_NAME_UNLINKED,
  NAMESPACE_NAME_IMAGE, NAME_IMAGE,
  AGE,
} from '@/config/table-headers';

export default {
  components: { ButtonGroup, SortableTable },

  props: {
    schema: {
      type:     Object,
      required: true,
    },

    rows: {
      type:     Array,
      required: true
    },

    headers: {
      type:    Array,
      default: null,
    },
    showGroups: {
      type:    Boolean,
      default: true
    },
    search: {
      // Show search input to filter rows
      type:    Boolean,
      default: true
    },
    tableActions: {
      // Show bulk table actions
      type:    Boolean,
      default: true
    },
  },

  computed: {
    namespaced() {
      const namespaced = !!get( this.schema, 'attributes.namespaced');

      return namespaced;
    },

    showNamespaceColumn() {
      const groupNamespaces = this.group === 'namespace';
      const out = this.groupable && !groupNamespaces;

      return out;
    },

    _headers() {
      let headers;
      const showNamespace = this.showNamespaceColumn;

      if ( this.headers ) {
        headers = this.headers.slice();
      } else {
        headers = headersFor(this.schema, false);
      }

      // If only one namespace is selected, replace the namespace_name
      // column with the just name one.
      if ( !showNamespace ) {
        let idx = headers.indexOf(NAMESPACE_NAME);

        if ( idx >= 0 ) {
          headers.splice(idx, 1, NAME);
        }

        idx = headers.indexOf(NAMESPACE_NAME_IMAGE);

        if ( idx >= 0 ) {
          headers.splice(idx, 1, NAME_IMAGE);
        }

        idx = headers.indexOf(NAMESPACE_NAME_UNLINKED);

        if ( idx >= 0 ) {
          headers.splice(idx, 1, NAME_UNLINKED);
        }
      }

      return headers;
    },

    filteredRows() {
      const namespaces = this.$store.getters['namespaces'];

      if ( !this.namespaced ) {
        return this.rows;
      }

      const include = namespaces.filter(x => !x.startsWith('!'));
      const exclude = namespaces.filter(x => x.startsWith('!')).map(x => x.substr(1) );

      return this.rows.filter((x) => {
        const ns = x.metadata.namespace;

        if ( include.length && !include.includes(ns) ) {
          return false;
        }

        if ( exclude.length && exclude.includes(ns) ) {
          return false;
        }

        return true;
      });
    },

    group: mapPref(GROUP_RESOURCES),

    groupable() {
      return this.$store.getters['multipleNamespaces'] && this.namespaced;
    },

    groupBy() {
      if ( this.group === 'namespace' && this.groupable && this.showGroups) {
        return 'metadata.namespace';
      }

      return null;
    },

    groupOptions() {
      return [
        { value: 'none', icon: 'icon-list-flat' },
        { value: 'namespace', icon: 'icon-list-grouped' }
      ];
    },
  },

  methods: {
    setGroup(group) {
      this.group = group;
    },
  },
};

function headersFor(schema) {
  const out = [];
  const attributes = schema.attributes || {};
  const columns = attributes.columns;
  const namespaced = attributes.namespaced;

  let hasName = false;

  for ( const col of columns ) {
    if ( col.format === 'name' && col.field === 'metadata.name' ) {
      hasName = true;
      out.push(namespaced ? NAMESPACE_NAME : NAME);
    } else if ( col.format === 'date' && col.field === 'metadata.creationTimestamp' ) {
      out.push(AGE);
    } else {
      let formatter, width;

      if ( col.format === 'date' || col.type === 'date' ) {
        formatter = 'Date';
        width = 120;
      }

      out.push({
        name:  col.name.toLowerCase(),
        label: col.name,
        value: col.field.startsWith('.') ? `$${ col.field }` : col.field,
        sort:  [col.field],
        formatter,
        width,
      });
    }
  }

  if ( !hasName ) {
    out.unshift(namespaced ? NAMESPACE_NAME : NAME);
  }

  return out;
}
</script>

<template>
  <div>
    <SortableTable
      v-bind="$attrs"
      :headers="_headers"
      :rows="filteredRows"
      :group-by="groupBy"
      :search="search"
      :table-actions="tableActions"
      key-field="_key"
      v-on="$listeners"
    >
      <template v-if="groupable && showGroups" #header-middle>
        <slot name="more-header-middle" />
        <ButtonGroup v-model="group" :options="groupOptions" />
      </template>

      <!-- Pass down templates provided by the caller -->
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </SortableTable>
  </div>
</template>
