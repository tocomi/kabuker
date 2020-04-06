<template>
  <div v-if="isShown" class="snackbar-wrapper">
    <div :class="barClass" class="snackbar">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShown: {
      type: Boolean,
      required: true,
      default: false,
    },
    message: {
      type: String,
      required: true,
      default: 'だなも！',
    },
    level: {
      type: String,
      required: true,
      default: 'INFO',
    },
  },
  computed: {
    barClass() {
      if (this.level === 'ERROR') {
        return 'error';
      }
      return 'info';
    },
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.snackbar-wrapper {
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 16px;
  width: 100%;
  z-index: 1000;

  .snackbar {
    align-items: center;
    background-color: #54c9ff;
    border-radius: 20px;
    color: white;
    display: flex;
    font-weight: bold;
    height: 40px;
    justify-content: center;
    width: 90%;

    &.error {
      background-color: #f2601d;
    }
  }
}
</style>
