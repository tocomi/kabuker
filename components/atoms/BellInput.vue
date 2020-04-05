<template>
  <div class="bell-input">
    <span class="bell-input__time">{{ timeText }}</span>
    <input v-model="inputPrice" class="bell-input__inner" type="number" min="0" max="999">
    <span class="bell-input__badge">ベル</span>
  </div>
</template>

<script>
export default {
  props: {
    isAm: {
      type: Boolean,
      required: true,
      default: true,
    },
    price: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      inputPrice: '',
    };
  },
  computed: {
    timeText() {
      if (this.isAm) {
        return 'AM';
      }
      return 'PM';
    },
  },
  created() {
    this.inputPrice = this.price;
  },
};
</script>

<style lang="scss" scoped>
$bg-color: #edc453;
$font-color: #fcf6e5;

.bell-input {
  align-items: center;
  background-color: $bg-color;
  border: solid 4px $font-color;
  border-radius: 25px;
  display: flex;
  height: 50px;
  justify-content: center;
  position: relative;
  width: 100px;

  &__time {
    background-color: $bg-color;
    border: solid 2px $font-color;
    border-radius: 10px;
    color: $font-color;
    font-size: 12px;
    height: 20px;
    left: -6px;
    position: absolute;
    text-align: center;
    top: -6px;
    width: 40px;
  }

  &__inner {
    background-color: $bg-color;
    border: none;
    color: $font-color;
    font-family: 'M PLUS Rounded 1c';
    font-size: 20px;
    font-weight: bold;
    outline: none;
    text-align: center;
    width: 60px;
    -webkit-appearance: none;
  }

  &__badge {
    bottom: -10px;
    background-color: $font-color;
    border-radius: 10px;
    color: $bg-color;
    font-size: 14px;
    font-weight: bold;
    height: 20px;
    position: absolute;
    right: -5px;
    text-align: center;
    width: 40px;
  }
}

// NOTE: inputのスピンボタンを非表示する
// https://hirooooo-lab.com/development/html5-input-type-number-customize/
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance:textfield;
}
</style>
