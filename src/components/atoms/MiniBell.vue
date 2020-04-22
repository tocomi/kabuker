<template>
  <div :class="[even, current]" class="mini-bell-wrapper">
    <div class="price">
      <span>{{ trimmedPrice }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    currentIndex: {
      type: Number,
      required: true,
      default: -1,
    },
  },
  computed: {
    trimmedPrice() {
      return this.price ? this.price : '';
    },
    even() {
      return this.index % 2 === 0 ? 'even' : 'noeven';
    },
    current() {
      return this.index === this.currentIndex ? 'current' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
$bg-color: #eeb209;
$font-color: white;

.mini-bell-wrapper {
  align-items: center;
  background-color: $font-color;
  border-radius: 40%;
  color: $bg-color;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  justify-content: center;
  height: 8px;
  text-align: center;
  transform: rotate(-4deg);
  width: 32px;

  &.even {
    margin-top: -6px;
  }

  &.noeven {
    margin-top: 6px;
  }

  &.current {
    background-color: #fffd7d;
  }

  .price {
    color: $bg-color;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
