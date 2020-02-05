
<script>
import { THEME } from '@/store/prefs';
import { getVendor, getProduct } from '@/config/private-label';

export default {
  middleware: ['authenticated'],

  head() {
    const theme = this.$store.getters['prefs/get'](THEME);

    return {
      bodyAttrs: { class: `theme-${ theme } dashboard-body` },
      title:     `${ getVendor() } ${ getProduct() }`,
    };
  },
};
</script>

<template>
  <main>
    <nuxt />
  </main>
</template>
