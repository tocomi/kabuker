<template>
  <div class="list">
    <logo />
    <input v-model="am" />
    <input v-model="pm" />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
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
