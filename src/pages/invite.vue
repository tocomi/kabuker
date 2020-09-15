<template>
  <div class="invite-wrapper">
    <h3>かみんぐすーんだなも！</h3>
    <bottom-navigation />
  </div>
</template>

<script>
import BottomNavigation from '~/components/organisms/BottomNavigation.vue';

export default {
  components: {
    BottomNavigation,
  },
  head() {
    return {
      title: 'invitation',
    };
  },
};
</script>

<style lang="scss" scoped>
.invite-wrapper {
  align-items: center;
  display: flex;
  height: calc(100vh - #{$bottom-nav-height});
  justify-content: center;
  width: 100vw;
}
</style>
