<template>
  <div class="index-wrapper">
    <weekly-bells />
  </div>
</template>

<script>
import WeeklyBells from '~/components/organisms/WeeklyBells.vue';

export default {
  components: {
    WeeklyBells,
  },
  data() {
    return {
      login: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
