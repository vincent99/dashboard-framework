<script>
import { get } from '@/utils/object';
import ResourceTable from '@/components/ResourceTable';
import { FRIENDLY } from '@/config/friendly';

export default {
  components: { ResourceTable },

  computed: {
    schema() {
      return this.$store.getters['cluster/schemaFor'](this.resource);
    },
    headers() {
      return get(FRIENDLY[this.resource], 'headers');
    },
  },

  asyncData(ctx) {
    const resource = ctx.params.resource;

    return ctx.store.dispatch('cluster/findAll', { type: resource }).then((rows) => {
      return {
        resource,
        rows
      };
    });
  },
}; </script>

<template>
  <div>
    <header>
      <h1>
        {{ schema.attributes.kind }}
      </h1>
      <div class="actions">
        <nuxt-link to="create" append tag="button" type="button" class="btn bg-primary">
          Create
        </nuxt-link>
      </div>
    </header>
    <ResourceTable :schema="schema" :rows="rows" :headers="headers" />
  </div>
</template>

<style lang="scss" scoped>
  .header {
    position: relative;
  }

  H2 {
    position: relative;
    margin: 0 0 20px 0;
  }

  .right-action {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
