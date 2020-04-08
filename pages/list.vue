<template>
  <div class="list-wrapper">
    <div class="header">
      <span>ここにロゴを置くだなも！</span>
    </div>
    <div class="main">
      <div v-for="personPrice in priceList" :key="personPrice.userName">
        <person-bell :user-name="personPrice.userName" :prices="personPrice.prices" />
      </div>
    </div>
    <nuxt-link to="/">
      入力だなも
    </nuxt-link>
  </div>
</template>

<script>
import PersonBell from '~/components/molecules/PersonBell.vue';
import { getBaseSundayYYYYMMDD } from '~/domains/date/DateUtil';

export default {
  components: {
    PersonBell,
  },
  data() {
    return {
      priceList: [],
    };
  },
  computed: {
    collectionName() {
      const YYYYMMDD = getBaseSundayYYYYMMDD();
      return `prices${YYYYMMDD}`;
    },
  },
  async created() {
    const snapshot = await this.$firestore.collection(this.collectionName).get();
    snapshot.forEach((doc) => {
      const userName = doc.data().userName;
      const prices = [];
      doc.data().prices.forEach((daily) => {
        prices.push(daily.price.am);
        prices.push(daily.price.pm);
      });
      this.priceList.push({
        userName,
        prices,
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  margin: 0 auto;
  max-width: 536px;
  padding: 16px 6vw 64px;

  .header {
    align-items: center;
    display: flex;
    height: 160px;
    justify-content: center;
  }

  .main {
    margin-top: 16px;
  }
}
</style>
