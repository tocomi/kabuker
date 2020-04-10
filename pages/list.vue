<template>
  <div class="list-wrapper">
    <div class="header">
      <span>(ここにロゴを置くだなも)</span>
    </div>
    <simple-loading v-if="loading" />
    <div v-if="!loading" class="main">
      <div v-for="personPrice in priceList" :key="personPrice.userName">
        <person-bell :user-name="personPrice.userName" :prices="personPrice.prices" />
      </div>
      <link-button class="main__link">
        カブ価を記録する！
      </link-button>
    </div>
  </div>
</template>

<script>
import LinkButton from '~/components/atoms/LinkButton.vue';
import PersonBell from '~/components/molecules/PersonBell.vue';
import SimpleLoading from '~/components/organisms/SimpleLoading.vue';
import { getBaseSundayYYYYMMDD } from '~/domains/date/DateUtil';

export default {
  components: {
    LinkButton,
    PersonBell,
    SimpleLoading,
  },
  data() {
    return {
      priceList: [],
      loading: true,
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
    this.loading = false;
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

    &__link {
      margin-top: 16px;
    }
  }
}
</style>
