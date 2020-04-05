<template>
  <div class="list">
    <logo />
    <bell-input />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import BellInput from '~/components/BellInput.vue';

export default {
  components: {
    Logo,
    BellInput,
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

</style>
