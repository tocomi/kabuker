<template>
  <div class="button-wrapper">
    <button class="button" @click="click">
      <fa :icon="faSave" size="lg" />
    </button>
  </div>
</template>

<script>
import { faSave } from '@fortawesome/free-solid-svg-icons';

export default {
  computed: {
    faSave() {
      return faSave;
    },
  },
  methods: {
    click() {
      this.$emit('onClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  position: fixed;
  bottom: calc(20px + #{$bottom-nav-height} + env(safe-area-inset-bottom));
  right: 20px;
  text-align: center;

  .button {
    background-color: $blue;
    border: none;
    border-radius: 50%;
    box-shadow: 2px 2px 3px #999;
    color: #fffafa;
    font-family: 'M PLUS Rounded 1c';
    font-size: 18px;
    font-weight: bold;
    height: 60px;
    outline: none;
    width: 60px;
  }
}
</style>
