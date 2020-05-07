<template>
  <div class="mini-bought-bell">
    <div class="mini-bought-bell__label">
      <span>買</span>
    </div>
    <input v-model="boughtPrice" readonly class="mini-bought-bell__price">
  </div>
</template>

<script>
export default {
  props: {
    boughtPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.mini-bought-bell {
  align-items: center;
  background-color: #e5f4fa;
  border: solid 2px $blue;
  border-radius: 12px;
  display: flex;
  height: 24px;
  justify-content: center;
  position: relative;
  text-align: center;

  &__label {
    align-items: center;
    background-color: $blue;
    border-radius: 8px;
    display: flex;
    font-size: 12px;
    height: 16px;
    justify-content: center;
    left: 2px;
    position: absolute;
    text-align: center;
    top: 2px;
    width: 30px;

    span {
      color: white;
    }
  }

  &__price {
    background: none;
    border: none;
    font-family: 'M PLUS Rounded 1c';
    font-size: 12px;
    outline: none;
    padding-left: 32px;
    text-align: center;
    width: 64px;
  }
}
</style>
