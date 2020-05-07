<template>
  <div class="bought-price">
    <div class="bought-price__label">
      <span>買い値</span>
    </div>
    <bell-input :hidden-time="true" :price="priceString" @onChange="onChange" />
  </div>
</template>

<script>
import BellInput from '../atoms/BellInput.vue';

export default {
  components: {
    BellInput,
  },
  props: {
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    priceString() {
      return String(this.price);
    },
  },
  methods: {
    onChange(value) {
      this.$emit('onChangeBoughtPrice', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.bought-price {
  align-items: center;
  background-color: #f1e6d5;
  border-radius: 8px;
  display: flex;
  height: 88px;
  justify-content: center;
  width: 100%;

  &__label {
    align-items: center;
    background-color: $orange;
    border-radius: 8px;
    color: white;
    display: flex;
    height: 32px;
    justify-content: center;
    margin-right: 24px;
    width: 96px;
  }
}
</style>
