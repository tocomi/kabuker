<template>
  <div class="loading-wrapper">
    <img :src="require('~/assets/images/kabu.png')" class="loading-wrapper__image" alt="kabu">
    <spinner />
  </div>
</template>

<script>
import Spinner from '~/components/atoms/Spinner.vue';
export default {
  components: {
    Spinner,
  },
};
</script>

<style lang="scss" scoped>
.loading-wrapper {
  text-align: center;
  padding-top: 64px;

  &__image {
    width: 50vw;
  }
}
</style>
