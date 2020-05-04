<template>
  <div class="bottom-navigation-wrapper">
    <div class="bottom-navigation">
      <bottom-navigation-link to="/record" icon-name="faEdit" label="きろくする" />
      <bottom-navigation-link to="/" icon-name="faListAlt" label="みる" />
      <bottom-navigation-link to="/invite" icon-name="faEnvelopeOpenText" label="よぶ" />
    </div>
  </div>
</template>

<script>
import BottomNavigationLink from '~/components/molecules/BottomNavigationLink.vue';

export default {
  components: {
    BottomNavigationLink,
  },
};
</script>

<style lang="scss" scoped>
.bottom-navigation-wrapper {
  background-color: white;
  border-top: solid 1px $green;
  bottom: 0;
  display: flex;
  filter: drop-shadow(0 5px 5px rgba(0,0,0,0.6));
  height: $bottom-nav-height;
  justify-content: center;
  position: fixed;
  width: 100vw;
}

.bottom-navigation {
  align-items: center;
  display: flex;
  height: inherit;
  justify-content: space-around;
  max-width: $max-width;
  width: 100vw;
}
</style>
