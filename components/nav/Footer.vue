<script>
import { mapGetters } from 'vuex';
import { leftItems, rightItems } from '@/config/footer';
import { mapPref, DEV } from '@/store/prefs';

export default {
  data() {
    return { version: process.env.version };
  },

  computed: {
    ...mapGetters('i18n', ['selectedLocaleLabel', 'availableLocales']),

    dev:    mapPref(DEV),

    showLocale() {
      return Object.keys(this.availableLocales).length > 1 || this.dev;
    },

    showNone() {
      return this.dev;
    },

    left() {
      return leftItems();
    },

    right() {
      return rightItems();
    }
  },

  methods: {
    switchLocale(locale) {
      this.$store.dispatch('i18n/switchTo', locale);
    }
  }
};

</script>

<template>
  <div class="footer">
    <div>{{ version }}</div>

    <div v-for="opt in left" :key="opt.id">
      <a
        v-t="opt.translationKey"
        :href="opt.url"
        :target="opt.external ? '_blank' : ''"
        :rel="opt.external ? 'nofollow noopener noreferrer' : ''"
      >{{ opt.label }}</a>
    </div>

    <div class="space" />

    <div v-for="opt in right" :key="opt.id">
      <a
        v-t="opt.translationKey"
        :href="opt.url"
        :target="opt.external ? '_blank' : ''"
        :rel="opt.external ? 'nofollow noopener noreferrer' : ''"
      >{{ opt.label }}</a>
    </div>

    <div v-if="showLocale">
      <v-popover
        placement="top"
        trigger="click"
      >
        <a>
          {{ selectedLocaleLabel }}
        </a>

        <template slot="popover">
          <ul class="list-unstyled dropdown" style="margin: -1px;">
            <li v-if="showNone" v-t="'locale.none'" class="p-10 hand" @click="switchLocale('none')" />
            <li
              v-for="(value, name) in availableLocales"
              :key="name"
              class="p-10 hand"
              @click="switchLocale(name)"
            >
              {{ value }}
            </li>
          </ul>
        </template>
      </v-popover>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    border-top: solid thin var(--border);

    > DIV {
      line-height: 30px;
      padding: 10px 20px;

      &.space {
        flex-grow: 1;
      }
    }
  }
</style>
