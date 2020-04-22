<template>
  <div class="link-button-wrapper">
    <nuxt-link :to="to" class="link-button">
      <span class="link-button__text"><slot /></span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
      default: '/',
    },
  },
};
</script>

<style lang="scss" scoped>
.link-button-wrapper {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;

  .link-button {
    align-items: center;
    background-color: #23cdda;
    border: none;
    border-radius: 20px;
    box-shadow: 1px 1px 2px #999;
    color: white;
    display: flex;
    height: 40px;
    justify-content: center;
    text-decoration: none;
    width: 280px;

    &__text {
      text-align: center;
      width: 100%;
    }
  }
}
</style>
