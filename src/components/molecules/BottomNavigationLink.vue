<template>
  <div class="bottom-navigation-link-wrapper">
    <div @click="jumpPage" :class="{ selected: selected }" class="bottom-navigation-link">
      <fa :icon="icon" size="lg" />
      <span class="bottom-navigation-link__label">{{ label }}</span>
    </div>
  </div>
</template>

<script>
import { faEdit, faListAlt, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

export default {
  props: {
    to: {
      type: String,
      required: true,
      default: '/',
    },
    iconName: {
      type: String,
      required: true,
      default: '',
    },
    label: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    icon() {
      if (this.iconName === 'faEdit') return faEdit;
      if (this.iconName === 'faListAlt') return faListAlt;
      if (this.iconName === 'faEnvelopeOpenText') return faEnvelopeOpenText;
      return '';
    },
    selected() {
      return this.to === this.$route.path;
    },
  },
  methods: {
    jumpPage() {
      this.$router.push(this.to);
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-navigation-link-wrapper {
  height: inherit;
  text-align: center;
  width: 64px;
}

.bottom-navigation-link {
  align-items: center;
  color: #777;
  display: flex;
  flex-direction: column;
  height: inherit;
  justify-content: space-evenly;

  &__label {
    font-size: 12px;
  }

  &.selected {
    color: $green;
  }
}
</style>
