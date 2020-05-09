<template>
  <div class="bell-input">
    <div :class="{ hidden: hiddenTime }" class="bell-input__time">
      <span>{{ timeText }}</span>
    </div>
    <input
      v-model="inputPrice"
      class="bell-input__inner"
      type="number"
      min="0"
      max="999"
      @input="onChange"
    >
    <div class="bell-input__badge">
      <span>ベル</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class BellInputComponent extends Vue {
  @Prop({ type: Boolean, required: false, default: true })
  isAm!: boolean;

  @Prop({ type: String, required: true, default: '' })
  price!: string;

  @Prop({ type: Boolean, required: false, default: false })
  hiddenTime!: boolean;

  /* lifecycle */
  created() {
    this.inputPrice = this.price;
  }

  /* data */
  inputPrice: string = '';

  /* computed */
  get timeText() {
    if (this.isAm) {
      return 'AM';
    }
    return 'PM';
  }

  /* methods */
  onChange(e: any) {
    let value = e.target.value >= 1000 ? 999 : e.target.value;
    value = value < 0 ? 0 : value;
    this.inputPrice = value;
    this.$emit('onChange', value, this.isAm);
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #e1c355;
$font-color: #fffaea;

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
    align-items: center;
    background-color: $bg-color;
    border: solid 2px $font-color;
    border-radius: 10px;
    color: $font-color;
    display: flex;
    font-size: 12px;
    height: 20px;
    justify-content: center;
    left: -6px;
    position: absolute;
    text-align: center;
    top: -6px;
    width: 40px;

    &.hidden {
      display: none;
    }
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
    width: 64px;
    -webkit-appearance: none;
  }

  &__badge {
    align-items: center;
    bottom: -10px;
    background-color: $font-color;
    border-radius: 10px;
    color: $bg-color;
    display: flex;
    font-size: 14px;
    font-weight: bold;
    justify-content: center;
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
