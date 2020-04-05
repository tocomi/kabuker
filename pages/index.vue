<template>
  <div class="index">
    <logo />
    <div class="index__daily-bell">
      <daily-bell />
    </div>
    <div class="index__daily-bell">
      <daily-bell />
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import DailyBell from '~/components/molecules/DailyBell.vue';

export default {
  components: {
    Logo,
    DailyBell,
  },
  data() {
    return {
      am: 0,
      pm: 0,
    };
  },
  async created() {
    const docRef = this.$firestore.collection('prices').doc('nUWb6VPU20z8k4ftTS6D');
    const doc = await await docRef.get();
    console.log(doc.data());
    this.am = doc.data().prices[0].am;
    this.pm = doc.data().prices[0].pm;
  },
};
</script>

<style lang="scss" scoped>
.index {
  .daily-bell {
    margin-top: 16px;
  }
}
</style>
