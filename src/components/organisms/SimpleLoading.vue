<template>
  <div class="loading-wrapper">
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
}
</style>
