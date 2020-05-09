<template>
  <transition name="slide">
    <div v-if="isShown" class="snackbar-wrapper">
      <div :class="barClass" class="snackbar">
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class SnackbarComponent extends Vue {
  @Prop({ type: Boolean, required: true, default: false })
  isShown!: boolean;

  @Prop({ type: String, required: true, default: 'だなも！' })
  message!: string;

  @Prop({ type: String, required: true, default: 'INFO' })
  level!: string;

  /* computed */
  get barClass() {
    if (this.level === 'ERROR') {
      return 'error';
    }
    return 'info';
  }
}
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

.slide-enter-active, .slide-leave-active {
  transition: transform .7s
}
.slide-enter {
  transform: translateX(500px)
}
.slide-leave-active {
  transform: translateX(-500px);
}
</style>
